import type { Area, Item, Project } from "./models";

const ID_RE = /^([A-Z]+)(\d+)\.(\d+)$/;

function parseTicketId(id: unknown) {
  const m = String(id || "").match(ID_RE);
  if (!m) return null;
  return { typeCode: m[1], areaNo: Number(m[2]), seqNo: Number(m[3]) };
}

function slugify(input: unknown) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string, used: Set<string>) {
  let slug = base || "area";
  if (!used.has(slug)) return slug;
  let i = 2;
  while (used.has(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

/**
 * Auto-migrate:
 * - if items contain "area" (free text), create/extend project.areas[]
 * - replace item.area -> item.area_id (slug)
 * - remove item.area
 *
 * returns: { project, changed }
 */
export function migrateAreasOnOpen(project: Project) {
  const items = Array.isArray(project?.items) ? project.items : [];
  const hasLegacyArea = items.some((it) => it && typeof it === "object" && "area" in it && !("area_id" in it));
  if (!hasLegacyArea) return { project, changed: false };

  const existingAreas: Area[] = Array.isArray(project?.areas) ? project.areas : [];
  const usedSlugs = new Set(existingAreas.map((a) => a?.id).filter(Boolean));

  // number -> area (prefer number from ticket ids)
  const areasByNumber = new Map<number, Area>();
  for (const a of existingAreas) {
    if (Number.isFinite(a?.number)) areasByNumber.set(a.number, a);
  }

  const newAreas: Area[] = [...existingAreas];
  const titleToArea = new Map<string, Area>(existingAreas
    .filter(a => typeof a?.title === "string")
    .map(a => [a.title.trim().toLowerCase(), a]));

  const migratedItems = items.map((it: Item) => {
    if (!it || typeof it !== "object") return it;

    // already migrated
    if (it.area_id && !("area" in it)) return it;

    const title = String(it.area || "").trim();
    if (!title) return it; // nothing to migrate

    const parsed = parseTicketId(it.id);
    const areaNo = parsed?.areaNo;

    let areaObj: Area | null = null;

    // Prefer matching by number, if we can derive it from id
    if (Number.isFinite(areaNo) && areasByNumber.has(areaNo)) {
      areaObj = areasByNumber.get(areaNo);
    } else {
      const key = title.toLowerCase();
      if (titleToArea.has(key)) areaObj = titleToArea.get(key);
    }

    if (!areaObj) {
      const baseSlug = slugify(title);
      const id = uniqueSlug(baseSlug, usedSlugs);
      usedSlugs.add(id);

      areaObj = {
        id,
        title,
        number: Number.isFinite(areaNo) ? areaNo : null,
      };

      newAreas.push(areaObj);

      if (Number.isFinite(areaObj.number)) areasByNumber.set(areaObj.number, areaObj);
      titleToArea.set(areaObj.title.toLowerCase(), areaObj);
    }

    // remove "area", add "area_id"
    const { area, ...rest } = it as Item & { area?: string };
    return { ...rest, area_id: areaObj.id } as Item;
  });

  newAreas.sort((a, b) => {
    const an = Number.isFinite(a?.number) ? a.number : Number.POSITIVE_INFINITY;
    const bn = Number.isFinite(b?.number) ? b.number : Number.POSITIVE_INFINITY;
    return an - bn;
  });

  return {
    project: { ...project, areas: newAreas, items: migratedItems },
    changed: true,
  };
}
