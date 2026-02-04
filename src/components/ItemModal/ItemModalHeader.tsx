import css from "./ItemModal.module.css";
import { useI18n } from "../../i18n";

type ItemModalHeaderProps = {
  isEdit: boolean;
  typeCodePreview?: string;
  currentId?: string;
  createdAt?: string;
  updatedAt?: string;
  onCancel: () => void;
};

export function ItemModalHeader({
  isEdit,
  typeCodePreview,
  currentId,
  createdAt,
  updatedAt,
  onCancel,
}: ItemModalHeaderProps) {
  const { t } = useI18n();
  return (
    <div className={css.header}>
      <div>
        <div className={css.title}>
          {isEdit ? t("modal.editTitle") : t("modal.newTitle")}
        </div>
        <div className={css.sub}>
          {t("modal.typeCode")}: <b>{typeCodePreview || "—"}</b>
          {isEdit && currentId ? (
            <> · {t("modal.currentId")}: <b>{currentId}</b></>
          ) : null}
        </div>
        {(createdAt || updatedAt) ? (
          <div className={css.meta}>
            {createdAt ? <>{" "}{t("modal.created")}: <b>{createdAt}</b></> : null}
            {createdAt && updatedAt ? " · " : null}
            {updatedAt ? <>{" "}{t("modal.updated")}: <b>{updatedAt}</b></> : null}
          </div>
        ) : null}
      </div>

      <button className={css.iconBtn} onClick={onCancel} type="button" title={t("modal.close")}>
        ✕
      </button>
    </div>
  );
}
