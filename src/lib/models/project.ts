import { DEFAULT_STATUS } from "../../constants/statuses";
import { normalizeItem, type Item } from "./item";

export type Area = {
  id: string;
  title: string;
  number: number | null;
  color?: string;
};

export type Sprint = {
  id: string;
  title: string;
  start: string;
  end?: string;
};

export type TypeCode = {
  label: string;
  prefix: string;
  slug?: string;
  color?: string;
};

export type ProjectMeta = {
  activeSprintId?: string;
  [key: string]: unknown;
};

export type Project = {
  name?: string;
  meta?: ProjectMeta;
  areas?: Area[];
  typeCodes?: Record<string, TypeCode>;
  sprints?: Sprint[];
  items?: Item[];
};

const DEFAULT_TYPE_CODES: Record<string, TypeCode> = {
  task: {
    slug: "task",
    prefix: "T",
    label: "Task",
  },
};

export type ProjectValidation = {
  project: Project;
  warnings: string[];
  errors: string[];
};

type ProjectOptions = {
  defaultStatus?: string;
};

export function normalizeProject(
  project: Project = {},
  { defaultStatus = DEFAULT_STATUS }: ProjectOptions = {}
): Project {
  const next: Project = { ...project };

  next.name = typeof next.name === "string" ? next.name : "";
  next.meta = next.meta && typeof next.meta === "object" ? next.meta : {};
  next.areas = Array.isArray(next.areas) ? next.areas : [];
  next.typeCodes =
    next.typeCodes && typeof next.typeCodes === "object" ? next.typeCodes : {};

  if (Object.keys(next.typeCodes).length === 0) {
    next.typeCodes = DEFAULT_TYPE_CODES;
  }
  next.sprints = Array.isArray(next.sprints) ? next.sprints : [];

  const items = Array.isArray(next.items) ? next.items : [];
  next.items = items.map((it) => normalizeItem(it, { defaultStatus }));

  return next;
}

export function sanitizeProject(
  project: Project = {},
  { defaultStatus = DEFAULT_STATUS }: ProjectOptions = {}
): ProjectValidation {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (project?.items && !Array.isArray(project.items)) {
    errors.push("project.items must be an array.");
  }

  const normalized = normalizeProject(project, { defaultStatus });

  const typeCodeKeys = Object.keys(normalized.typeCodes ?? {});
  const requireType = typeCodeKeys.length > 0;

  (normalized.items ?? []).forEach((it, idx) => {
    if (!it?.id) errors.push(`item[${idx}] is missing required field "id".`);
    if (!it?.title) errors.push(`item[${idx}] is missing required field "title".`);
    if (requireType && !it?.type) {
      errors.push(`item[${idx}] is missing required field "type".`);
    }
  });

  (normalized.sprints ?? []).forEach((sprint, idx) => {
    if (!sprint?.id) warnings.push(`sprints[${idx}] is missing "id".`);
    if (!sprint?.title) warnings.push(`sprints[${idx}] is missing "title".`);
    if (!sprint?.start) {
      warnings.push(`sprints[${idx}] is missing "start".`);
      sprint.start = "";
    }
  });

  (normalized.areas ?? []).forEach((area, idx) => {
    if (!area?.id) warnings.push(`areas[${idx}] is missing "id".`);
    if (!area?.title) warnings.push(`areas[${idx}] is missing "title".`);
    if (!Number.isFinite(area?.number)) area.number = null;
  });

  return { project: normalized, warnings, errors };
}
