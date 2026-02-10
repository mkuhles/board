import React from "react";
import css from "./EmptyState.module.css";
import { useI18n } from "../i18n";

export function EmptyState() {
  const { t } = useI18n();
  const example = `{
  "name": "Quickstart Board",
  "meta": { "activeSprintId": "all" },
  "typeCodes": {
    "task": { "slug": "task", "prefix": "T", "label": "Task" },
    "bug": { "slug": "bug", "prefix": "BUG", "label": "Bug" }
  },
  "items": [
    {
      "id": "T1",
      "title": "Add session cookie auth",
      "description": "Short summary…",
      "type": "task",
      "area": "Security",
      "status": "todo",
      "relates_to": ["BUG1"],
      "created_at": "2026-02-10T09:00:00.000Z",
      "time_entries": []
    },
    {
      "id": "BUG1",
      "title": "Fix timeout error state",
      "description": "Loading spinner should stop on API timeout.",
      "type": "bug",
      "area": "Security",
      "status": "backlog",
      "relates_to": ["T1"],
      "created_at": "2026-02-10T08:30:00.000Z",
      "time_entries": []
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

      <div className={css.ctaCard}>
        <div className={css.sectionTitle}>{t("empty.starterTitle")}</div>
        <p className={css.muted}>{t("empty.starterHint")}</p>
        <div className={css.ctaRow}>
          <a
            className={css.btn}
            href="/board-quickstart-example.json"
            download="board-quickstart-example.json"
          >
            {t("empty.downloadQuickstart")}
          </a>
          <a
            className={css.btn}
            href="/board-complex-example.json"
            download="board-complex-example.json"
          >
            {t("empty.downloadComplex")}
          </a>
        </div>
      </div>

      <details className={css.exampleDetails}>
        <summary className={css.summary}>{t("empty.quickstartTitle")}</summary>
        <p className={css.muted}>{t("empty.exampleHint")}</p>
        <pre className={css.codeBlock}>
          <code>{example}</code>
        </pre>
      </details>
    </div>
  );
}
