import { DEFAULT_STATUS } from "../../constants/statuses";
import { generateNextSimpleId, normalizeOrders } from "../project";
import { applyItemPatch, buildNewItem } from "../models";
import { buildCreateTimestamps, computeUpdatedAtForPayload } from "../time";

export function createItemInProject({ project, payload, nextCid, statuses }) {
  if (!project) return null;

  const id = generateNextSimpleId(project, payload.type);

  const { created_at, updated_at } = buildCreateTimestamps(payload);

  const newItem = buildNewItem({
    payload,
    id,
    nextCid,
    created_at,
    updated_at,
    defaultStatus: DEFAULT_STATUS,
  });

  return normalizeOrders(
    { ...project, items: [...(project.items ?? []), newItem] },
    statuses
  );
}

export function updateItemInProject({ project, cid, payload, statuses }) {
  if (!project) return null;

  const nextItems = (project.items ?? []).map((it) => {
    if (it._cid !== cid) return it;

    const computedUpdatedAt = computeUpdatedAtForPayload(payload);
    return applyItemPatch(it, payload, {
      defaultStatus: DEFAULT_STATUS,
      updated_at: computedUpdatedAt,
    });
  });

  return normalizeOrders({ ...project, items: nextItems }, statuses);
}

export function deleteItemInProject({ project, cid, statuses }) {
  if (!project?.items || !cid) return null;

  const nextItems = project.items.filter((i) => i._cid !== cid);
  return normalizeOrders({ ...project, items: nextItems }, statuses);
}
