import css from "./ItemModal.module.css";

export function ModalShell({ onCancel, children }) {
  return (
    <div className={css.backdrop} onMouseDown={onCancel}>
      <div className={css.modal} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}