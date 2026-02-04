import React, { createContext, useContext, useMemo, useState } from "react";
import { initLanguage, setLanguage, translate, type Language } from "./core";

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => initLanguage());

  const value = useMemo<I18nContextValue>(() => {
    return {
      language,
      setLanguage: (lang: Language) => {
        setLanguageState(lang);
        setLanguage(lang);
      },
      t: (key, vars) => translate(key, vars, language),
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider.");
  }
  return ctx;
}

export type { Language } from "./core";
