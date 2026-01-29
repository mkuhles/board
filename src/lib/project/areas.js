export function getAreaById(areas, areaId) {
  if (!areaId) return null;
  if (!Array.isArray(areas)) return null;
  return areas.find((a) => a?.id === areaId) ?? null;
}
