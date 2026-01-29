import React from "react";
import css from "./App.module.css";
import { useProjectFile } from "./hooks/useProjectFile";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { TopBar } from "./components/TopBar";
import { EmptyState } from "./components/EmptyState";
import { Board } from "./components/Board";

export default function App() {
  const file = useProjectFile();

  const board = useKanbanBoard(file.project, file.setProject, {
    onChange: file.autosave,
  });

  const handleOpen = () => file.open(board.ensureClientIds);

  return (
    <div className={css.page}>
      <div className={css.container}>
        <TopBar
          supportOk={file.supportOk}
          projectLoaded={Boolean(file.project)}
          isSaving={file.isSaving}
          onOpen={handleOpen}
          onSave={() => file.save()}
          onSaveAs={() => file.saveAs()}
        />

        {file.error ? <div className={css.alertError}>{file.error}</div> : null}
        {file.info ? <div className={css.alertInfo}>{file.info}</div> : null}

        {!file.project ? (
          <EmptyState />
        ) : (
          <Board
            columns={board.columns}
            activeItem={board.activeItem}
            onDragStart={board.dnd.onDragStart}
            onDragEnd={board.dnd.onDragEnd}
            onDeleteItem={board.deleteItem}
          />
        )}
      </div>
    </div>
  );
}
