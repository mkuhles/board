import { useMemo, useState } from "react";
import { ModalShell } from "../ItemModal/ModalShell";
import css from "../ItemModal/ItemModal.module.css";
import type { ItemPayload, TypeCode } from "../../lib/models";

type BulkImportModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onImport: (payloads: ItemPayload[]) => void;
  typeCodes?: Record<string, TypeCode>;
};

type ImportError = {
  message: string;
};

type ImportItem = {
  title?: string;
  description?: string;
  type?: string;
};

function validateItems(
  raw: unknown,
  typeCodes?: Record<string, TypeCode>
): { payloads: ItemPayload[]; errors: ImportError[] } {
  if (!Array.isArray(raw)) {
    return { payloads: [], errors: [{ message: "JSON must be an array of items." }] };
  }

  const errors: ImportError[] = [];
  const payloads: ItemPayload[] = [];
  const knownTypes = new Set(Object.keys(typeCodes ?? {}));
  const defaultType = knownTypes.values().next().value || "task";

  raw.forEach((entry, idx) => {
    const item = entry as ImportItem;
    const title = typeof item?.title === "string" ? item.title.trim() : "";
    const description =
      typeof item?.description === "string" ? item.description.trim() : "";
    const type = typeof item?.type === "string" ? item.type.trim() : "";

    if (!title) {
      errors.push({ message: `Item #${idx + 1} is missing a title.` });
      return;
    }

    const normalizedType = type || defaultType;

    if (!knownTypes.has(normalizedType)) {
      errors.push({
        message: `Item #${idx + 1} has unknown type "${normalizedType}".`,
      });
      return;
    }

    payloads.push({
      title,
      description,
      type: normalizedType,
    });
  });

  return { payloads, errors };
}

export function BulkImportModal({
  isOpen,
  onCancel,
  onImport,
  typeCodes,
}: BulkImportModalProps) {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<ImportError[]>([]);

  const typeList = useMemo(
    () => Object.keys(typeCodes ?? {}).sort(),
    [typeCodes]
  );

  if (!isOpen) return null;

  const handleImport = () => {
    setErrors([]);
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch (err) {
      setErrors([{ message: "Invalid JSON. Please paste a valid JSON array." }]);
      return;
    }

    const result = validateItems(parsed, typeCodes);
    if (result.errors.length > 0) {
      setErrors(result.errors);
      return;
    }

    onImport(result.payloads);
    setValue("");
    setErrors([]);
    onCancel();
  };

  return (
    <ModalShell onCancel={onCancel}>
      <div className={css.header}>
        <div>
          <div className={css.title}>Bulk import</div>
          <div className={css.sub}>
            Paste a JSON array. Types must exist in project.typeCodes.
          </div>
          {typeList.length > 0 ? (
            <div className={css.meta}>Known types: {typeList.join(", ")}</div>
          ) : null}
        </div>
        <button className={css.iconBtn} type="button" onClick={onCancel}>
          ✕
        </button>
      </div>

      {errors.length > 0 ? (
        <div className={css.error}>
          {errors.map((err, idx) => (
            <div key={idx}>{err.message}</div>
          ))}
        </div>
      ) : null}

      <div className={css.labelWide}>
        <label className={css.label}>JSON array</label>
        <textarea
          className={css.textarea}
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='[{"title":"...", "description":"...", "type":"task"}]'
        />
      </div>

      <div className={css.footer}>
        <button className={css.btn} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={`${css.btn} ${css.btnPrimary}`} type="button" onClick={handleImport}>
          Import
        </button>
      </div>
    </ModalShell>
  );
}
