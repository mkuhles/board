import css from "./ItemCard.module.css";
import { useBoardActions } from "../../context/BoardActionsContext";

function IconButton({ title, ariaLabel, onClick, children }) {
  return (
    <button
      className={css.actionBtn}
      type="button"
      title={title}
      aria-label={ariaLabel || title}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {children}
    </button>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M7 7l1 12h8l1-12" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

export function DeleteButton({ item }) {
  const { onDeleteItem } = useBoardActions();
  return (
    <IconButton
      title="Löschen"
      onClick={() => onDeleteItem?.(item)}
    >
      <TrashIcon />
    </IconButton>
  );
}

export function AddToSprintButton({ item }) {
  const { onAddItemToSprint } = useBoardActions();
  return (
    <IconButton
      title="Zum aktiven Sprint hinzufügen"
      onClick={() => {
        onAddItemToSprint?.(item);
      }}
    >
      <PlusIcon />
    </IconButton>
  );
}

export function AddTimeButton({ item }) {
  const { onAddTime } = useBoardActions();
  return (
    <IconButton
      title="Zeit erfassen"
      onClick={() => {
        onAddTime?.(item);
      }}
    >
      <ClockIcon />
    </IconButton>
  );
}
