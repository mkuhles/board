import { useMemo, useRef, useState, useCallback } from "react";
import { STATUSES } from "../constants/statuses";
import { groupByStatus } from "../lib/project";

import {
  ensureClientIds,
  applyDragToItems,
  createItemInProject,
  updateItemInProject,
  deleteItemInProject,
} from "../lib/kanban";
import type { Item, ItemPayload, Project } from "../lib/models";
import type { DragEvent } from "../lib/kanban/dnd";
import type { Dispatch, SetStateAction } from "react";

type KanbanOptions = {
  onChange?: (project: Project) => void;
};


function findItemByCid(items: Item[], cid: string) {
  return items.find((i) => i._cid === cid);
}

export function useKanbanBoard(
  project: Project | null,
  setProject: Dispatch<SetStateAction<Project | null>>,
  { onChange }: KanbanOptions = {}
) {
  const [activeCid, setActiveCid] = useState<string | null>(null);

  // Session-only counter for stable React keys / dnd.
  // Keep it simple: c1, c2, c3...
  const cidCounter = useRef(1);
  const nextCid = useCallback(() => `c${cidCounter.current++}`, []);

  const ensureClientIdsForLoadedProject = useCallback(
    (loadedProject: Project) => ensureClientIds(loadedProject, nextCid),
    [nextCid]
  );

  const columns = useMemo(
    () => groupByStatus(project?.items ?? [], STATUSES),
    [project]
  );

  const activeItem = useMemo(() => {
    if (!project?.items || !activeCid) return null;
    return findItemByCid(project.items, activeCid) || null;
  }, [project, activeCid]);

  const onDragStart = useCallback((event: DragEvent) => {
    const id = event?.active?.id; // "item:c3"
    const cid = String(id).replace("item:", "");
    setActiveCid(cid);
  }, []);

  const onDragEnd = useCallback(
    (event: DragEvent) => {
      // Always cleanup drag-state, even if we early-return.
      setActiveCid(null);

      const nextItems = applyDragToItems({
        items: project?.items ?? [],
        event,
        statuses: STATUSES,
      });

      if (!nextItems) return;

      const nextProject = { ...project, items: nextItems } as Project;
      setProject(nextProject);
      onChange?.(nextProject);
    },
    [project, setProject, onChange]
  );

  const createItem = useCallback(
    (payload: ItemPayload) => {
      const nextProject = createItemInProject({
        project,
        payload,
        nextCid,
        statuses: STATUSES,
      });

      if (!nextProject) return;

      setProject(nextProject);
      onChange?.(nextProject);
    },
    [project, setProject, onChange, nextCid]
  );

  const updateItem = useCallback(
    (cid: string, payload: ItemPayload) => {
      const nextProject = updateItemInProject({
        project,
        cid,
        payload,
        statuses: STATUSES,
      });

      if (!nextProject) return;

      setProject(nextProject);
      onChange?.(nextProject);
    },
    [project, setProject, onChange]
  );

  const deleteItem = useCallback(
    (item: Item) => {
      const cid = item?._cid;
      if (!cid || !project?.items) return;

      const ok = window.confirm(
        `"${item.title || item.id || "Item"}" wirklich löschen?`
      );
      if (!ok) return;

      const nextProject = deleteItemInProject({
        project,
        cid,
        statuses: STATUSES,
      });

      if (!nextProject) return;

      setProject(nextProject);
      onChange?.(nextProject);
    },
    [project, setProject, onChange]
  );

  return {
    ensureClientIds: ensureClientIdsForLoadedProject,
    columns,
    activeItem,
    dnd: { onDragStart, onDragEnd },
    deleteItem,
    createItem,
    updateItem,
  };
}
