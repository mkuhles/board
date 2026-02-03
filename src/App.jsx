import React, { useMemo } from "react";
import css from "./App.module.css";
import { useProjectFile } from "./hooks/useProjectFile";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { TopBar } from "./components/TopBar";
import { EmptyState } from "./components/EmptyState";
import { Board } from "./components/Board/Board";
import { ProjectProvider } from "./context/ProjectContext";
import { filterItemsBySprint } from "./lib/scrum/filterItemsBySprint"
import { useEffect } from "react";

export default function App() {
  const file = useProjectFile();
  const [activeSprintId, setActiveSprintId] = React.useState(file.project?.meta?.activeSprintId ?? "all");
  
  useEffect(() => {
    if (!file.project) return;
    setActiveSprintId(file.project?.meta?.activeSprintId ?? "all");
  }, [file.project]);  
  
  const handleSprintChange = (nextId) => {
    setActiveSprintId(nextId);

    file.setProject((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        meta: { ...(prev.meta ?? {}), activeSprintId: nextId },
      };

      file.autosave?.(next);
      return next;
    });
  };

  const board = useKanbanBoard(file.project, file.setProject, {
    onChange: file.autosave,
  });

  const visibleColumns = useMemo(() => {
    const cols = board.columns;
    if (!file.project) return cols;

    const hasSprints = Array.isArray(file.project.sprints) && file.project.sprints.length > 0;
    if (!hasSprints || activeSprintId === "all") return cols;

    // Sonderfall: "backlog" als Filtermodus
    if (activeSprintId === "backlog") {
      return {
        ...cols,
        backlog: (cols.backlog ?? []).filter((it) => !it.sprintId),
        todo: [],
        doing: [],
        done: [],
        archived: cols.archived ?? [], // falls du archived hast, sonst weglassen
      };
    }

    // Sprint X aktiv:
    const inSprint = (it) => it.sprintId === activeSprintId;

    return {
      ...cols,
      // backlog absichtlich NICHT filtern:
      backlog: cols.backlog ?? [],
      // alle anderen Spalten filtern:
      todo: (cols.todo ?? []).filter(inSprint),
      doing: (cols.doing ?? []).filter(inSprint),
      done: (cols.done ?? []).filter(inSprint),
      archived: (cols.archived ?? []).filter(inSprint), // falls vorhanden
    };
  }, [board.columns, file.project, activeSprintId]);


  const handleOpen = () => file.open(board.ensureClientIds);
  const sprints = file.project?.sprints;

  const projectMeta = useMemo(() => ({
    name: file.project?.name ?? '',
    areas: file.project?.areas ?? [],
    typeCodes: file.project?.typeCodes ?? {}
  }), [file.project?.name, file.project?.areas, file.project?.typeCodes]);

  const nextOrderToDo = (board.columns.todo?.reduce((m, it) => Math.max(m, it.order ?? 0), -1) ?? -1) + 1;

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

        {file.error ? <div className={css.alertError}>{file.error}</div> : null}
        {file.info ? <div className={css.alertInfo}>{file.info}</div> : null}

        {!file.project ? (
          <EmptyState />
        ) : (
          <ProjectProvider value={projectMeta}>
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
              onAddItemToSprint={(item) => board.updateItem(item._cid, {sprintId: activeSprintId, status: "todo", order: nextOrderToDo})}
              canAddItemToSprint={activeSprintId && activeSprintId !== "all" && activeSprintId !== "backlog"}
            />
          </ProjectProvider>
          
        )}
      </div>
    </div>
  );
}
