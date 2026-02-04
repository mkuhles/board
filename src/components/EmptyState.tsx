import React from "react";
import css from "./EmptyState.module.css";
import { useI18n } from "../i18n";

export function EmptyState() {
  const { t } = useI18n();
  return (
    <div className={css.empty}>
      <p style={{ margin: 0 }}>
        {t("empty.openFilePrefix")} <b>„{t("topbar.open")}“</b>{" "}
        {t("empty.openFileSuffix")} <code>nochda.json</code>.
      </p>
      <p className={css.muted} style={{ marginTop: 8, marginBottom: 0 }}>
        {t("empty.multiFiles")}
      </p>
    </div>
  );
}
