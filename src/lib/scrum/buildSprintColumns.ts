import type { Item, Project } from "../models";

type Columns = Record<string, Item[]>;

export function buildSprintColumns(
  columns: Columns,
  project: Project | null,
  activeSprintId: string
): Columns {
  if (!project) return columns;

  const hasSprints =
    Array.isArray(project.sprints) && project.sprints.length > 0;
  if (!hasSprints || activeSprintId === "all") return columns;

  if (activeSprintId === "backlog") {
    return {
      ...columns,
      backlog: (columns.backlog ?? []).filter((it) => !it.sprintId),
      todo: [],
      doing: [],
      done: [],
      archived: columns.archived ?? [],
    };
  }

  const inSprint = (it: Item) => it.sprintId === activeSprintId;

  return {
    ...columns,
    backlog: columns.backlog ?? [],
    todo: (columns.todo ?? []).filter(inSprint),
    doing: (columns.doing ?? []).filter(inSprint),
    done: (columns.done ?? []).filter(inSprint),
    archived: (columns.archived ?? []).filter(inSprint),
  };
}
