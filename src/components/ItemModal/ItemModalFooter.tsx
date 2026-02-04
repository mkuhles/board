import css from "./ItemModal.module.css";
import { useI18n } from "../../i18n";

type ItemModalFooterProps = {
  isEdit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export function ItemModalFooter({ isEdit, onCancel, onSubmit }: ItemModalFooterProps) {
  const { t } = useI18n();
  return (
    <div className={css.footer}>
      <button className={css.btn} onClick={onCancel} type="button">
        {t("footer.cancel")}
      </button>
      <button className={`${css.btn} ${css.btnPrimary}`} onClick={onSubmit} type="button">
        {isEdit ? t("footer.save") : t("footer.create")}
      </button>
    </div>
  );
}
