import css from "./ItemCard.module.css";
import { useBoardActions } from "../../context/BoardActionsContext";
import type { ItemProp } from "../../types/props";
import { useI18n } from "../../i18n";

type IconButtonProps = {
  title: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

type ItemButtonProps = ItemProp;

function IconButton({ title, ariaLabel, onClick, children }: IconButtonProps) {
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

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v3H4z" />
      <path d="M6 10v8h12v-8" />
      <path d="M10 14h4" />
    </svg>
  );
}

export function DeleteButton({ item }: ItemButtonProps) {
  const { onDeleteItem } = useBoardActions();
  const { t } = useI18n();
  return (
    <IconButton
      title={t("actions.delete")}
      onClick={() => onDeleteItem?.(item)}
    >
      <TrashIcon />
    </IconButton>
  );
}

export function AddToSprintButton({ item }: ItemButtonProps) {
  const { onAddItemToSprint } = useBoardActions();
  const { t } = useI18n();
  return (
    <IconButton
      title={t("actions.addToSprint")}
      onClick={() => {
        onAddItemToSprint?.(item);
      }}
    >
      <PlusIcon />
    </IconButton>
  );
}

export function AddTimeButton({ item }: ItemButtonProps) {
  const { onAddTime } = useBoardActions();
  const { t } = useI18n();
  return (
    <IconButton
      title={t("actions.addTime")}
      onClick={() => {
        onAddTime?.(item);
      }}
    >
      <ClockIcon />
    </IconButton>
  );
}

export function ArchiveButton({ item }: ItemButtonProps) {
  const { onArchiveItem } = useBoardActions();
  const { t } = useI18n();
  return (
    <IconButton
      title={t("actions.archive")}
      onClick={() => {
        onArchiveItem?.(item);
      }}
    >
      <ArchiveIcon />
    </IconButton>
  );
}
