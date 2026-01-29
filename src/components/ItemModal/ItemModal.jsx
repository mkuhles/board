import React, { useMemo } from "react";
import css from "./ItemModal.module.css";
import { useAreas, useTypeCodes } from "../../context/ProjectContext";
import { ModalShell } from "./ModalShell";
import { ItemModalHeader } from "./ItemModalHeader";
import { ItemForm } from "./ItemForm";
import { ItemModalFooter } from "./ItemModalFooter";
import { useItemDraft } from "../../lib/project";

export function ItemModal({
  isOpen,
  mode, // "create" | "edit"
  initialItem,
  onCancel,
  onSubmit,
  allItems,
}) {
  const isEdit = mode === "edit";
  const areas = useAreas();
  const typeCodes = useTypeCodes();

  const draft = useItemDraft({ isOpen, isEdit, initialItem, areas, typeCodes });

  const typeCodePreview = useMemo(
    () => typeCodes?.[draft.type]?.prefix || "",
    [typeCodes, draft.type]
  );

  if (!isOpen) return null;

  const submit = () => {
    const payload = draft.validateAndBuildPayload();
    if (!payload) return;
    onSubmit(payload);
  };

  return (
    <ModalShell onCancel={onCancel}>
      <ItemModalHeader
        isEdit={isEdit}
        typeCodePreview={typeCodePreview}
        currentId={initialItem?.id}
        onCancel={onCancel}
      />

      {draft.error ? <div className={css.error}>{draft.error}</div> : null}

      <ItemForm
        title={draft.title}
        setTitle={draft.setTitle}
        description={draft.description}
        setDescription={draft.setDescription}
        type={draft.type}
        setType={draft.setType}
        areaId={draft.areaId}
        setAreaId={draft.setAreaId}
        relatesToIds={draft.relatesToIds}
        setRelatesToIds={draft.setRelatesToIds}
        typeCodes={typeCodes}
        areas={areas}
        allItems={allItems}
        excludeId={initialItem?.id}
      />

      <ItemModalFooter isEdit={isEdit} onCancel={onCancel} onSubmit={submit} />
    </ModalShell>
  );
}
