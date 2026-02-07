import React from "react";
import css from "../ItemModal/ItemModal.module.css";
import { formatLocalDateTime } from "../../lib/time";
import type { TimeEntry } from "../../lib/time";
import { useI18n } from "../../i18n";

type TimeEntriesSectionProps = {
  timeWrapRef: React.RefObject<HTMLDivElement>;
  isTimeOpen: boolean;
  setIsTimeOpen: (open: boolean) => void;
  timeEntries: TimeEntry[];
  timeEntryCount: number;
  totalMinutes: number;
  timeStart: string;
  timeMinutes: number;
  timeComment: string;
  timeTags: string;
  timeBillable: boolean;
  onChangeStart: (value: string) => void;
  onChangeMinutes: (value: string) => void;
  onChangeComment: (value: string) => void;
  onChangeTags: (value: string) => void;
  onChangeBillable: (value: boolean) => void;
  onAddTimeEntry: () => void;
  timeDirty: boolean;
};

export function TimeEntriesSection({
  timeWrapRef,
  isTimeOpen,
  setIsTimeOpen,
  timeEntries,
  timeEntryCount,
  totalMinutes,
  timeStart,
  timeMinutes,
  timeComment,
  timeTags,
  timeBillable,
  onChangeStart,
  onChangeMinutes,
  onChangeComment,
  onChangeTags,
  onChangeBillable,
  onAddTimeEntry,
  timeDirty,
}: TimeEntriesSectionProps) {
  const { t } = useI18n();
  return (
    <div className={css.timeWrap} ref={timeWrapRef}>
      <details
        className={css.accordion}
        open={isTimeOpen}
        onToggle={(e) => setIsTimeOpen(e.currentTarget.open)}
      >
        <summary className={css.accordionSummary}>
          {t("time.entries")}
          <span className={css.accordionMeta}>
            {t("time.entryMeta", { count: timeEntryCount, minutes: totalMinutes })}
          </span>
        </summary>

        {(timeEntries ?? []).length ? (
          <div className={css.timeList}>
            {(timeEntries ?? []).map((entry, idx) => (
              <div key={`${entry.start_at || "t"}-${idx}`} className={css.timeRow}>
                <div className={css.timeWhen}>{formatLocalDateTime(entry.start_at)}</div>
                <div className={css.timeMinutes}>{entry.minutes} {t("card.min")}</div>
                {entry.billable || entry.comment || (entry.tags ?? []).length ? (
                  <div className={css.timeCommentRow}>
                    {entry.comment ? (
                      <div className={css.timeComment}>{entry.comment}</div>
                    ) : null}
                    {entry.billable ? (
                      <span className={css.timeBillable}>{t("time.billableTag")}</span>
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
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className={css.timeEmpty}>{t("time.noEntries")}</div>
        )}

        <div className={css.timeForm}>
          <div className={css.timeField}>
            <label className={css.timeLabel} htmlFor="time-start">{t("time.start")}</label>
            <input
              id="time-start"
              className={css.input}
              type="datetime-local"
              value={timeStart}
              onChange={(e) => onChangeStart(e.target.value)}
            />
          </div>

          <div className={css.timeField}>
            <label className={css.timeLabel} htmlFor="time-minutes">{t("time.minutes")}</label>
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
            <label className={css.timeLabel} htmlFor="time-comment">{t("time.comment")}</label>
            <input
              id="time-comment"
              className={css.input}
              value={timeComment}
              onChange={(e) => onChangeComment(e.target.value)}
              placeholder={t("time.commentPlaceholder")}
            />
          </div>

          <div className={css.timeFieldWide}>
            <label className={css.timeLabel} htmlFor="time-tags">{t("time.tags")}</label>
            <input
              id="time-tags"
              className={css.input}
              value={timeTags}
              onChange={(e) => onChangeTags(e.target.value)}
              placeholder={t("time.tagsPlaceholder")}
            />
          </div>

          <label className={css.timeCheckbox}>
            <input
              type="checkbox"
              checked={timeBillable}
              onChange={(e) => onChangeBillable(e.target.checked)}
            />
            {t("time.billable")}
          </label>

          <button className={css.timeAddBtn} type="button" onClick={onAddTimeEntry}>
            {t("time.addEntry")}
          </button>

          {timeDirty ? (
            <div className={css.timeHint}>
              {t("time.pendingHint")}
            </div>
          ) : null}
        </div>
      </details>
    </div>
  );
}
