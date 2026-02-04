import React, { useMemo, useState } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { STATUSES } from "../../constants/statuses";
import { useHashHighlight } from "../../hooks/useHashHighlight";
import css from "./Board.module.css";
import { ItemModal } from "../ItemModal/ItemModal";
import { BoardActionsProvider } from "../../context/BoardActionsContext";
import { useBoardModal } from "../../hooks/useBoardModal";
import { BoardToolbar } from "./BoardToolbar";
import { BoardColumns } from "./BoardColumns";

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
  
  const allItems = useMemo(() => Object.values(columns).flat(), [columns]);
  const {
    modalOpen,
    timeOpen,
    editingItem,
    openCreate,
    openEdit,
    openAddTime,
    closeModal,
    submitModal,
  } = useBoardModal({
    allItems,
    onCreateItem,
    onUpdateItem,
  });

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <BoardActionsProvider
      value={{
        onEditItem: openEdit,
        onAddTime: openAddTime,
        onDeleteItem,
        onAddItemToSprint,
        canAddItemToSprint,
      }}
    >
      <>
        <BoardToolbar
          sprints={sprints}
          activeSprintId={activeSprintId}
          onSprintChange={onSprintChange}
          onNewItem={openCreate}
        />

        <BoardColumns
          sensors={sensors}
          columns={columns}
          activeItem={activeItem}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />

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
    </BoardActionsProvider>
  );
}
