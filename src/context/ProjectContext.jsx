import React, { createContext, useContext } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ value, children }) {
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