// lib/kanban/dnd.ts
import { arrayMove } from "@dnd-kit/sortable";
import { DEFAULT_STATUS } from "../../constants/statuses";
import { groupByStatus, normalizeOrdersItems } from "../project";
import { nowIso } from "../time";
import type { Item } from "../models";

type Status = { id: string };
type DragEvent = { active?: { id?: string }; over?: { id?: string } };
type ApplyDragParams = {
  items: Item[];
  event: DragEvent;
  statuses: Status[];
};

function statusFromOverId(overId: unknown, items: Item[], statuses: Status[]) {
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

export function applyDragToItems({ items, event, statuses }: ApplyDragParams) {
  const { active, over } = event ?? {};
  if (!active?.id || !over?.id) return null;

  const activeCid = String(active.id).replace("item:", "");
  const overId = String(over.id);

  const activeItem = (items ?? []).find((i) => i._cid === activeCid);
  if (!activeItem) return null;

  const fromStatus = activeItem.status || DEFAULT_STATUS;
  const toStatus = statusFromOverId(overId, items, statuses);
  if (!toStatus) return null;

  const byStatus = groupByStatus(items ?? [], statuses);

  // --- SAME COLUMN: reorder by index (this fixes “drag down does nothing”) ---
  if (fromStatus === toStatus && overId.startsWith("item:")) {
    const list = byStatus[fromStatus] ?? [];
    const overCid = overId.replace("item:", "");

    const oldIndex = list.findIndex((i) => i._cid === activeCid);
    const newIndex = list.findIndex((i) => i._cid === overCid);
    if (oldIndex < 0 || newIndex < 0) return null;

    byStatus[fromStatus] = arrayMove(list, oldIndex, newIndex);

  } else {
    // --- CROSS COLUMN (or drop on column): insert logic ---
    const fromList = (byStatus[fromStatus] ?? []).filter((i) => i._cid !== activeCid);
    const toBase = (byStatus[toStatus] ?? []).filter((i) => i._cid !== activeCid);

    let insertIndex = toBase.length;
    if (overId.startsWith("item:")) {
      const overCid = overId.replace("item:", "");
      const idx = toBase.findIndex((i) => i._cid === overCid);
      if (idx >= 0) insertIndex = idx;
    }

    const moved: Item = {
      ...activeItem,
      status: toStatus,
      updated_at: nowIso(),
    };
    const toList = [...toBase];
    toList.splice(insertIndex, 0, moved);

    byStatus[fromStatus] = fromList;
    byStatus[toStatus] = toList;
  }

  // Flatten in statuses-order
  const flattened = [];
  for (const s of statuses) flattened.push(...(byStatus[s.id] ?? []));

  return normalizeOrdersItems(flattened, statuses);
}
