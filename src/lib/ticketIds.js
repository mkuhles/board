function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Returns next ID like "US13" or "TECH8".
 * Only counts IDs in the new format: PREFIX + number (no dot).
 * Old IDs like "US1.3" are ignored.
 */
export function generateNextSimpleId(project, type) {
  const typeCode = project?.typeCodes?.[type]?.prefix;
  if (!typeCode) {
    throw new Error(`Missing typeCodes mapping for type "${type}".`);
  }

  const re = new RegExp(`^${escapeRegExp(typeCode)}(\\d+)$`);
  let max = 0;

  for (const it of project.items ?? []) {
    const m = String(it?.id || "").match(re);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n)) max = Math.max(max, n);
  }

  return `${typeCode}${max + 1}`;
}
