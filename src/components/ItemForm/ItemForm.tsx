import React, { useState } from "react";
import css from "../ItemModal/ItemModal.module.css";
import { Markdown } from "../Markdown";
import { useTimeEntryDraft } from "../../hooks/useTimeEntryDraft";
import { ItemFields } from "./ItemFields";
import { RelatesToSection } from "./RelatesToSection";
import { TimeEntriesSection } from "./TimeEntriesSection";
import type { Item } from "../../lib/models";
import type { TimeEntry } from "../../lib/time";
import type { ItemFormLookups, RegisterBeforeSubmit } from "../../types/props";
import { useI18n } from "../../i18n";

export type ItemDraft = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  areaId: string;
  setAreaId: (value: string) => void;
  relatesToIds: string[];
  setRelatesToIds: (value: string[]) => void;
  sprintId: string;
  setSprintId: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  timeEntries: TimeEntry[];
  setTimeEntries: (value: TimeEntry[]) => void;
  createdAt?: string;
  updatedAt?: string;
};

type ItemFormProps = {
  draft: ItemDraft;
  defaultTimeOpen?: boolean;
  registerBeforeSubmit?: RegisterBeforeSubmit;
  allItems?: Item[];
  excludeId?: string;
} & ItemFormLookups;

export function ItemForm({
  draft,
  defaultTimeOpen = false,
  registerBeforeSubmit,
  typeCodes,
  areas,
  allItems,
  excludeId,
  statuses,
  sprints = [],
}: ItemFormProps) {
  const { t } = useI18n();
  const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);
  const {
    title, setTitle,
    description, setDescription,
    type, setType,
    areaId, setAreaId,
    relatesToIds, setRelatesToIds,
    sprintId, setSprintId,
    status, setStatus,
    timeEntries, setTimeEntries,
  } = draft ?? {};

  const {
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
    onChangeStart,
    onChangeMinutes,
    onChangeComment,
    onChangeTags,
    onChangeBillable,
  } = useTimeEntryDraft({
    timeEntries,
    setTimeEntries,
    defaultOpen: defaultTimeOpen,
    registerBeforeSubmit,
  });

  return (
    <div className={css.grid}>
      <ItemFields
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        areaId={areaId}
        setAreaId={setAreaId}
        status={status}
        setStatus={setStatus}
        sprintId={sprintId}
        setSprintId={setSprintId}
        typeCodes={typeCodes}
        areas={areas}
        statuses={statuses}
        sprints={sprints}
      />

      <div className={css.preview}>
        <div className={css.previewHeader}>
          <div className={css.previewLabel}>{t("fields.preview")}</div>
          <button
            className={css.previewToggle}
            type="button"
            onClick={() => setShowDescriptionEditor((v) => !v)}
          >
            {showDescriptionEditor ? t("fields.hideEditor") : t("fields.editDescription")}
          </button>
        </div>
        {showDescriptionEditor ? (
          <textarea
            id="item-desc"
            className={css.previewEditor}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("fields.description")}
            aria-label={t("fields.description")}
          />
        ) : null}
        {description?.trim() ? (
          <Markdown className={css.previewBody}>{description}</Markdown>
        ) : (
          <div className={css.previewEmpty}>{t("fields.previewEmpty")}</div>
        )}
      </div>

      <RelatesToSection
        allItems={allItems}
        relatesToIds={relatesToIds}
        setRelatesToIds={setRelatesToIds}
        excludeId={excludeId}
      />

      <TimeEntriesSection
        timeWrapRef={timeWrapRef}
        isTimeOpen={isTimeOpen}
        setIsTimeOpen={setIsTimeOpen}
        timeEntries={timeEntries}
        timeEntryCount={timeEntryCount}
        totalMinutes={totalMinutes}
        timeStart={timeStart}
        timeMinutes={timeMinutes}
        timeComment={timeComment}
        timeTags={timeTags}
        timeBillable={timeBillable}
        onChangeStart={onChangeStart}
        onChangeMinutes={onChangeMinutes}
        onChangeComment={onChangeComment}
        onChangeTags={onChangeTags}
        onChangeBillable={onChangeBillable}
        onAddTimeEntry={handleAddTimeEntry}
        timeDirty={timeDirty}
      />
    </div>
  );
}
