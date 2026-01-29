export function stripClientFields(project) {
  const items = (project.items ?? []).map(({ _cid, ...rest }) => rest);
  return { ...project, items };
}