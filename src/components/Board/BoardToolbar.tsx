import React from "react";
import css from "./Board.module.css";
import { SprintFilter } from "../Scrum/SprintFilter";
import type { Sprint } from "../../lib/models";
import { useI18n } from "../../i18n";

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
  const { t } = useI18n();
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
          {t("toolbar.bulkImport")}
        </button>
        <button className={css.smallBtn} onClick={onNewItem} type="button">
          {t("toolbar.newItem")}
        </button>
      </div>
    </div>
  );
}
