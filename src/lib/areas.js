export function getAreaById(areas, areaId) {
  if (!areaId) return null;
  if (!Array.isArray(areas)) return null;
  return areas.find((a) => a?.id === areaId) ?? null;
}

export function getAreaTitle(areas, item) {
  const areaId = item?.area_id;
  const area = getAreaById(areas, areaId);
  return area?.title || "";
}

export function getAreaNumber(areas, item) {
  const areaId = item?.area_id;
  const area = getAreaById(areas, areaId);
  return Number.isFinite(area?.number) ? area.number : null;
}
