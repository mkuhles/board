import { DEFAULT_STATUS } from "../../constants/statuses";
import type { TimeEntry } from "../time/entries";

export type Item = {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  area_id?: string;
  relates_to?: string[];
  status?: string;
  order?: number;
  _cid?: string;
  sprintId?: string;
  time_entries?: TimeEntry[];
  created_at?: string;
  updated_at?: string;
};

export type ItemPayload = {
  title: string;
  description?: string;
  type: string;
  area_id?: string;
  relates_to?: string[];
  status?: string;
  sprintId?: string;
  time_entries?: TimeEntry[];
  created_at?: string;
  updated_at?: string;
};

type NormalizeItemOptions = {
  defaultStatus?: string;
};

type BuildNewItemOptions = {
  payload: ItemPayload;
  id: string;
  nextCid: () => string;
  created_at: string;
  updated_at: string;
  defaultStatus?: string;
};

type ApplyItemPatchOptions = {
  defaultStatus?: string;
  updated_at?: string;
};

export function normalizeItem(
  item: Item = {},
  { defaultStatus = DEFAULT_STATUS }: NormalizeItemOptions = {}
): Item {
  const next: Item = { ...item };

  if (!next.status) next.status = defaultStatus;
  if (!Number.isFinite(next.order)) next.order = 0;
  if (!Array.isArray(next.relates_to)) next.relates_to = [];
  if (!Array.isArray(next.time_entries)) next.time_entries = [];
  if (next.description == null) next.description = "";

  return next;
}

export function buildNewItem({
  payload,
  id,
  nextCid,
  created_at,
  updated_at,
  defaultStatus = DEFAULT_STATUS,
}: BuildNewItemOptions): Item {
  const base = {
    id,
    title: payload.title,
    description: payload.description || "",
    type: payload.type,
    area_id: payload.area_id,
    relates_to: payload.relates_to || [],
    status: payload.status ?? defaultStatus,
    order: 0,
    _cid: nextCid(),
    sprintId: payload.sprintId ?? undefined,
    time_entries: Array.isArray(payload.time_entries) ? payload.time_entries : [],
    created_at,
    updated_at,
  };

  return normalizeItem(base, { defaultStatus });
}

export function applyItemPatch(
  item: Item,
  payload: Partial<ItemPayload>,
  {
    defaultStatus = DEFAULT_STATUS,
    updated_at,
  }: ApplyItemPatchOptions = {}
): Item {
  const next: Item = { ...item };

  if ("title" in payload) next.title = payload.title;
  if ("description" in payload) next.description = payload.description ?? "";
  if ("type" in payload) next.type = payload.type;
  if ("area_id" in payload) next.area_id = payload.area_id;
  if ("relates_to" in payload) next.relates_to = payload.relates_to ?? [];
  if ("sprintId" in payload) next.sprintId = payload.sprintId;
  if ("status" in payload) next.status = payload.status;
  if ("order" in payload) next.order = payload.order;
  if ("time_entries" in payload)
    next.time_entries = Array.isArray(payload.time_entries) ? payload.time_entries : [];
  if ("created_at" in payload) next.created_at = payload.created_at;
  if (updated_at !== undefined) next.updated_at = updated_at;

  return normalizeItem(next, { defaultStatus });
}
