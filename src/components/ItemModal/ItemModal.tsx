import React from "react";
import css from "./ItemModal.module.css";
import { ModalShell } from "./ModalShell";
import { ItemModalHeader } from "./ItemModalHeader";
import { ItemForm } from "../ItemForm/ItemForm";
import { ItemModalFooter } from "./ItemModalFooter";
import { formatRelativeTime } from "../../lib/time";
import { useItemModalState } from "../../hooks/useItemModalState";
import type { Item, ItemPayload, Sprint } from "../../lib/models";
import type { StatusOption } from "../../constants/statuses";

type ItemModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialItem?: Item | null;
  defaultTimeOpen?: boolean;
  onCancel: () => void;
  onSubmit: (payload: ItemPayload) => void;
  allItems?: Item[];
  sprints?: Sprint[];
  statuses?: StatusOption[];
};

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
}: ItemModalProps) {
  const isEdit = mode === "edit";
  const {
    areas,
    typeCodes,
    draft,
    typeCodePreview,
    submit,
    registerBeforeSubmit,
  } = useItemModalState({
    isOpen,
    isEdit,
    initialItem,
    sprints,
    statuses,
    onSubmit,
  });

  if (!isOpen) return null;

  const typeConfig = draft.type ? typeCodes?.[draft.type] : undefined;

  return (
    <ModalShell onCancel={onCancel}>
      <ItemModalHeader
        isEdit={isEdit}
        typeCodePreview={typeCodePreview}
        typeLabel={typeConfig?.label}
        typeColor={typeConfig?.color}
        currentId={initialItem?.id}
        createdAt={formatRelativeTime(draft.createdAt)}
        updatedAt={formatRelativeTime(draft.updatedAt)}
        onCancel={onCancel}
      />

      {draft.error ? <div className={css.error}>{draft.error}</div> : null}

      <ItemForm
        draft={draft}
        defaultTimeOpen={defaultTimeOpen}
        registerBeforeSubmit={registerBeforeSubmit}
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
