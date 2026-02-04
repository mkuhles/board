import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableItem } from "./DraggableItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import css from "./Column.module.css";
import type { Item } from "../lib/models";

type ColumnProps = {
  statusId: string;
  title: string;
  items: Item[];
  accentColor?: string;
  accentTextColor?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse: () => void;
};

export function Column({
  statusId,
  title,
  items,
  accentColor,
  accentTextColor,
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
}: ColumnProps) {
  const droppableId = `col:${statusId}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  const style = {
    "--column-accent": accentColor || "#4b5563",
    "--column-accent-text": accentTextColor || "#f8fafc",
  } as React.CSSProperties;

  const columnClass = [
    css.column,
    isOver ? css.columnOver : "",
    collapsed ? css.columnCollapsed : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setNodeRef} className={columnClass} style={style}>
      <div className={css.header}>
        <div className={css.titleRow}>
          <div className={css.title}>{title}</div>
          <div className={css.count}>{items.length}</div>
        </div>

        {collapsible ? (
          <button className={css.collapseBtn} onClick={onToggleCollapse} type="button">
            {collapsed ? "›" : "‹"}
          </button>
        ) : null}
      </div>

      {!collapsed ? (
        <div className={css.body}>
          <SortableContext
            items={items.map((it) => `item:${it._cid}`)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <DraggableItem
                key={item._cid}
                item={item}
              />
            ))}
          </SortableContext>
        </div>
      ) : (
        <div className={css.headerCollapsed}>
          <button
          className={css.collapseBtn}
          onClick={onToggleCollapse}
          type="button"
          title={`${title} anzeigen`}
          >
            ›
          </button>

          <div className={css.titleVertical}>{title}</div>

          <div className={css.countPill} title={`${items.length} Items`}>
            {items.length}
          </div>
        </div>
      )}
    </div>
  );
}
