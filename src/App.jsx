import React, { useMemo } from "react";
import css from "./App.module.css";
import { useProjectFile } from "./hooks/useProjectFile";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { TopBar } from "./components/TopBar";
import { EmptyState } from "./components/EmptyState";
import { Board } from "./components/Board";
import { ProjectProvider } from "./context/ProjectContext";

export default function App() {
  const file = useProjectFile();

  const board = useKanbanBoard(file.project, file.setProject, {
    onChange: file.autosave,
  });

  const handleOpen = () => file.open(board.ensureClientIds);


  const projectMeta = useMemo(() => ({
    name: file.project?.name ?? '',
    areas: file.project?.areas ?? [],
    typeCodes: file.project?.typeCodes ?? {}
  }), [file.project?.name, file.project?.areas, file.project?.typeCodes]);
  
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
          <ProjectProvider value={projectMeta}>
            <Board
              columns={board.columns}
              activeItem={board.activeItem}
              onDragStart={board.dnd.onDragStart}
              onDragEnd={board.dnd.onDragEnd}
              onDeleteItem={board.deleteItem}
            />
          </ProjectProvider>
          
        )}
      </div>
    </div>
  );
}
