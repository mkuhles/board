import React, { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { STATUSES } from "../constants/statuses";
import { Column } from "./Column";
import { ItemCard } from "./ItemCard/ItemCard";
import { useHashHighlight } from "../hooks/useHashHighlight";
import css from "./Board.module.css";
import { ItemModal } from "./ItemModal/ItemModal";
import { SprintFilter } from "./Scrum/SprintFilter";

export function Board({
  columns,
  activeItem,
  onDragStart,
  onDragEnd,
  onDeleteItem,
  onCreateItem,
  onUpdateItem,

  sprints,
  onSprintChange,
  onAddItemToSprint,
  canAddItemToSprint,
  activeSprintId
 }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [collapsed, setCollapsed] = useState({ backlog: false });
  useHashHighlight();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editCid, setEditCid] = useState(null);
  const [timeOpen, setTimeOpen] = useState(false);

  const allItems = useMemo(() => Object.values(columns).flat(), [columns]);
  const editingItem =
    editCid
      ? allItems.find((it) => it._cid === editCid) ?? null
      : null;

  const openCreate = () => {
    setEditCid(null);
    setTimeOpen(false);
    setModalOpen(true);
  };

  const openEdit = (item, { focusTime = false } = {}) => {
    setEditCid(item._cid);
    setTimeOpen(Boolean(focusTime));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeOpen(false);
  };

  const openAddTime = (item) => openEdit(item, { focusTime: true });

  const submitModal = (payload, options = {}) => {
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
    if (!options.keepOpen) setModalOpen(false);
  };

  return (
    <>  
      <div className={css.toolbar}>
        {sprints && sprints.length > 0 && onSprintChange ? (
          <SprintFilter
            sprints={sprints}
            activeSprintId={activeSprintId}
            onSprintChange={onSprintChange} />
        ) : null}

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
                  onAddTime={openAddTime}
                  onAddItemToSprint={onAddItemToSprint}
                  canAddItemToSprint={canAddItemToSprint}
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
        defaultTimeOpen={timeOpen}
        onCancel={closeModal}
        onSubmit={submitModal}
        allItems={allItems}
        sprints={sprints ?? []}
        statuses={STATUSES}
      />
    </>
  );
}
