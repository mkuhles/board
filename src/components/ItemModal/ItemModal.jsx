import React, { useMemo, useRef } from "react";
import css from "./ItemModal.module.css";
import { useAreas, useTypeCodes } from "../../context/ProjectContext";
import { ModalShell } from "./ModalShell";
import { ItemModalHeader } from "./ItemModalHeader";
import { ItemForm } from "./ItemForm";
import { ItemModalFooter } from "./ItemModalFooter";
import { useItemDraft } from "../../lib/project";
import { formatRelativeTime } from "../../lib/time";

export function ItemModal({
  isOpen,
  mode, // "create" | "edit"
  initialItem,
  defaultTimeOpen = false,
  onCancel,
  onSubmit,
  allItems,
  sprints = [],
  statuses = [],
}) {
  const isEdit = mode === "edit";
  const areas = useAreas();
  const typeCodes = useTypeCodes();
  const beforeSubmitRef = useRef(null);

  const draft = useItemDraft({ isOpen, isEdit, initialItem, areas, typeCodes, sprints, statuses });

  const typeCodePreview = useMemo(
    () => typeCodes?.[draft.type]?.prefix || "",
    [typeCodes, draft.type]
  );

  const canShowSprint = useMemo(() => (sprints ?? []).length > 0, [sprints]);

  if (!isOpen) return null;

  const submit = () => {
    const pendingEntry = beforeSubmitRef.current?.();
    const payload = draft.validateAndBuildPayload();
    if (!payload) return;
    if (pendingEntry) {
      payload.time_entries = [...(draft.timeEntries ?? []), pendingEntry];
    }
    onSubmit(payload);
  };

  const quickSave = () => {
    if (!isEdit) return;
    const payload = draft.validateAndBuildPayload();
    if (!payload) return;
    onSubmit(payload, { keepOpen: true });
  };

  return (
    <ModalShell onCancel={onCancel}>
      <ItemModalHeader
        isEdit={isEdit}
        typeCodePreview={typeCodePreview}
        currentId={initialItem?.id}
        createdAt={formatRelativeTime(draft.createdAt)}
        updatedAt={formatRelativeTime(draft.updatedAt)}
        onCancel={onCancel}
      />

      {draft.error ? <div className={css.error}>{draft.error}</div> : null}

      <ItemForm
        draft={draft}
        defaultTimeOpen={defaultTimeOpen}
        isEdit={isEdit}
        onQuickSave={quickSave}
        registerBeforeSubmit={(fn) => {
          beforeSubmitRef.current = fn;
        }}
        typeCodes={typeCodes}
        areas={areas}
        allItems={allItems}
        excludeId={initialItem?.id}
        statuses={statuses}
        sprints={sprints}
      />

      <ItemModalFooter isEdit={isEdit} onCancel={onCancel} onSubmit={submit} />
    </ModalShell>
  );
}
