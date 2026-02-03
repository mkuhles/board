import { useEffect, useRef, useState } from "react";
import {
  addTimeEntry,
  buildTimeEntry,
  fromLocalInputValue,
  parseTags,
  summarizeTimeEntries,
  toLocalInputValue,
} from "../lib/time";

export function useTimeEntryDraft({
  timeEntries,
  setTimeEntries,
  defaultOpen = false,
  registerBeforeSubmit,
} = {}) {
  const [timeStart, setTimeStart] = useState(toLocalInputValue());
  const [timeMinutes, setTimeMinutes] = useState(30);
  const [timeComment, setTimeComment] = useState("");
  const [timeTags, setTimeTags] = useState("");
  const [timeBillable, setTimeBillable] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(Boolean(defaultOpen));
  const [timeDirty, setTimeDirty] = useState(false);
  const timeWrapRef = useRef(null);

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

      setTimeEntries(addTimeEntry(timeEntries, entry));
      setTimeComment("");
      setTimeTags("");
      setTimeBillable(false);
      setTimeStart(toLocalInputValue());
      setTimeDirty(false);
      return entry;
    };

    registerBeforeSubmit(handler);
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
    onChangeStart: (value) => {
      setTimeStart(value);
      setTimeDirty(true);
    },
    onChangeMinutes: (value) => {
      setTimeMinutes(value);
      setTimeDirty(true);
    },
    onChangeComment: (value) => {
      setTimeComment(value);
      setTimeDirty(true);
    },
    onChangeTags: (value) => {
      setTimeTags(value);
      setTimeDirty(true);
    },
    onChangeBillable: (value) => {
      setTimeBillable(value);
      setTimeDirty(true);
    },
  };
}
