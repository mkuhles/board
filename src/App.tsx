import React, { useEffect, useMemo, useState } from "react";
import css from "./App.module.css";
import { useProjectFile } from "./hooks/useProjectFile";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { useProjectMeta } from "./hooks/useProjectMeta";
import { useSprintFilter } from "./hooks/useSprintFilter";
import { TopBar } from "./components/TopBar";
import { EmptyState } from "./components/EmptyState";
import { Board } from "./components/Board/Board";
import { ProjectProvider } from "./context/ProjectContext";
import { Notifications } from "./components/Notifications";
import type { Item, ItemPayload } from "./lib/models";
import { I18nProvider, useI18n } from "./i18n";

function AppContent() {
  const file = useProjectFile();
  const [dismissedError, setDismissedError] = useState(false);
  const [dismissedInfo, setDismissedInfo] = useState(false);
  const [dismissedImport, setDismissedImport] = useState(false);
  const [importedItems, setImportedItems] = useState<Item[]>([]);
  const board = useKanbanBoard(file.project, file.setProject, {
    onChange: file.autosave,
  });

  const handleOpen = () => file.open(board.ensureClientIds);
  const sprints = file.project?.sprints;

  const projectMeta = useProjectMeta(file.project);
  const {
    activeSprintId,
    handleSprintChange,
    visibleColumns,
    canAddItemToSprint,
  } = useSprintFilter({
    project: file.project,
    columns: board.columns,
    setProject: file.setProject,
    autosave: file.autosave,
  });

  const nextOrderToDo = (board.columns.todo?.reduce((m, it) => Math.max(m, it.order ?? 0), -1) ?? -1) + 1;
  const handleArchiveItem = (item: Item) => {
    if (!item._cid) return;
    board.updateItem(item._cid, { status: "archived" });
  };
  const handleAddItemToSprint = (item: Item) => {
    if (!item._cid) return;
    board.updateItem(item._cid, {
      sprintId: activeSprintId,
      status: "todo",
      order: nextOrderToDo,
    });
  };

  const handleBulkImport = (payloads: ItemPayload[]) => {
    const created = board.createItems(payloads);
    if (created.length > 0) {
      setImportedItems(created);
    }
  };

  useEffect(() => {
    setDismissedError(false);
  }, [file.error]);

  useEffect(() => {
    setDismissedInfo(false);
  }, [file.info]);

  useEffect(() => {
    if (importedItems.length > 0) {
      setDismissedImport(false);
    }
  }, [importedItems]);

  return (
    <div className={css.page}>
      <div className={css.container}>
        <TopBar
          supportOk={file.supportOk}
          projectLoaded={Boolean(file.project)}
          projectName={file.project?.name}
          isSaving={file.isSaving}
          onOpen={handleOpen}
          onSave={() => file.save()}
          onSaveAs={() => file.saveAs()}
        />

        <Notifications
          error={file.error}
          info={file.info}
          importedItems={importedItems}
          dismissedError={dismissedError}
          dismissedInfo={dismissedInfo}
          dismissedImport={dismissedImport}
          onDismissError={() => setDismissedError(true)}
          onDismissInfo={() => setDismissedInfo(true)}
          onDismissImport={() => setDismissedImport(true)}
        />

        {!file.project ? (
          <EmptyState />
        ) : (
          <ProjectProvider value={projectMeta}>
            <div className={css.boardWrap}>
              <Board
                columns={visibleColumns}
                activeItem={board.activeItem}
                onDragStart={board.dnd.onDragStart}
                onDragEnd={board.dnd.onDragEnd}
                onDeleteItem={board.deleteItem}
                onCreateItem={board.createItem}
                onUpdateItem={board.updateItem}
                onBulkImport={handleBulkImport}
                sprints={sprints}
                activeSprintId={activeSprintId}
                onSprintChange={handleSprintChange}
                onAddItemToSprint={handleAddItemToSprint}
                onArchiveItem={handleArchiveItem}
                canAddItemToSprint={canAddItemToSprint}
              />
            </div>
          </ProjectProvider>
          
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
