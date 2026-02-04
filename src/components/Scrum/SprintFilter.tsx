import css from "./SprintFilter.module.css";
import type { Sprint } from "../../lib/models";

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
  return (
    <div className={css.sprintFilter}>
        <label>
          Sprint:&nbsp;
          <select
            value={activeSprintId}
            onChange={(e) => onSprintChange(e.target.value)}
          >
            <option value="all">Alle</option>
            <option value="backlog">Backlog</option>

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
