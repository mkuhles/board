import { useCallback, useState } from "react";
import {
  openJsonFile,
  saveAsJsonFile,
  saveJsonFile,
  isFileSystemApiSupported,
  stripClientFields,
} from "../lib/storage";
import { migrateAreasOnOpen } from "../lib/migrateAreas";
import { sanitizeProject, type Project } from "../lib/models";
import { translate } from "../i18n/core";

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
      const { project: normalized, warnings, errors } = sanitizeProject(migrated);

      if (errors.length > 0) {
        setError(translate("info.invalidData", { errors: errors.join("\n- ") }));
        return;
      }

      setFileHandle(handle);
      setProject(normalized);

      const infoParts = [];
      if (changed) {
        await saveJsonFile(handle, stripClientFields(normalized));
        infoParts.push(translate("info.openedMigrated"));
      } else {
        infoParts.push(translate("info.opened"));
      }

      if (warnings.length > 0) {
        infoParts.push(
          translate("info.warnings", { warnings: warnings.join("\n- ") })
        );
      }

      setInfo(infoParts.join("\n"));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(translate("info.openFailed", { message }));
    }
  }, []);

  const save = useCallback(async (nextProject: Project | null = project) => {
    if (!nextProject) return;
    setError("");
    setInfo("");
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo(translate("info.saved"));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(translate("info.saveFailed", { message }));
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
      setInfo(translate("info.savedAs"));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(translate("info.saveAsFailed", { message }));
    } finally {
      setIsSaving(false);
    }
  }, [project]);

  const autosave = useCallback(async (nextProject: Project) => {
    if (!fileHandle || !nextProject) return;
    try {
      setIsSaving(true);
      await saveJsonFile(fileHandle, stripClientFields(nextProject));
      setInfo(translate("info.autosave"));
      setError("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(translate("info.autosaveFailed", { message }));
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
