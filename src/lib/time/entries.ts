export type TimeEntry = {
  start_at: string;
  minutes: number;
  comment?: string;
  tags?: string[];
  billable?: boolean;
};

export type TimeEntryInput = {
  start_at: string;
  minutes: number | string;
  comment?: string;
  tags?: string[];
  billable?: boolean;
};

export function normalizeTimeEntries(entries: unknown): TimeEntry[] {
  return Array.isArray(entries) ? entries : [];
}

export function parseTags(input: unknown): string[] {
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
}: TimeEntryInput): TimeEntry | null {
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

export function addTimeEntry(entries: unknown, entry: TimeEntry | null): TimeEntry[] {
  if (!entry) return normalizeTimeEntries(entries);
  return [...normalizeTimeEntries(entries), entry];
}

export function summarizeTimeEntries(entries: unknown) {
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
