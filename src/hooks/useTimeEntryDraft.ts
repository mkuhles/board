import { useEffect, useRef, useState } from "react";
import {
  addTimeEntry,
  buildTimeEntry,
  fromLocalInputValue,
  parseTags,
  summarizeTimeEntries,
  toLocalInputValue,
} from "../lib/time";
import type { TimeEntry } from "../lib/time";
import type { RegisterBeforeSubmit } from "../types/props";

type UseTimeEntryDraftOptions = {
  timeEntries?: TimeEntry[];
  setTimeEntries?: (entries: TimeEntry[]) => void;
  defaultOpen?: boolean;
  registerBeforeSubmit?: RegisterBeforeSubmit;
};

export function useTimeEntryDraft({
  timeEntries,
  setTimeEntries,
  defaultOpen = false,
  registerBeforeSubmit,
}: UseTimeEntryDraftOptions = {}) {
  const [timeStart, setTimeStart] = useState(toLocalInputValue());
  const [timeMinutes, setTimeMinutes] = useState(30);
  const [timeComment, setTimeComment] = useState("");
  const [timeTags, setTimeTags] = useState("");
  const [timeBillable, setTimeBillable] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(Boolean(defaultOpen));
  const [timeDirty, setTimeDirty] = useState(false);
  const timeWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsTimeOpen(Boolean(defaultOpen));
  }, [defaultOpen]);

  useEffect(() => {
    if (isTimeOpen) {
      timeWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isTimeOpen]);

  useEffect(() => {
    if (typeof registerBeforeSubmit !== "function") return;
    const handler = () => {
      if (!timeDirty) return null;
      const minutesNum = Number(timeMinutes);
      if (!Number.isFinite(minutesNum) || minutesNum <= 0) return null;

      const entry = buildTimeEntry({
        start_at: fromLocalInputValue(timeStart) || new Date().toISOString(),
        minutes: minutesNum,
        comment: timeComment,
        tags: parseTags(timeTags),
        billable: Boolean(timeBillable),
      });

      setTimeEntries?.(addTimeEntry(timeEntries, entry));
      setTimeComment("");
      setTimeTags("");
      setTimeBillable(false);
      setTimeStart(toLocalInputValue());
      setTimeDirty(false);
      return entry;
    };

    registerBeforeSubmit?.(handler);
  }, [
    registerBeforeSubmit,
    timeDirty,
    timeMinutes,
    timeTags,
    timeComment,
    timeBillable,
    timeStart,
    timeEntries,
    setTimeEntries,
  ]);

  const { totalMinutes, count: timeEntryCount } =
    summarizeTimeEntries(timeEntries);

  const handleAddTimeEntry = () => {
    if (!setTimeEntries) return;
    const minutesNum = Number(timeMinutes);
    if (!Number.isFinite(minutesNum) || minutesNum <= 0) return;

    const entry = buildTimeEntry({
      start_at: fromLocalInputValue(timeStart) || new Date().toISOString(),
      minutes: minutesNum,
      comment: timeComment,
      tags: parseTags(timeTags),
      billable: Boolean(timeBillable),
    });

    setTimeEntries(addTimeEntry(timeEntries, entry));
    setTimeComment("");
    setTimeTags("");
    setTimeBillable(false);
    setTimeStart(toLocalInputValue());
    setTimeDirty(false);
    setIsTimeOpen(true);
  };

  return {
    timeStart,
    timeMinutes,
    timeComment,
    timeTags,
    timeBillable,
    isTimeOpen,
    timeDirty,
    timeWrapRef,
    totalMinutes,
    timeEntryCount,
    setIsTimeOpen,
    handleAddTimeEntry,
    onChangeStart: (value: string) => {
      setTimeStart(value);
      setTimeDirty(true);
    },
    onChangeMinutes: (value: string) => {
      setTimeMinutes(value);
      setTimeDirty(true);
    },
    onChangeComment: (value: string) => {
      setTimeComment(value);
      setTimeDirty(true);
    },
    onChangeTags: (value: string) => {
      setTimeTags(value);
      setTimeDirty(true);
    },
    onChangeBillable: (value: boolean) => {
      setTimeBillable(value);
      setTimeDirty(true);
    },
  };
}
