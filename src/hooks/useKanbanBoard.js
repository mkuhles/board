import { useMemo, useRef, useState, useCallback } from "react";
import { STATUSES, DEFAULT_STATUS } from "../constants/statuses";
import { arrayMove } from "@dnd-kit/sortable";
import { groupByStatus, normalizeOrders } from "../lib/project";

function findItemByCid(items, cid) {
  return items.find((i) => i._cid === cid);
}

function statusFromOverId(overId, project) {
  const str = String(overId);

  if (str.startsWith("col:")) return str.replace("col:", "");

  if (str.startsWith("item:")) {
    const overCid = str.replace("item:", "");
    const overItem = project.items.find((i) => i._cid === overCid);
    return (overItem?.status || DEFAULT_STATUS);
  }

  return null;
}

export function useKanbanBoard(project, setProject, { onChange } = {}) {
  const [activeCid, setActiveCid] = useState(null);
  const cidCounter = useRef(1);

  const ensureClientIds = useCallback((loadedProject) => {
    const items = (loadedProject.items ?? []).map((it) =>
      it._cid ? it : { ...it, _cid: `c${cidCounter.current++}` }
    );
    return { ...loadedProject, items };
  }, []);

  const columns = useMemo(
    () => groupByStatus(project?.items ?? [], STATUSES),
    [project]
  );

  const activeItem = useMemo(() => {
    if (!project?.items || !activeCid) return null;
    return findItemByCid(project.items, activeCid) || null;
  }, [project, activeCid]);

  const onDragStart = useCallback((event) => {
    const id = event?.active?.id; // "item:c3"
    const cid = String(id).replace("item:", "");
    setActiveCid(cid);
  }, []);

  const statusIds = STATUSES.map(s => s.id);

  function getStatusOfItem(item) {
    return item.status || DEFAULT_STATUS;
  }

  const onDragEnd = useCallback((event) => {
    const { active, over } = event;
    // setActiveCid(null) bei dir vorhanden

    if (!active?.id || !over?.id || !project?.items) return;

    const activeCid = String(active.id).replace("item:", "");
    const activeItem = project.items.find((i) => i._cid === activeCid);
    if (!activeItem) return;

    const fromStatus = activeItem.status || DEFAULT_STATUS;
    const toStatus = statusFromOverId(over.id, project);
    if (!toStatus) return;

    const byStatus = groupByStatus(project.items, STATUSES);

    // ✅ Duplikat-Schutz: aktives Item aus from UND to entfernen
    const fromList = (byStatus[fromStatus] ?? []).filter((i) => i._cid !== activeCid);
    const toBase = (byStatus[toStatus] ?? []).filter((i) => i._cid !== activeCid);

    // Insert-Index: drop auf Item => vor dieses Item; drop auf Spalte => ans Ende
    let insertIndex = toBase.length;
    if (String(over.id).startsWith("item:")) {
      const overCid = String(over.id).replace("item:", "");
      const idx = toBase.findIndex((i) => i._cid === overCid);
      if (idx >= 0) insertIndex = idx;
    }

    const moved = { ...activeItem, status: toStatus };
    const toList = [...toBase];
    toList.splice(insertIndex, 0, moved);

    // Update Status-Listen
    byStatus[fromStatus] = fromList;
    byStatus[toStatus] = toList;

    // Flatten in STATUSES-Reihenfolge
    const nextItems = [];
    for (const s of STATUSES) nextItems.push(...(byStatus[s.id] ?? []));

    // ✅ orders neu 0..n pro Status
    const nextProject = normalizeOrders({ ...project, items: nextItems }, STATUSES);

    setProject(nextProject);
    onChange?.(nextProject);
  }, [project, setProject, onChange]);

  const deleteItem = useCallback((item) => {
    if (!item?._cid || !project?.items) return;

    const ok = window.confirm(`"${item.title || item.id || "Item"}" wirklich löschen?`);
    if (!ok) return;

    const nextItems = project.items.filter((i) => i._cid !== item._cid);
    const nextProject = normalizeOrders({ ...project, items: nextItems }, STATUSES);

    setProject(nextProject);
    onChange?.(nextProject);
  }, [project, setProject, onChange]);

  return {
    ensureClientIds,
    columns,
    activeItem,
    dnd: { onDragStart, onDragEnd },
    deleteItem,
  };
}
