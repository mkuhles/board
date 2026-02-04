import React from "react";
import css from "./Board.module.css";
import { SprintFilter } from "../Scrum/SprintFilter";
import type { Sprint } from "../../lib/models";

type BoardToolbarProps = {
  sprints?: Sprint[];
  activeSprintId?: string;
  onSprintChange?: (id: string) => void;
  onNewItem: () => void;
  onBulkImport: () => void;
};

export function BoardToolbar({
  sprints,
  activeSprintId,
  onSprintChange,
  onNewItem,
  onBulkImport,
}: BoardToolbarProps) {
  return (
    <div className={css.toolbar}>
      {sprints && sprints.length > 0 && onSprintChange ? (
        <SprintFilter
          sprints={sprints}
          activeSprintId={activeSprintId}
          onSprintChange={onSprintChange}
        />
      ) : null}

      <div className={css.toolbarSpacer} />

      <div className={css.toolbarActions}>
        <button className={css.smallBtn} onClick={onBulkImport} type="button">
          Bulk import
        </button>
        <button className={css.smallBtn} onClick={onNewItem} type="button">
          + New item
        </button>
      </div>
    </div>
  );
}
