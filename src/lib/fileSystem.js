import { ensureDefaults, safeJsonParse } from "./project";

export function isFileSystemApiSupported() {
  return Boolean(window.showOpenFilePicker && window.showSaveFilePicker);
}

export async function openJsonFile() {
  if (!window.showOpenFilePicker) {
    throw new Error(
      "Dein Browser unterstützt die File System Access API nicht. Nutze Chrome/Edge/Brave oder später Electron/Tauri."
    );
  }

  const [handle] = await window.showOpenFilePicker({
    multiple: false,
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  });

  const file = await handle.getFile();
  const text = await file.text();
  const parsed = safeJsonParse(text);
  if (!parsed.ok) throw parsed.error;

  const data = parsed.value ?? {};
  const itemsRaw = Array.isArray(data.items) ? data.items : [];
  const items = itemsRaw.map(ensureDefaults);

  return { handle, project: { ...data, items } };
}

export async function saveJsonFile(handle, project) {
  if (!handle) throw new Error("Keine Datei geöffnet.");
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(project, null, 2));
  await writable.close();
}

export async function saveAsJsonFile(project, suggestedName = "nochda.json") {
  if (!window.showSaveFilePicker) {
    throw new Error("showSaveFilePicker wird von deinem Browser nicht unterstützt.");
  }

  const handle = await window.showSaveFilePicker({
    suggestedName,
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  });

  await saveJsonFile(handle, project);
  return handle;
}
