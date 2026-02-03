import React from "react";
import css from "./ItemCard.module.css";
import { AreaChip } from "../AreaChip";
import { useAreas } from "../../context/ProjectContext";
import { AnchorLink } from "../AnchorLink";
import { getAreaById } from "../../lib/project";
import { Markdown } from "../Markdown";
import { AddTimeButton, AddToSprintButton, DeleteButton } from "./ItemCardActionButtons";
import { Chip } from "../Chip";
import { formatRelativeTime, summarizeTimeEntries } from "../../lib/time";
import { useBoardActions } from "../../context/BoardActionsContext";

export function ItemCard({
  item
}) {
  const {
    onDeleteItem,
    onEditItem,
    onAddTime,
    onAddItemToSprint,
    canAddItemToSprint,
  } = useBoardActions();
  const areas = useAreas();
  const area = getAreaById(areas, item.area_id);
  const timestamp = item.updated_at || item.created_at || "";
  const timeEntries = Array.isArray(item.time_entries) ? item.time_entries : [];
  const { totalMinutes, billableCount, count: timeEntryCount } =
    summarizeTimeEntries(timeEntries);

  return (
    <div id={item.id} className={css.card} onDoubleClick={() => onEditItem?.(item)}>
      <div className={css.meta}>
        <span className={css.badge}>{item.id || "—"}</span>

        <div className={css.metaRight}>
          <span className={css.muted}>{item.type || ""}</span>
          {item.sprintId && <Chip label={item.sprintId} title={item.sprintId} />}
          <DeleteButton item={item} />
          {canAddItemToSprint && !item.sprintId ? (
            <AddToSprintButton item={item} />
          ) : null }
        </div>
      </div>

      <div className={css.title}>{item.title || "(ohne Titel)"}</div>
      <Markdown className={css.cardMarkdown}>
        {item.description || ""}
      </Markdown>

      <div className={css.chips}>
        <AreaChip area={area} />
        {Array.isArray(item.relates_to)
          ? item.relates_to.slice(0, 6).map((r) => (
              <AnchorLink key={r} toId={r} className={css.chip}>
                {r}
              </AnchorLink>
            ))
          : null}
      </div>

      <div className={css.timeRow}>
        <div className={css.timeMeta}>
          {timestamp ? <>Updated: {formatRelativeTime(timestamp)}</> : null}
          {timeEntryCount ? (
            <>
              {" · "}Time: {timeEntryCount} entries · {totalMinutes} min
              {billableCount ? ` · ${billableCount} billable` : ""}
            </>
          ) : null}
        </div>

        {onAddTime ? <AddTimeButton item={item} /> : null}
      </div>
    </div>
  );
}
