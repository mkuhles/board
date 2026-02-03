import { useMemo, useRef } from "react";
import { useAreas, useTypeCodes } from "../context/ProjectContext";
import { useItemDraft } from "../lib/project";

export function useItemModalState({
  isOpen,
  isEdit,
  initialItem,
  sprints,
  statuses,
  onSubmit,
}) {
  const areas = useAreas();
  const typeCodes = useTypeCodes();
  const beforeSubmitRef = useRef(null);

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

  const registerBeforeSubmit = (fn) => {
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
