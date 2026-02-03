export function normalizeTimeEntries(entries) {
  return Array.isArray(entries) ? entries : [];
}

export function parseTags(input) {
  if (!input) return [];
  return String(input)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function buildTimeEntry({
  start_at,
  minutes,
  comment = "",
  tags = [],
  billable = false,
}) {
  const minutesNum = Number(minutes);
  if (!Number.isFinite(minutesNum) || minutesNum <= 0) return null;

  return {
    start_at,
    minutes: minutesNum,
    comment: String(comment || "").trim(),
    tags: Array.isArray(tags) ? tags : [],
    billable: Boolean(billable),
  };
}

export function addTimeEntry(entries, entry) {
  if (!entry) return normalizeTimeEntries(entries);
  return [...normalizeTimeEntries(entries), entry];
}

export function summarizeTimeEntries(entries) {
  const list = normalizeTimeEntries(entries);
  const totalMinutes = list.reduce(
    (sum, entry) => sum + (Number(entry?.minutes) || 0),
    0
  );
  const billableCount = list.filter((entry) => entry?.billable).length;
  return {
    count: list.length,
    totalMinutes,
    billableCount,
  };
}
