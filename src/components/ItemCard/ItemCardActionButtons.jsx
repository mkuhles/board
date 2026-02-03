import css from "./ItemCard.module.css";

export function DeleteButton({ item, onDelete }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title="Löschen"
      aria-label="Löschen"
      onClick={() => onDelete?.(item)}
    >
      🗑️
    </button>
  );
}

export function AddToSprintButton({ item, onAddToSprint }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title="Zum aktiven Sprint hinzufügen"
      aria-label="Zum aktiven Sprint hinzufügen"
      onClick={(e) => {
        e.stopPropagation();
        onAddToSprint?.(item);
      }}
    >
      ➕ Sprint
    </button>
  );
}

export function AddTimeButton({ item, onAddTime }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title="Zeit erfassen"
      aria-label="Zeit erfassen"
      onClick={(e) => {
        e.stopPropagation();
        onAddTime?.(item);
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      🕒
    </button>
  );
}
