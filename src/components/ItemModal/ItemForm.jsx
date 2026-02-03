import React from "react";
import { RelatedToInput } from "./RelatedToInput";
import { Field } from "./Field";
import css from "./ItemModal.module.css";
import { Markdown } from "../Markdown";
import {
  formatLocalDateTime,
} from "../../lib/time";
import { useTimeEntryDraft } from "../../hooks/useTimeEntryDraft";

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
      <Field label="Title" inputId="item-title" required>
        <input
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </Field>

      <Field label="Type" inputId="item-type" required>
        <select className={css.input} value={type} onChange={(e) => setType(e.target.value)}>
          {Object.entries(typeCodes ?? {}).map(([typeKey, cfg]) => (
            <option key={typeKey} value={typeKey}>
              {cfg.label} ({cfg.prefix ?? "?"})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Status" inputId="item-status" required>
        <select className={css.input} value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((stat) => (
            <option key={stat.id} value={stat.id}>
              {stat.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Area" inputId="item-area" required>
        <select className={css.input} value={areaId} onChange={(e) => setAreaId(e.target.value)}>
          <option value="" disabled>
            Select area…
          </option>
          {(areas ?? []).map((a) => (
            <option key={a.id} value={a.id}>
              {a.title} {Number.isFinite(a.number) ? `(${a.number})` : ""}
            </option>
          ))}
        </select>
      </Field>

      {sprints && (<Field label="Sprint" inputId="item-strint">
        <select className={css.input} value={sprintId} onChange={(e) => setSprintId(e.target.value)}>
          <option key="none" value="">none</option>
          {Object.entries(sprints).map(([typeKey, cfg]) => (
            <option key={cfg.id} value={cfg.id}>
              {cfg.title} ({cfg.start})
            </option>
          ))}
        </select>
      </Field>)}

      <Field label="Description" inputId="item-desc" wide>
        <textarea
          className={css.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      {description?.trim() ? (
        <div className={css.preview}>
          <div className={css.previewLabel}>Preview</div>
          <Markdown className={css.previewBody}>{description}</Markdown>
        </div>
      ) : null}

      <Field label="Relates to" inputId="item-relates" wide>
        <RelatedToInput
          allItems={allItems}
          valueIds={relatesToIds}
          onChangeIds={setRelatesToIds}
          excludeId={excludeId}
        />
      </Field>

      <div className={css.timeWrap} ref={timeWrapRef}>
        <details
          className={css.accordion}
          open={isTimeOpen}
          onToggle={(e) => setIsTimeOpen(e.currentTarget.open)}
        >
          <summary className={css.accordionSummary}>
            Time entries
            <span className={css.accordionMeta}>
              {timeEntryCount} entries · {totalMinutes} min
            </span>
          </summary>

          {(timeEntries ?? []).length ? (
            <div className={css.timeList}>
              {(timeEntries ?? []).map((entry, idx) => (
                <div key={`${entry.start_at || "t"}-${idx}`} className={css.timeRow}>
                  <div className={css.timeWhen}>{formatLocalDateTime(entry.start_at)}</div>
                  <div className={css.timeMinutes}>{entry.minutes} min</div>
                  {entry.comment ? (
                    <div className={css.timeComment}>{entry.comment}</div>
                  ) : null}
                  {(entry.tags ?? []).length ? (
                    <div className={css.timeTags}>
                      {(entry.tags ?? []).map((tag) => (
                        <span key={`${tag}-${idx}`} className={css.timeTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {entry.billable ? (
                    <span className={css.timeBillable}>billable</span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className={css.timeEmpty}>No time entries yet.</div>
          )}

          <div className={css.timeForm}>
            <div className={css.timeField}>
              <label className={css.timeLabel} htmlFor="time-start">Start</label>
              <input
                id="time-start"
                className={css.input}
                type="datetime-local"
                value={timeStart}
                onChange={(e) => onChangeStart(e.target.value)}
              />
            </div>

            <div className={css.timeField}>
              <label className={css.timeLabel} htmlFor="time-minutes">Minutes</label>
              <input
                id="time-minutes"
                className={css.input}
                type="number"
                min="1"
                value={timeMinutes}
                onChange={(e) => onChangeMinutes(e.target.value)}
              />
            </div>

            <div className={css.timeFieldWide}>
              <label className={css.timeLabel} htmlFor="time-comment">Comment</label>
              <input
                id="time-comment"
                className={css.input}
                value={timeComment}
                onChange={(e) => onChangeComment(e.target.value)}
                placeholder="What did you do?"
              />
            </div>

            <div className={css.timeFieldWide}>
              <label className={css.timeLabel} htmlFor="time-tags">Tags</label>
              <input
                id="time-tags"
                className={css.input}
                value={timeTags}
                onChange={(e) => onChangeTags(e.target.value)}
                placeholder="dev, research, meeting"
              />
            </div>

            <label className={css.timeCheckbox}>
              <input
                type="checkbox"
                checked={timeBillable}
                onChange={(e) => onChangeBillable(e.target.checked)}
              />
              Billable
            </label>

            <button className={css.timeAddBtn} type="button" onClick={handleAddTimeEntry}>
              Add time entry
            </button>

            {timeDirty ? (
              <div className={css.timeHint}>
                Pending entry will be included on Save changes.
              </div>
            ) : null}
          </div>
        </details>
      </div>
    </div>
  );
}
