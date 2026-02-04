import React from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { STATUSES } from "../../constants/statuses";
import { Column } from "../Column";
import { ItemCard } from "../ItemCard/ItemCard";
import css from "./Board.module.css";
import type { Item } from "../../lib/models";
import type { DragEvent } from "../../lib/kanban/dnd";

type BoardColumnsProps = {
  sensors: unknown;
  columns: Record<string, Item[]>;
  activeItem: Item | null;
  collapsed: Record<string, boolean>;
  onToggleCollapse: (id: string) => void;
  onDragStart: (event: DragEvent) => void;
  onDragEnd: (event: DragEvent) => void;
};

export function BoardColumns({
  sensors,
  columns,
  activeItem,
  collapsed,
  onToggleCollapse,
  onDragStart,
  onDragEnd,
}: BoardColumnsProps) {
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
