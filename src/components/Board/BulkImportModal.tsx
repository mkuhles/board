import { useMemo, useState } from "react";
import { ModalShell } from "../ItemModal/ModalShell";
import css from "../ItemModal/ItemModal.module.css";
import type { ItemPayload, TypeCode } from "../../lib/models";
import { useI18n } from "../../i18n";

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
  typeCodes: Record<string, TypeCode>,
  t: (key: string, vars?: Record<string, string | number>) => string
): { payloads: ItemPayload[]; errors: ImportError[] } {
  if (!Array.isArray(raw)) {
    return { payloads: [], errors: [{ message: t("bulk.errorArray") }] };
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
      errors.push({ message: t("bulk.errorMissingTitle", { index: idx + 1 }) });
      return;
    }

    const normalizedType = type || defaultType;

    if (!knownTypes.has(normalizedType)) {
      errors.push({
        message: t("bulk.errorUnknownType", {
          index: idx + 1,
          type: normalizedType,
        }),
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
  const { t } = useI18n();
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
      setErrors([{ message: t("bulk.errorInvalidJson") }]);
      return;
    }

    const result = validateItems(parsed, typeCodes ?? {}, t);
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
          <div className={css.title}>{t("bulk.title")}</div>
          <div className={css.sub}>
            {t("bulk.subtitle")}
          </div>
          {typeList.length > 0 ? (
            <div className={css.meta}>
              {t("bulk.knownTypes", { types: typeList.join(", ") })}
            </div>
          ) : null}
        </div>
        <button className={css.iconBtn} type="button" onClick={onCancel} title={t("modal.close")}>
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
        <label className={css.label}>{t("bulk.jsonLabel")}</label>
        <textarea
          className={css.textarea}
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("bulk.placeholder")}
        />
      </div>

      <div className={css.footer}>
        <button className={css.btn} type="button" onClick={onCancel}>
          {t("bulk.cancel")}
        </button>
        <button className={`${css.btn} ${css.btnPrimary}`} type="button" onClick={handleImport}>
          {t("bulk.import")}
        </button>
      </div>
    </ModalShell>
  );
}
