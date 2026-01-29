import { DEFAULT_STATUS } from "../../constants/statuses";

export function ensureDefaults(item) {
  return {
    status: DEFAULT_STATUS,
    order: Number.isFinite(item?.order) ? item.order : 0,
    ...item,
  };
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function groupByStatus(items, statuses) {
  const grouped = Object.fromEntries(statuses.map((s) => [s.id, []]));
  for (const it of items) {
    const st = grouped[it.status] ? it.status : DEFAULT_STATUS;
    grouped[st].push(it);
  }
  // innerhalb jeder Spalte sortieren
  for (const key of Object.keys(grouped)) grouped[key] = sortByOrder(grouped[key]);
  return grouped;
}