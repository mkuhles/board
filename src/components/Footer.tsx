import React from "react";
import css from "./Footer.module.css";
import { navigateTo } from "../hooks/useRoute";
import { useI18n } from "../i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={css.footer}>
      <div className={css.text}>© {new Date().getFullYear()} My Board</div>
      <div className={css.links}>
        <a
          href="/imprint"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("imprint");
          }}
        >
          {t("legal.linkImprint")}
        </a>
        <a
          href="/privacy"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("privacy");
          }}
        >
          {t("legal.linkPrivacy")}
        </a>
      </div>
    </footer>
  );
}
