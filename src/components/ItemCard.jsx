import React from "react";
import css from "./ItemCard.module.css";
import { AreaChip } from "./AreaChip";
import { useAreas } from "../context/ProjectContext";
import { AnchorLink } from "./AnchorLink";
import { getAreaById } from "../lib/project";

export function ItemCard({ item, onDelete, onEdit }) {
  const areas = useAreas();
  const area = getAreaById(areas, item.area_id);

  return (
    <div id={item.id} className={css.card} onDoubleClick={() => onEdit?.(item)}>
      <div className={css.meta}>
        <span className={css.badge}>{item.id || "—"}</span>

        <div className={css.metaRight}>
          <span className={css.muted}>{item.type || ""}</span>
          <button
            className={css.deleteBtn}
            type="button"
            title="Löschen"
            onClick={() => onDelete?.(item)}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className={css.title}>{item.title || "(ohne Titel)"}</div>
      {item.description ? <div className={css.desc}>{item.description}</div> : null}

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
    </div>
  );
}
