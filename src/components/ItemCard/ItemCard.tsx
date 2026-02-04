import React from "react";
import css from "./ItemCard.module.css";
import { AreaChip } from "../AreaChip";
import { useAreas, useTypeCodes } from "../../context/ProjectContext";
import { AnchorLink } from "../AnchorLink";
import { getAreaById } from "../../lib/project";
import {
  AddTimeButton,
  AddToSprintButton,
  ArchiveButton,
  DeleteButton,
} from "./ItemCardActionButtons";
import { Chip } from "../Chip";
import { formatRelativeTime, summarizeTimeEntries } from "../../lib/time";
import { useBoardActions } from "../../context/BoardActionsContext";
import { buildDescriptionTeaser } from "../../lib/text/teaser";
import type { ItemProp } from "../../types/props";
import { useI18n } from "../../i18n";

export function ItemCard({ item }: ItemProp) {
  const { t } = useI18n();
  const {
    onDeleteItem,
    onEditItem,
    onAddTime,
    onAddItemToSprint,
    onArchiveItem,
    canAddItemToSprint,
  } = useBoardActions();
  const areas = useAreas();
  const typeCodes = useTypeCodes();
  const area = getAreaById(areas, item.area_id);
  const typeConfig = item.type ? typeCodes?.[item.type] : undefined;
  const timestamp = item.updated_at || item.created_at || "";
  const timeEntries = Array.isArray(item.time_entries) ? item.time_entries : [];
  const { totalMinutes, billableCount, count: timeEntryCount } =
    summarizeTimeEntries(timeEntries);
  const descriptionTeaser = buildDescriptionTeaser(item.description);

  return (
    <div id={item.id} className={css.card} onDoubleClick={() => onEditItem?.(item)}>
      <div className={css.meta}>
        <span className={css.badge}>{item.id || "—"}</span>

        <div className={css.metaRight}>
          {typeConfig ? (
            <Chip
              label={typeConfig.label}
              title={item.type || ""}
              color={typeConfig.color}
              variant={typeConfig.color ? "outline" : "filled"}
            />
          ) : (
            <span className={css.muted}>{item.type || ""}</span>
          )}
          {item.sprintId && <Chip label={item.sprintId} title={item.sprintId} />}
          <DeleteButton item={item} />
          {canAddItemToSprint && !item.sprintId ? (
            <AddToSprintButton item={item} />
          ) : null }
          {item.status === "done" && onArchiveItem ? (
            <ArchiveButton item={item} />
          ) : null}
        </div>
      </div>

      <div className={css.title}>{item.title || t("card.untitled")}</div>
      <div className={css.cardMarkdown}>{descriptionTeaser}</div>

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
          {timestamp ? (
            <>
              {t("card.updated")}: {formatRelativeTime(timestamp)}
            </>
          ) : null}
          {timeEntryCount ? (
            <>
              {" · "}{t("card.time")}: {timeEntryCount} {t("card.entries")} ·{" "}
              {totalMinutes} {t("card.min")}
              {billableCount ? ` · ${billableCount} ${t("card.billable")}` : ""}
            </>
          ) : null}
        </div>

        {onAddTime ? <AddTimeButton item={item} /> : null}
      </div>
    </div>
  );
}
