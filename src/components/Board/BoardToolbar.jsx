import React from "react";
import css from "./Board.module.css";
import { SprintFilter } from "../Scrum/SprintFilter";

export function BoardToolbar({
  sprints,
  activeSprintId,
  onSprintChange,
  onNewItem,
}) {
  return (
    <div className={css.toolbar}>
      {sprints && sprints.length > 0 && onSprintChange ? (
        <SprintFilter
          sprints={sprints}
          activeSprintId={activeSprintId}
          onSprintChange={onSprintChange}
        />
      ) : null}

      <button className={css.smallBtn} onClick={onNewItem} type="button">
        + New item
      </button>
    </div>
  );
}
