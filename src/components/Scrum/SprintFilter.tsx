import css from "./SprintFilter.module.css";
import type { Sprint } from "../../lib/models";
import { useI18n } from "../../i18n";

type SprintFilterProps = {
  sprints: Sprint[];
  activeSprintId?: string;
  onSprintChange: (value: string) => void;
};

export function SprintFilter({
  sprints,
  activeSprintId,
  onSprintChange,
}: SprintFilterProps) {
  const { t } = useI18n();
  return (
    <div className={css.sprintFilter}>
        <label>
          {t("sprint.label")}:&nbsp;
          <select
            value={activeSprintId}
            onChange={(e) => onSprintChange(e.target.value)}
          >
            <option value="all">{t("sprint.all")}</option>
            <option value="backlog">{t("sprint.backlog")}</option>

            {sprints.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>
  );
}
