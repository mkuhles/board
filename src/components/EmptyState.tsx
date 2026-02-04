import React from "react";
import css from "./EmptyState.module.css";

export function EmptyState() {
  return (
    <div className={css.empty}>
      <p style={{ margin: 0 }}>
        Klick auf <b>„Datei öffnen“</b> und wähle deine <code>nochda.json</code>.
      </p>
      <p className={css.muted} style={{ marginTop: 8, marginBottom: 0 }}>
        Später kannst du mehrere Projektdateien auswählen.
      </p>
    </div>
  );
}
