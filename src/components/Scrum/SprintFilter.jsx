import css from "./SprintFilter.module.css";

export function SprintFilter({
  sprints,
  activeSprintId,
  onSprintChange,
}) {
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