import React from "react";
import css from "./TopBar.module.css";
import { useI18n } from "../i18n";

type TopBarProps = {
  supportOk: boolean;
  projectLoaded: boolean;
  projectName?: string;
  isSaving: boolean;
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
};

export function TopBar({
  supportOk,
  projectLoaded,
  projectName,
  isSaving,
  onOpen,
  onSave,
  onSaveAs,
}: TopBarProps) {
  const { language, setLanguage, t } = useI18n();
  const nextLanguage = language === "de" ? "en" : "de";

  return (
    <header className={css.header}>
      <div>
        <div className={css.title}>
          {t("topbar.title", { name: projectName ?? "Board" })}
        </div>
        <div className={css.sub}>{t("topbar.subtitle")}</div>
        {!supportOk ? (
          <div className={css.subError}>{t("topbar.unsupported")}</div>
        ) : null}
      </div>

      <div className={css.actions}>
        <button className={css.btn} onClick={onOpen} disabled={!supportOk}>
          {t("topbar.open")}
        </button>
        <button
          className={`${css.btn} ${css.btnPrimary}`}
          onClick={onSave}
          disabled={!projectLoaded || isSaving}
        >
          {t("topbar.save")}
        </button>
        <button
          className={css.btn}
          onClick={onSaveAs}
          disabled={!projectLoaded || isSaving || !supportOk}
        >
          {t("topbar.saveAs")}
        </button>
        <button
          className={css.btn}
          type="button"
          onClick={() => setLanguage(nextLanguage)}
          title={t("topbar.language")}
        >
          {nextLanguage.toUpperCase()}
        </button>
      </div>
    </header>
  );
}
