export function filterItemsBySprint(project, activeSprintId) {
  const items = project?.items ?? [];

  if (!Array.isArray(project?.sprints) || activeSprintId === "all") {
    return items;
  }

  if (activeSprintId === "backlog") {
    return items.filter((it) => !it.sprintId);
  }

  return items.filter((it) => it.sprintId === activeSprintId);
}
