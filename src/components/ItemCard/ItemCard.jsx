import React from "react";
import css from "./ItemCard.module.css";
import { AreaChip } from "../AreaChip";
import { useAreas } from "../../context/ProjectContext";
import { AnchorLink } from "../AnchorLink";
import { getAreaById } from "../../lib/project";
import { Markdown } from "../Markdown";
import { DeleteButton } from "./ItemCardActionButtons";
import { AddToSprintButton } from "./ItemCardActionButtons";
import { Chip } from "../Chip";
import { formatRelativeTime } from "../../lib/time";

export function ItemCard({ item, onDelete, onEdit, canAddToSprint, onAddToSprint }) {
  const areas = useAreas();
  const area = getAreaById(areas, item.area_id);
  const timestamp = item.updated_at || item.created_at || "";

  return (
    <div id={item.id} className={css.card} onDoubleClick={() => onEdit?.(item)}>
      <div className={css.meta}>
        <span className={css.badge}>{item.id || "—"}</span>

        <div className={css.metaRight}>
          <span className={css.muted}>{item.type || ""}</span>
          {item.sprintId && <Chip label={item.sprintId} title={item.sprintId} />}
          <DeleteButton item={item} onDelete={onDelete} />
          {canAddToSprint && !item.sprintId ? (
            <AddToSprintButton item={item} onAddToSprint={onAddToSprint} />
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

      {timestamp ? (
        <div className={css.timeMeta}>
          Updated: {formatRelativeTime(timestamp)}
        </div>
      ) : null}
    </div>
  );
}
