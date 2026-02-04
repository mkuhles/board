import React, { createContext, useContext } from "react";
import type { Area, TypeCode } from "../lib/models";

export type ProjectContextValue = {
  name?: string;
  areas?: Area[];
  typeCodes?: Record<string, TypeCode>;
};

type ProjectProviderProps = {
  value: ProjectContextValue;
  children: React.ReactNode;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({
  value,
  children,
}: ProjectProviderProps) {
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("Project hooks must be used inside <ProjectProvider>.");
  return ctx;
}

export function useAreas() {
  const ctx = useProjectContext();
  return ctx.areas ?? [];
}

export function useName() {
  const ctx = useProjectContext();
  return ctx.name ?? "";
}

export function useTypeCodes() {
  const ctx = useProjectContext();
  return ctx.typeCodes ?? {};
}
