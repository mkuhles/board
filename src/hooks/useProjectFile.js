import { useCallback, useState } from "react";
import { openJsonFile, saveAsJsonFile, saveJsonFile, isFileSystemApiSupported } from "../lib/fileSystem";
import { stripClientFields } from "../lib/project";
import { migrateAreasOnOpen } from "../lib/migrateAreas";

export function useProjectFile() {
  const [fileHandle, setFileHandle] = useState(null);
  const [project, setProject] = useState(null);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const supportOk = isFileSystemApiSupported();

  const open = useCallback(async (prepareProject) => {
    setError("");
    setInfo("");
    try {
      const { handle, project: loaded } = await openJsonFile();

      const prepared = prepareProject ? prepareProject(loaded) : loaded;
      const { project: migrated, changed } = migrateAreasOnOpen(prepared);

      setFileHandle(handle);
      setProject(migrated);

      if (changed) {
        await saveJsonFile(handle, stripClientFields(migrated));
        setInfo("File opened and migrated (area → area_id).");
      } else {
        setInfo("File opened.");
      }
    } catch (e) {
      setError(`Öffnen fehlgeschlagen: ${e?.message || String(e)}`);
    }
  }, []);

  const save = useCallback(async (nextProject = project) => {
    if (!nextProject) return;
    setError("");
    setInfo("");
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo("Gespeichert.");
    } catch (e) {
      setError(`Speichern fehlgeschlagen: ${e?.message || String(e)}`);
    } finally {
      setIsSaving(false);
    }
  }, [fileHandle, project]);

  const saveAs = useCallback(async (nextProject = project) => {
    if (!nextProject) return;
    setError("");
    setInfo("");
    try {
      setIsSaving(true);
      const handle = await saveAsJsonFile(stripClientFields(nextProject), "nochda.json");
      setFileHandle(handle);
      setInfo("Gespeichert (unter…).");
    } catch (e) {
      setError(`Speichern unter… fehlgeschlagen: ${e?.message || String(e)}`);
    } finally {
      setIsSaving(false);
    }
  }, [project]);

  const autosave = useCallback(async (nextProject) => {
    if (!fileHandle || !nextProject) return;
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo("Auto-Save: gespeichert.");
      setError("");
    } catch (e) {
      setError(`Auto-Save fehlgeschlagen: ${e?.message || String(e)}`);
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
