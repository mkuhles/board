import React from "react";
import css from "./LegalPage.module.css";
import { Markdown } from "./Markdown";
import { getLegalVars } from "../content/legal";
import { useI18n } from "../i18n";
import { navigateTo } from "../hooks/useRoute";

type LegalPageProps = {
  page: "imprint" | "privacy";
};

export function LegalPage({ page }: LegalPageProps) {
  const { t } = useI18n();
  const content = t(`legal.${page}`, getLegalVars());
  const title = page === "imprint" ? t("legal.titleImprint") : t("legal.titlePrivacy");

  return (
    <section className={css.wrap}>
      <div className={css.header}>
        <div className={css.title}>{title}</div>
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
      <Markdown className={css.content}>{content}</Markdown>
    </section>
  );
}
