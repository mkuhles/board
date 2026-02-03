export function nowIso(): string {
  return new Date().toISOString();
}

export function buildCreateTimestamps(
  payload?: { created_at?: string; updated_at?: string }
): { created_at: string; updated_at: string } {
  const created_at = payload?.created_at ?? nowIso();
  const updated_at = payload?.updated_at ?? created_at;
  return { created_at, updated_at };
}

export function computeUpdatedAtForPayload(
  payload?: Record<string, unknown>
): string | undefined {
  if (!payload) return undefined;
  if ("updated_at" in payload) {
    return typeof payload.updated_at === "string" ? payload.updated_at : undefined;
  }

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
