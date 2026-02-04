import { useMemo } from "react";
import type { Project } from "../lib/models";

export function useProjectMeta(project: Project | null) {
  return useMemo(
    () => ({
      name: project?.name ?? "",
      areas: project?.areas ?? [],
      typeCodes: project?.typeCodes ?? {},
    }),
    [project?.name, project?.areas, project?.typeCodes]
  );
}
