import { DEFAULT_STATUS } from "../../constants/statuses";
import { normalizeItem } from "./item";

export function normalizeProject(project = {}, { defaultStatus = DEFAULT_STATUS } = {}) {
  const next = { ...project };

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
