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
    const st = grouped[it.status] ? it.status : DEFAULT_STATUS;
    grouped[st].push(it);
  }
  // innerhalb jeder Spalte sortieren
  for (const key of Object.keys(grouped)) grouped[key] = sortByOrder(grouped[key]);
  return grouped;
}

export function normalizeOrdersItems(items, statuses) {
  const byStatus = groupByStatus(items ?? [], statuses);

  for (const s of statuses) {
    const list = byStatus[s.id] ?? [];
    list.forEach((it, idx) => {
      it.order = idx; // mutating copy below? see note
    });
  }

  // groupByStatus liefert bei dir vermutlich schon Kopien / sortiert nach `order`.
  // Um sicher zu sein, bauen wir ein neues Array in Status-Reihenfolge:
  const flattened = [];
  for (const s of statuses) flattened.push(...(byStatus[s.id] ?? []));

  return flattened;
}

/**
 * Backward compatible wrapper:
 * takes a project, returns a project (same behavior as before)
 */
export function normalizeOrders(project, statuses) {
  return {
    ...project,
    items: normalizeOrdersItems(project?.items ?? [], statuses),
  };
}


export function stripClientFields(project) {
  const items = (project.items ?? []).map(({ _cid, ...rest }) => rest);
  return { ...project, items };
}
