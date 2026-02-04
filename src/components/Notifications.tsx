import { AnchorLink } from "./AnchorLink";
import type { Item } from "../lib/models";
import { useI18n } from "../i18n";
import css from "../App.module.css";

type NotificationsProps = {
  error?: string;
  info?: string;
  importedItems: Item[];
  dismissedError: boolean;
  dismissedInfo: boolean;
  dismissedImport: boolean;
  onDismissError: () => void;
  onDismissInfo: () => void;
  onDismissImport: () => void;
};

export function Notifications({
  error,
  info,
  importedItems,
  dismissedError,
  dismissedInfo,
  dismissedImport,
  onDismissError,
  onDismissInfo,
  onDismissImport,
}: NotificationsProps) {
  const { t } = useI18n();

  return (
    <div className={css.toastStack}>
      {error && !dismissedError ? (
        <div className={`${css.alertError} ${css.toast}`}>
          <div>{error}</div>
          <button
            className={css.toastClose}
            type="button"
            aria-label={t("toast.closeError")}
            onClick={onDismissError}
          >
            ×
          </button>
        </div>
      ) : null}
      {info && !dismissedInfo ? (
        <div className={`${css.alertInfo} ${css.toast}`}>
          <div>{info}</div>
          <button
            className={css.toastClose}
            type="button"
            aria-label={t("toast.closeInfo")}
            onClick={onDismissInfo}
          >
            ×
          </button>
        </div>
      ) : null}
      {importedItems.length > 0 && !dismissedImport ? (
        <div className={`${css.alertInfo} ${css.toast}`}>
          <div>
            {t("toast.imported", { count: importedItems.length })}
            <ul className={css.toastList}>
              {importedItems.map((item) => (
                <li key={item._cid ?? item.id}>
                  {item.id ? (
                    <AnchorLink toId={item.id}>
                      {item.id}: {item.title ?? "Untitled"}
                    </AnchorLink>
                  ) : (
                    item.title ?? "Untitled"
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button
            className={css.toastClose}
            type="button"
            aria-label={t("toast.closeImport")}
            onClick={onDismissImport}
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
}
