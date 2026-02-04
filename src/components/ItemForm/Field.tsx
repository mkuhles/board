import React from "react";
import css from "../ItemModal/ItemModal.module.css";

export function Field({
  label,
  inputId,
  required = false,
  wide = false,
  help,
  error,
  children,
}: {
  label: string;
  inputId: string;
  required?: boolean;
  wide?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const cls = wide ? css.labelWide : css.label;
  const helpId = help ? `${inputId}__help` : undefined;
  const errId = error ? `${inputId}__error` : undefined;

  // aria-describedby kann mehrere IDs enthalten
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;

  // Wir “injecten” aria props ins child, ohne dass du sie überall manuell setzen musst.
  const preparedChild = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        id: inputId,
        "aria-invalid": Boolean(error) || undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className={cls}>
      <label htmlFor={inputId}>
        {label} {required ? "*" : null}
      </label>
      {preparedChild}

      {help ? (
        <div id={helpId} className={css.help}>
          {help}
        </div>
      ) : null}

      {error ? (
        <div id={errId} className={css.fieldError} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
