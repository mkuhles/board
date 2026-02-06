import React from "react";
import css from "./EmptyState.module.css";
import { useI18n } from "../i18n";

export function EmptyState() {
  const { t } = useI18n();
  const example = `{
  "name": "Project Board",
  "areas": [
    { "id": "security", "title": "Security", "number": 7 }
  ],
  "typeCodes": {
    "task": { "slug": "task", "prefix": "T", "label": "Task" }
  },
  "items": [
    {
      "title": "Add session cookie auth",
      "description": "Short summary…",
      "type": "task",
      "area": "security"
    }
  ]
}`;

  return (
    <div className={css.empty}>
      <div className={css.logoRow}>
        <img className={css.logo} src="/logo.svg" alt="My Board logo" />
        <div>
          <div className={css.logoText}>My Board</div>
          <div className={css.heading}>{t("empty.title")}</div>
          <p className={css.lead}>{t("empty.description")}</p>
        </div>
      </div>
      <div className={css.sectionTitle}>{t("empty.howtoTitle")}</div>
      <ol className={css.list}>
        <li>{t("empty.howtoStep1")}</li>
        <li>{t("empty.howtoStep2")}</li>
        <li>{t("empty.howtoStep3")}</li>
      </ol>

      <p style={{ margin: 0 }}>
        {t("empty.openFilePrefix")} <b>„{t("topbar.open")}“</b>{" "}
        {t("empty.openFileSuffix")} <code>nochda.json</code>.
      </p>
      <p className={css.muted} style={{ marginTop: 8, marginBottom: 0 }}>
        {t("empty.multiFiles")}
      </p>

      <div className={css.sectionTitle}>{t("empty.exampleTitle")}</div>
      <p className={css.muted}>{t("empty.exampleHint")}</p>
      <pre className={css.codeBlock}>
        <code>{example}</code>
      </pre>
    </div>
  );
}
