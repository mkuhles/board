import { useCallback, useState } from "react";
import {
  openJsonFile,
  saveAsJsonFile,
  saveJsonFile,
  isFileSystemApiSupported,
  stripClientFields,
} from "../lib/storage";
import { migrateAreasOnOpen } from "../lib/migrateAreas";
import { normalizeProject, type Project } from "../lib/models";

type OpenResult = { handle: FileSystemFileHandle; project: Project };

export function useProjectFile() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const supportOk = isFileSystemApiSupported();

  const open = useCallback(async (prepareProject?: (project: Project) => Project) => {
    setError("");
    setInfo("");
    try {
      const { handle, project: loaded } = (await openJsonFile()) as OpenResult;

      const prepared = prepareProject ? prepareProject(loaded) : loaded;
      const { project: migrated, changed } = migrateAreasOnOpen(prepared);
      const normalized = normalizeProject(migrated);

      setFileHandle(handle);
      setProject(normalized);

      if (changed) {
        await saveJsonFile(handle, stripClientFields(normalized));
        setInfo("File opened and migrated (area → area_id).");
      } else {
        setInfo("File opened.");
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Öffnen fehlgeschlagen: ${message}`);
    }
  }, []);

  const save = useCallback(async (nextProject: Project | null = project) => {
    if (!nextProject) return;
    setError("");
    setInfo("");
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo("Gespeichert.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Speichern fehlgeschlagen: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }, [fileHandle, project]);

  const saveAs = useCallback(async (nextProject: Project | null = project) => {
    if (!nextProject) return;
    setError("");
    setInfo("");
    try {
      setIsSaving(true);
      const handle = await saveAsJsonFile(stripClientFields(nextProject), "nochda.json");
      setFileHandle(handle);
      setInfo("Gespeichert (unter…).");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Speichern unter… fehlgeschlagen: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }, [project]);

  const autosave = useCallback(async (nextProject: Project) => {
    if (!fileHandle || !nextProject) return;
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo("Auto-Save: gespeichert.");
      setError("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Auto-Save fehlgeschlagen: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }, [fileHandle]);

  return {
    supportOk,
    fileHandle,
    project,
    setProject,
    error,
    info,
    isSaving,
    open,
    save,
    saveAs,
    autosave,
  };
}
