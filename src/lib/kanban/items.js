import { DEFAULT_STATUS } from "../../constants/statuses";
import { generateNextSimpleId, normalizeOrders } from "../project";
import { buildCreateTimestamps, computeUpdatedAtForPayload } from "../time";

export function createItemInProject({ project, payload, nextCid, statuses }) {
  if (!project) return null;

  const id = generateNextSimpleId(project, payload.type);

  const { created_at, updated_at } = buildCreateTimestamps(payload);

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
    status: payload.status ?? DEFAULT_STATUS,
    sprintId: payload.sprintId ?? undefined,
    time_entries: Array.isArray(payload.time_entries) ? payload.time_entries : [],
    created_at,
    updated_at,
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

    const next = { ...it };

    // Only update fields that exist on payload (patch semantics)
    if ("title" in payload) next.title = payload.title;
    if ("description" in payload) next.description = payload.description ?? "";
    if ("type" in payload) next.type = payload.type;
    if ("area_id" in payload) next.area_id = payload.area_id;
    if ("relates_to" in payload) next.relates_to = payload.relates_to ?? [];
    if ("sprintId" in payload) next.sprintId = payload.sprintId; // allow null to remove
    if ("status" in payload) next.status = payload.status;
    if ("order" in payload) next.order = payload.order;
    if ("time_entries" in payload)
      next.time_entries = Array.isArray(payload.time_entries) ? payload.time_entries : [];
    if ("created_at" in payload) next.created_at = payload.created_at;
    const computedUpdatedAt = computeUpdatedAtForPayload(payload);
    if (computedUpdatedAt !== undefined) next.updated_at = computedUpdatedAt;

    return next;
  });

  return normalizeOrders({ ...project, items: nextItems }, statuses);
}

export function deleteItemInProject({ project, cid, statuses }) {
  if (!project?.items || !cid) return null;

  const nextItems = project.items.filter((i) => i._cid !== cid);
  return normalizeOrders({ ...project, items: nextItems }, statuses);
}
