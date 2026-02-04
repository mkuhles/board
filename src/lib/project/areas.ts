import type { Area } from "../models";

export function getAreaById(areas: Area[] | undefined, areaId?: string | null): Area | null {
  if (!areaId) return null;
  if (!Array.isArray(areas)) return null;
  return areas.find((a) => a?.id === areaId) ?? null;
}
