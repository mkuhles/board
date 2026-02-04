import css from "./ItemModal.module.css";
import { useI18n } from "../../i18n";

type ItemModalHeaderProps = {
  isEdit: boolean;
  typeCodePreview?: string;
  typeLabel?: string;
  typeColor?: string;
  currentId?: string;
  createdAt?: string;
  updatedAt?: string;
  onCancel: () => void;
};

export function ItemModalHeader({
  isEdit,
  typeCodePreview,
  typeLabel,
  typeColor,
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
          {typeLabel ? (
            <>
              {" "}
              <span className={css.typeChip} style={{ backgroundColor: typeColor || undefined }}>
                {typeLabel}
              </span>
            </>
          ) : null}
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
