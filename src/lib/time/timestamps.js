export function nowIso() {
  return new Date().toISOString();
}

export function buildCreateTimestamps(payload) {
  const created_at = payload?.created_at ?? nowIso();
  const updated_at = payload?.updated_at ?? created_at;
  return { created_at, updated_at };
}

export function computeUpdatedAtForPayload(payload) {
  if (!payload) return undefined;
  if ("updated_at" in payload) return payload.updated_at;

  const touchKeys = [
    "title",
    "description",
    "type",
    "area_id",
    "relates_to",
    "status",
    "sprintId",
    "time_entries",
  ];

  const shouldTouch = touchKeys.some((key) => key in payload);
  return shouldTouch ? nowIso() : undefined;
}
