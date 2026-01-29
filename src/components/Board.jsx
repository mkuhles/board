import React, { useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { STATUSES } from "../constants/statuses";
import { Column } from "./Column";
import { ItemCard } from "./ItemCard";
import { useHashHighlight } from "../hooks/useHashHighlight";
import css from "./Board.module.css";

export function Board({ columns, activeItem, onDragStart, onDragEnd, onDeleteItem }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [collapsed, setCollapsed] = useState({ backlog: false });
  useHashHighlight();
  
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
                        onDeleteItem={onDeleteItem}
                        collapsible={s.id === "backlog"}
                        collapsed={Boolean(collapsed.backlog) && s.id === "backlog"}
                        onToggleCollapse={() =>
                        setCollapsed((prev) => ({ ...prev, backlog: !prev.backlog }))
                        }
                    />
                </div>
            )
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
