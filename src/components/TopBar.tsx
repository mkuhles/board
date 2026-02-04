import React from "react";
import css from "./TopBar.module.css";

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
  return (
    <header className={css.header}>
      <div>
        <div className={css.title}>Projekt {projectName ?? "Board"}</div>
        <div className={css.sub}>Lokales JSON öffnen → verschieben → speichern</div>
        {!supportOk ? (
          <div className={css.subError}>
            Browser-Support fehlt. Nutze Chrome/Edge/Brave oder später Electron/Tauri.
          </div>
        ) : null}
      </div>

      <div className={css.actions}>
        <button className={css.btn} onClick={onOpen} disabled={!supportOk}>
          Datei öffnen
        </button>
        <button
          className={`${css.btn} ${css.btnPrimary}`}
          onClick={onSave}
          disabled={!projectLoaded || isSaving}
        >
          Speichern
        </button>
        <button className={css.btn} onClick={onSaveAs} disabled={!projectLoaded || isSaving || !supportOk}>
          Speichern unter…
        </button>
      </div>
    </header>
  );
}
