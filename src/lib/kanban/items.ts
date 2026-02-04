import { DEFAULT_STATUS } from "../../constants/statuses";
import { generateNextSimpleId, normalizeOrders } from "../project";
import { applyItemPatch, buildNewItem, type ItemPayload, type Project } from "../models";
import { buildCreateTimestamps, computeUpdatedAtForPayload } from "../time";

type Status = { id: string };
type CreateItemOptions = {
  project: Project | null;
  payload: ItemPayload;
  nextCid: () => string;
  statuses: Status[];
};

type UpdateItemOptions = {
  project: Project | null;
  cid: string;
  payload: ItemPayload;
  statuses: Status[];
};

type DeleteItemOptions = {
  project: Project | null;
  cid: string;
  statuses: Status[];
};

export function createItemInProject({
  project,
  payload,
  nextCid,
  statuses,
}: CreateItemOptions) {
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

export function updateItemInProject({
  project,
  cid,
  payload,
  statuses,
}: UpdateItemOptions) {
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

export function deleteItemInProject({
  project,
  cid,
  statuses,
}: DeleteItemOptions) {
  if (!project?.items || !cid) return null;

  const nextItems = project.items.filter((i) => i._cid !== cid);
  return normalizeOrders({ ...project, items: nextItems }, statuses);
}
