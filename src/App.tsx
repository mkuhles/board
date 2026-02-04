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
import type { Item } from "./lib/models";

export default function App() {
  const file = useProjectFile();
  const [dismissedError, setDismissedError] = useState(false);
  const [dismissedInfo, setDismissedInfo] = useState(false);
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

  useEffect(() => {
    setDismissedError(false);
  }, [file.error]);

  useEffect(() => {
    setDismissedInfo(false);
  }, [file.info]);

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

        <div className={css.toastStack}>
          {file.error && !dismissedError ? (
            <div className={`${css.alertError} ${css.toast}`}>
              <div>{file.error}</div>
              <button
                className={css.toastClose}
                type="button"
                aria-label="Close error"
                onClick={() => setDismissedError(true)}
              >
                ×
              </button>
            </div>
          ) : null}
          {file.info && !dismissedInfo ? (
            <div className={`${css.alertInfo} ${css.toast}`}>
              <div>{file.info}</div>
              <button
                className={css.toastClose}
                type="button"
                aria-label="Close info"
                onClick={() => setDismissedInfo(true)}
              >
                ×
              </button>
            </div>
          ) : null}
        </div>

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
