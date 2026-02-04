import type { Project } from "../models";

export function stripClientFields(project: Project): Project {
  const items = (project.items ?? []).map(({ _cid, ...rest }) => rest);
  return { ...project, items } as Project;
}
