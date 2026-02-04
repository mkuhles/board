import React from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { STATUSES } from "../../constants/statuses";
import { Column } from "../Column";
import { ItemCard } from "../ItemCard/ItemCard";
import css from "./Board.module.css";

export function BoardColumns({
  sensors,
  columns,
  activeItem,
  collapsed,
  onToggleCollapse,
  onDragStart,
  onDragEnd,
}) {
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={css.board}>
        {STATUSES.map((s) => {
          const isBacklog = s.id === "backlog";
          const isCollapsed = isBacklog && collapsed.backlog;

          return (
            <div
              key={s.id}
              className={isCollapsed ? css.columnCollapsedWrap : css.columnGrow}
            >
              <Column
                key={s.id}
                statusId={s.id}
                title={s.title}
                items={columns[s.id] || []}
                collapsible={s.id === "backlog"}
                collapsed={Boolean(collapsed.backlog) && s.id === "backlog"}
                onToggleCollapse={() => onToggleCollapse("backlog")}
              />
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div style={{ width: 320 }}>
            <ItemCard item={activeItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
