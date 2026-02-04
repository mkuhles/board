import css from "./ItemModal.module.css";

type ItemModalFooterProps = {
  isEdit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export function ItemModalFooter({ isEdit, onCancel, onSubmit }: ItemModalFooterProps) {
  return (
    <div className={css.footer}>
      <button className={css.btn} onClick={onCancel} type="button">
        Cancel
      </button>
      <button className={`${css.btn} ${css.btnPrimary}`} onClick={onSubmit} type="button">
        {isEdit ? "Save changes" : "Create item"}
      </button>
    </div>
  );
}
