import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableItem } from "./DraggableItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import css from "./Column.module.css";

export function Column({
  statusId,
  title,
  items,
  onDeleteItem,
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
  onEditItem
}) {
  const droppableId = `col:${statusId}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  
  const columnClass = [
    css.column,
    isOver ? css.columnOver : "",
    collapsed ? css.columnCollapsed : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setNodeRef} className={columnClass}>
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
                onDelete={onDeleteItem}
                onEdit={onEditItem}
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
          title="Backlog anzeigen"
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
