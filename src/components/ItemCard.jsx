import React from "react";
import css from "./ItemCard.module.css";

export function ItemCard({ item, onDelete }) {
  return (
    <div className={css.card}>
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
        {item.area ? <span className={css.chip}>{item.area}</span> : null}
        <span className={css.chip}>status: {item.status}</span>
        {Array.isArray(item.relates_to)
          ? item.relates_to.slice(0, 6).map((r) => (
              <span key={r} className={css.chip}>
                {r}
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
