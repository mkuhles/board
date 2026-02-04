import { messages, type Language, type MessageDict } from "./messages";

const STORAGE_KEY = "board.language";
const fallbackLanguage: Language = "en";
let currentLanguage: Language = fallbackLanguage;

function detectLanguage(): Language {
  if (typeof window === "undefined") return fallbackLanguage;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "de") return stored;

  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("de")) return "de";
  return "en";
}

function getMessage(dict: MessageDict, path: string[]): string | null {
  let node: MessageDict | string | undefined = dict;
  for (const key of path) {
    if (typeof node !== "object" || node == null) return null;
    node = (node as MessageDict)[key];
  }
  return typeof node === "string" ? node : null;
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = vars[key];
    return value === undefined || value === null ? match : String(value);
  });
}

export function initLanguage(): Language {
  currentLanguage = detectLanguage();
  return currentLanguage;
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }
}

export function translate(
  key: string,
  vars?: Record<string, string | number>,
  lang: Language = currentLanguage
): string {
  const dict = messages[lang] ?? messages[fallbackLanguage];
  const fallback = messages[fallbackLanguage];
  const path = key.split(".");

  const message = getMessage(dict, path) ?? getMessage(fallback, path);
  if (!message) return key;
  return interpolate(message, vars);
}
