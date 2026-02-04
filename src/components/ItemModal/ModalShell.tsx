import css from "./ItemModal.module.css";

type ModalShellProps = {
  onCancel: () => void;
  children: React.ReactNode;
};

export function ModalShell({ onCancel, children }: ModalShellProps) {
  return (
    <div className={css.backdrop} onMouseDown={onCancel}>
      <div className={css.modal} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
