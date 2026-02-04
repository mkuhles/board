import type { Item, Project } from "../models";

export function filterItemsBySprint(
  project: Project | null,
  activeSprintId: string
): Item[] {
  const items = project?.items ?? [];

  if (!Array.isArray(project?.sprints) || activeSprintId === "all") {
    return items;
  }

  if (activeSprintId === "backlog") {
    return items.filter((it) => !it.sprintId);
  }

  return items.filter((it) => it.sprintId === activeSprintId);
}
