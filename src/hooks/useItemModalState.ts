import { useMemo, useRef } from "react";
import { useAreas, useTypeCodes } from "../context/ProjectContext";
import { useItemDraft } from "../lib/project";
import type { StatusOption } from "../constants/statuses";
import type { Item, ItemPayload, Sprint } from "../lib/models";
import type { BeforeSubmitFn, RegisterBeforeSubmit } from "../types/props";

type UseItemModalStateOptions = {
  isOpen: boolean;
  isEdit: boolean;
  initialItem?: Item | null;
  sprints?: Sprint[];
  statuses?: StatusOption[];
  onSubmit: (payload: ItemPayload) => void;
};

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

  const registerBeforeSubmit: RegisterBeforeSubmit = (fn) => {
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
