import css from "./ItemCard.module.css";

export function DeleteButton({ item, onDelete }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title="Löschen"
      onClick={() => onDelete?.(item)}
    >
      🗑️
    </button>
  )
}

export function AddToSprintButton({ item, onAddToSprint }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title="Zum aktiven Sprint hinzufügen"
      onClick={(e) => {
        console.log(item);
        e.stopPropagation();
        onAddToSprint?.(item);
      }}
    >
      ➕ Sprint
    </button>
  )
}