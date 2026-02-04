import { ensureDefaults } from "../project";
import { safeJsonParse } from "./json";
import type { Project } from "../models";
import { translate } from "../../i18n/core";

export function isFileSystemApiSupported(): boolean {
  return Boolean(window.showOpenFilePicker && window.showSaveFilePicker);
}

export async function openJsonFile(): Promise<{ handle: FileSystemFileHandle; project: Project }> {
  if (!window.showOpenFilePicker) {
    throw new Error(translate("file.noOpenPicker"));
  }

  const [handle] = await window.showOpenFilePicker({
    multiple: false,
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  });

  const file = await handle.getFile();
  const text = await file.text();
  const parsed = safeJsonParse(text);
  if (!parsed.ok) throw parsed.error;

  const data = (parsed.value ?? {}) as Project;
  const itemsRaw = Array.isArray(data.items) ? data.items : [];
  const items = itemsRaw.map(ensureDefaults);

  return { handle, project: { ...data, items } as Project };
}

export async function saveJsonFile(handle: FileSystemFileHandle, project: Project): Promise<void> {
  if (!handle) throw new Error(translate("file.noHandle"));
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(project, null, 2));
  await writable.close();
}

export async function saveAsJsonFile(
  project: Project,
  suggestedName = "nochda.json"
): Promise<FileSystemFileHandle> {
  if (!window.showSaveFilePicker) {
    throw new Error(translate("file.noSavePicker"));
  }

  const handle = await window.showSaveFilePicker({
    suggestedName,
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  });

  await saveJsonFile(handle, project);
  return handle;
}
