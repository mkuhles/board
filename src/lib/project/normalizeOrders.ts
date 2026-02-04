import { DEFAULT_STATUS } from "../../constants/statuses";
import type { Item, Project } from "../models";

type Status = { id: string };

export function normalizeOrdersItems(items: Item[], statuses: Status[]) {
  // IMPORTANT: preserve the incoming order within each status
  const grouped: Record<string, Item[]> = Object.fromEntries(
    (statuses ?? []).map((s) => [s.id, []])
  );

  for (const it of items ?? []) {
    const st = it.status || DEFAULT_STATUS;
    (grouped[st] ??= []).push(it);
  }

  const out: Item[] = [];
  for (const s of statuses ?? []) {
    const list = grouped[s.id] ?? [];
    for (let idx = 0; idx < list.length; idx++) {
      const it = list[idx];
      // copy only if necessary
      if (it.order === idx) out.push(it);
      else out.push({ ...it, order: idx });
    }
  }
  return out;
}

/**
 * Backward compatible wrapper:
 * takes a project, returns a project (same behavior as before)
 */
export function normalizeOrders(project, statuses) {
  return {
    ...project,
    items: normalizeOrdersItems(project?.items ?? [], statuses),
  } as Project;
}
