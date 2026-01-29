import { DEFAULT_STATUS } from "../../constants/statuses";
import { generateNextSimpleId, normalizeOrders } from "../project";

export function createItemInProject({ project, payload, nextCid, statuses }) {
  if (!project) return null;

  const id = generateNextSimpleId(project, payload.type);

  const newItem = {
    id,
    title: payload.title,
    description: payload.description || "",
    type: payload.type,
    area_id: payload.area_id,
    relates_to: payload.relates_to || [],
    status: DEFAULT_STATUS,
    order: 0,
    _cid: nextCid(),
  };

  return normalizeOrders(
    { ...project, items: [...(project.items ?? []), newItem] },
    statuses
  );
}

export function updateItemInProject({ project, cid, payload, statuses }) {
  if (!project) return null;

  const nextItems = (project.items ?? []).map((it) => {
    if (it._cid !== cid) return it;
    return {
      ...it,
      title: payload.title,
      description: payload.description || "",
      type: payload.type,
      area_id: payload.area_id,
      relates_to: payload.relates_to || [],
      // id stays unchanged
    };
  });

  return normalizeOrders({ ...project, items: nextItems }, statuses);
}

export function deleteItemInProject({ project, cid, statuses }) {
  if (!project?.items || !cid) return null;

  const nextItems = project.items.filter((i) => i._cid !== cid);
  return normalizeOrders({ ...project, items: nextItems }, statuses);
}
