import css from "./ItemModal.module.css";

export function ItemModalFooter({ isEdit, onCancel, onSubmit }) {
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