import React from "react";
import css from "./ItemModal.module.css";
import { Markdown } from "../Markdown";
import { useTimeEntryDraft } from "../../hooks/useTimeEntryDraft";
import { ItemFields } from "./ItemFields";
import { RelatesToSection } from "./RelatesToSection";
import { TimeEntriesSection } from "./TimeEntriesSection";

export function ItemForm({
  draft,
  defaultTimeOpen = false,
  registerBeforeSubmit,
  typeCodes,
  areas,
  allItems,
  excludeId,
  statuses,
  sprints=[],
}) {
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
        description={description}
        setDescription={setDescription}
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

      {description?.trim() ? (
        <div className={css.preview}>
          <div className={css.previewLabel}>Preview</div>
          <Markdown className={css.previewBody}>{description}</Markdown>
        </div>
      ) : null}

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
