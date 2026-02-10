import React from "react";
import css from "./LegalPage.module.css";
import { Markdown } from "./Markdown";
import { getLegalVars } from "../content/legal";
import { useI18n } from "../i18n";
import { navigateTo } from "../hooks/useRoute";

type LegalPageProps = {
  page: "imprint" | "privacy" | "guide";
};

export function LegalPage({ page }: LegalPageProps) {
  const { t } = useI18n();
  const content = t(`legal.${page}`, getLegalVars());
  const title =
    page === "imprint"
      ? t("legal.titleImprint")
      : page === "privacy"
        ? t("legal.titlePrivacy")
        : t("legal.titleGuide");

  return (
    <section className={css.wrap}>
      <div className={css.header}>
        <h1 className={css.title}>{title}</h1>
        <a
          className={css.back}
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("app");
          }}
        >
          {t("legal.backToApp")}
        </a>
      </div>
      {page === "guide" ? (
        <div className={css.actions}>
          <a
            className={css.actionBtn}
            href="/board-complex-example.json"
            download="board-complex-example.json"
          >
            {t("legal.downloadExampleJson")}
          </a>
        </div>
      ) : null}
      <Markdown className={css.content}>{content}</Markdown>
    </section>
  );
}
