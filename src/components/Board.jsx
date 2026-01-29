import React, { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { STATUSES } from "../constants/statuses";
import { Column } from "./Column";
import { ItemCard } from "./ItemCard";
import { useHashHighlight } from "../hooks/useHashHighlight";
import css from "./Board.module.css";
import { ItemModal } from "./ItemModal";

export function Board({
  columns,
  activeItem,
  onDragStart,
  onDragEnd,
  onDeleteItem,
  onCreateItem,
  onUpdateItem,
 }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [collapsed, setCollapsed] = useState({ backlog: false });
  useHashHighlight();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editCid, setEditCid] = useState(null);

  const allItems = useMemo(() => Object.values(columns).flat(), [columns]);
  const editingItem =
    editCid
      ? allItems.find((it) => it._cid === editCid) ?? null
      : null;

  const openCreate = () => {
    setEditCid(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditCid(item._cid);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const submitModal = (payload) => {
    if (editingItem) {
      if (typeof onUpdateItem !== "function") {
        console.error("onUpdateItem missing. Did you pass board.updateItem to <Board />?");
        return;
      }
      onUpdateItem(editingItem._cid, payload);
    } else {
      if (typeof onCreateItem !== "function") {
        console.error("onCreateItem missing. Did you pass board.createItem to <Board />?");
        return;
      }
      onCreateItem(payload);
    }
    setModalOpen(false);
  };

  return (
    <>  
      <div className={css.toolbar}>
        <button className={css.smallBtn} onClick={openCreate} type="button">
          + New item
        </button>
      </div>

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
                  onEditItem={openEdit}
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

      <ItemModal
        isOpen={modalOpen}
        mode={editingItem ? "edit" : "create"}
        initialItem={editingItem}
        onCancel={closeModal}
        onSubmit={submitModal}
        allItems={allItems}
      />
    </>
  );
}
