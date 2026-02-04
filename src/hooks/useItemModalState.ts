import { useMemo, useRef } from "react";
import { useAreas, useTypeCodes } from "../context/ProjectContext";
import { useItemDraft } from "../lib/project";
import type { Item, ItemPayload } from "../lib/models";
import type { TimeEntry } from "../lib/time";

type UseItemModalStateOptions = {
  isOpen: boolean;
  isEdit: boolean;
  initialItem?: Item | null;
  sprints?: unknown[];
  statuses?: unknown[];
  onSubmit: (payload: ItemPayload) => void;
};

type BeforeSubmitFn = () => TimeEntry | null;

export function useItemModalState({
  isOpen,
  isEdit,
  initialItem,
  sprints,
  statuses,
  onSubmit,
}: UseItemModalStateOptions) {
  const areas = useAreas();
  const typeCodes = useTypeCodes();
  const beforeSubmitRef = useRef<BeforeSubmitFn | null>(null);

  const draft = useItemDraft({
    isOpen,
    isEdit,
    initialItem,
    areas,
    typeCodes,
    sprints,
    statuses,
  });

  const typeCodePreview = useMemo(
    () => typeCodes?.[draft.type]?.prefix || "",
    [typeCodes, draft.type]
  );

  const submit = () => {
    const pendingEntry = beforeSubmitRef.current?.();
    const payload = draft.validateAndBuildPayload();
    if (!payload) return;
    if (pendingEntry) {
      payload.time_entries = [...(draft.timeEntries ?? []), pendingEntry];
    }
    onSubmit(payload);
  };

  const registerBeforeSubmit = (fn: BeforeSubmitFn) => {
    beforeSubmitRef.current = fn;
  };

  return {
    areas,
    typeCodes,
    draft,
    typeCodePreview,
    submit,
    registerBeforeSubmit,
  };
}
