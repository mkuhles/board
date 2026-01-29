import css from "./ItemModal.module.css";

export function ItemModalHeader({ isEdit, typeCodePreview, currentId, onCancel }) {
  return (
    <div className={css.header}>
      <div>
        <div className={css.title}>{isEdit ? "Edit item" : "New item"}</div>
        <div className={css.sub}>
          Type code: <b>{typeCodePreview || "—"}</b>
          {isEdit && currentId ? (
            <> · Current ID: <b>{currentId}</b></>
          ) : null}
        </div>
      </div>

      <button className={css.iconBtn} onClick={onCancel} type="button" title="Close">
        ✕
      </button>
    </div>
  );
}