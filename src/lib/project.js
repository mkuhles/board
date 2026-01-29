import { DEFAULT_STATUS } from "../constants/statuses";


export function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return { ok: false, error: e };
  }
}

export function ensureDefaults(item) {
  return {
    status: DEFAULT_STATUS,
    order: Number.isFinite(item?.order) ? item.order : 0,
    ...item,
  };
}

// sortiert Items innerhalb eines Status nach order
export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function groupByStatus(items, statuses) {
  const grouped = Object.fromEntries(statuses.map((s) => [s.id, []]));
  for (const it of items) {
    const st = it.status || DEFAULT_STATUS;
    (grouped[st] ??= []).push(it);
  }
  // innerhalb jeder Spalte sortieren
  for (const key of Object.keys(grouped)) grouped[key] = sortByOrder(grouped[key]);
  return grouped;
}

// setzt order = 0..n innerhalb jeder Spalte
export function normalizeOrders(project, statuses) {
  const items = project.items ?? [];
  const nextItems = [];

  for (const s of statuses) {
    // wichtig: KEIN sortieren hier – wir behalten die aktuelle Reihenfolge
    const col = items.filter((it) => (it.status || DEFAULT_STATUS) === s.id);

    col.forEach((it, idx) => {
      nextItems.push({ ...it, order: idx });
    });
  }

  return { ...project, items: nextItems };
}

export function stripClientFields(project) {
  const items = (project.items ?? []).map(({ _cid, ...rest }) => rest);
  return { ...project, items };
}
