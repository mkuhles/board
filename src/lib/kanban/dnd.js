// lib/kanban/dnd.js
import { DEFAULT_STATUS } from "../../constants/statuses";
import { groupByStatus, normalizeOrdersItems } from "../project";

function statusFromOverId(overId, items, statuses) {
  const str = String(overId);

  if (str.startsWith("col:")) return str.replace("col:", "");

  if (str.startsWith("item:")) {
    const overCid = str.replace("item:", "");
    const overItem = (items ?? []).find((i) => i._cid === overCid);
    return overItem?.status || DEFAULT_STATUS;
  }

  const statusIds = new Set((statuses ?? []).map((s) => s.id));
  if (statusIds.has(str)) return str;

  return null;
}

export function applyDragToItems({ items, event, statuses }) {
  const { active, over } = event ?? {};
  if (!active?.id || !over?.id) return null;

  const activeCid = String(active.id).replace("item:", "");
  const activeItem = (items ?? []).find((i) => i._cid === activeCid);
  if (!activeItem) return null;

  const fromStatus = activeItem.status || DEFAULT_STATUS;
  const toStatus = statusFromOverId(over.id, items, statuses);
  if (!toStatus) return null;

  const byStatus = groupByStatus(items ?? [], statuses);

  const fromList = (byStatus[fromStatus] ?? []).filter((i) => i._cid !== activeCid);
  const toBase = (byStatus[toStatus] ?? []).filter((i) => i._cid !== activeCid);

  let insertIndex = toBase.length;
  if (String(over.id).startsWith("item:")) {
    const overCid = String(over.id).replace("item:", "");
    const idx = toBase.findIndex((i) => i._cid === overCid);
    if (idx >= 0) insertIndex = idx;
  }

  const moved = { ...activeItem, status: toStatus };
  const toList = [...toBase];
  toList.splice(insertIndex, 0, moved);

  byStatus[fromStatus] = fromList;
  byStatus[toStatus] = toList;

  // Flatten in statuses-order
  const flattened = [];
  for (const s of statuses) flattened.push(...(byStatus[s.id] ?? []));

  return normalizeOrdersItems(flattened, statuses);
}
