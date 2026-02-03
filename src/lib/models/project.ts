import { DEFAULT_STATUS } from "../../constants/statuses";
import { normalizeItem, type Item } from "./item";

export type Area = {
  id: string;
  title: string;
  number?: number | null;
};

export type Sprint = {
  id: string;
  title: string;
  start?: string;
  end?: string;
};

export type Project = {
  name?: string;
  meta?: Record<string, unknown>;
  areas?: Area[];
  typeCodes?: Record<string, { label?: string; prefix?: string }>;
  sprints?: Sprint[];
  items?: Item[];
};

export function normalizeProject(
  project: Project = {},
  { defaultStatus = DEFAULT_STATUS }: { defaultStatus?: string } = {}
): Project {
  const next: Project = { ...project };

  next.name = typeof next.name === "string" ? next.name : "";
  next.meta = next.meta && typeof next.meta === "object" ? next.meta : {};
  next.areas = Array.isArray(next.areas) ? next.areas : [];
  next.typeCodes =
    next.typeCodes && typeof next.typeCodes === "object" ? next.typeCodes : {};
  next.sprints = Array.isArray(next.sprints) ? next.sprints : [];

  const items = Array.isArray(next.items) ? next.items : [];
  next.items = items.map((it) => normalizeItem(it, { defaultStatus }));

  return next;
}
