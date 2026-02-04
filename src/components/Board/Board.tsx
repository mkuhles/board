import React, { useMemo, useState } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { STATUSES } from "../../constants/statuses";
import { useHashHighlight } from "../../hooks/useHashHighlight";
import css from "./Board.module.css";
import { ItemModal } from "../ItemModal/ItemModal";
import { BoardActionsProvider } from "../../context/BoardActionsContext";
import { useTypeCodes } from "../../context/ProjectContext";
import { useBoardModal } from "../../hooks/useBoardModal";
import { BoardToolbar } from "./BoardToolbar";
import { BoardColumns } from "./BoardColumns";
import { BulkImportModal } from "./BulkImportModal";
import type { Item, ItemPatch, ItemPayload, Sprint } from "../../lib/models";
import type { DragEvent } from "../../lib/kanban/dnd";

type BoardProps = {
  columns: Record<string, Item[]>;
  activeItem: Item | null;
  onDragStart: (event: DragEvent) => void;
  onDragEnd: (event: DragEvent) => void;
  onDeleteItem?: (item: Item) => void;
  onCreateItem?: (payload: ItemPayload) => void;
  onUpdateItem?: (cid: string, payload: ItemPatch) => void;
  onBulkImport?: (payloads: ItemPayload[]) => void;
  sprints?: Sprint[];
  onSprintChange?: (id: string) => void;
  onAddItemToSprint?: (item: Item) => void;
  onArchiveItem?: (item: Item) => void;
  canAddItemToSprint?: boolean;
  activeSprintId?: string;
};

export function Board({
  columns,
  activeItem,
  onDragStart,
  onDragEnd,
  onDeleteItem,
  onCreateItem,
  onUpdateItem,
  onBulkImport,
  sprints,
  onSprintChange,
  onAddItemToSprint,
  onArchiveItem,
  canAddItemToSprint,
  activeSprintId,
}: BoardProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [collapsed, setCollapsed] = useState({
    backlog: true,
    archived: true,
  });
  const [bulkOpen, setBulkOpen] = useState(false);
  const typeCodes = useTypeCodes();
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

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBulkImport = (payloads: ItemPayload[]) => {
    onBulkImport?.(payloads);
  };

  return (
    <BoardActionsProvider
      value={{
        onEditItem: openEdit,
        onAddTime: openAddTime,
        onDeleteItem,
        onAddItemToSprint,
        onArchiveItem,
        canAddItemToSprint,
      }}
    >
      <div className={css.boardShell}>
        <BoardToolbar
          sprints={sprints}
          activeSprintId={activeSprintId}
          onSprintChange={onSprintChange}
          onNewItem={openCreate}
          onBulkImport={() => setBulkOpen(true)}
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

        <BulkImportModal
          isOpen={bulkOpen}
          onCancel={() => setBulkOpen(false)}
          onImport={handleBulkImport}
          typeCodes={typeCodes}
        />
      </div>
    </BoardActionsProvider>
  );
}
