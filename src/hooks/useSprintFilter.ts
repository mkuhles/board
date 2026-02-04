import { useEffect, useMemo, useState } from "react";
import { buildSprintColumns } from "../lib/scrum/buildSprintColumns";
import type { Item, Project } from "../lib/models";
import type { Dispatch, SetStateAction } from "react";

type Columns = Record<string, Item[]>;

type UseSprintFilterOptions = {
  project: Project | null;
  columns: Columns;
  setProject: Dispatch<SetStateAction<Project | null>>;
  autosave?: (project: Project) => void;
};

export function useSprintFilter({
  project,
  columns,
  setProject,
  autosave,
}: UseSprintFilterOptions) {
  const [activeSprintId, setActiveSprintId] = useState<string>(
    project?.meta?.activeSprintId ?? "all"
  );

  useEffect(() => {
    if (!project) return;
    setActiveSprintId(project?.meta?.activeSprintId ?? "all");
  }, [project]);

  const handleSprintChange = (nextId: string) => {
    setActiveSprintId(nextId);

    setProject((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        meta: { ...(prev.meta ?? {}), activeSprintId: nextId },
      };

      autosave?.(next);
      return next;
    });
  };

  const visibleColumns = useMemo(
    () => buildSprintColumns(columns, project, activeSprintId),
    [columns, project, activeSprintId]
  );

  const canAddItemToSprint =
    activeSprintId !== "all" && activeSprintId !== "backlog";

  return {
    activeSprintId,
    handleSprintChange,
    visibleColumns,
    canAddItemToSprint,
  };
}
