import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./RelatedToInput.module.css";
import type { Item } from "../../lib/models";
import { useI18n } from "../../i18n";

function norm(s: unknown) {
  return String(s || "").toLowerCase().trim();
}

type RelatedToInputProps = {
  allItems?: Item[];
  valueIds?: string[];
  onChangeIds: (nextIds: string[]) => void;
  excludeId?: string;
  placeholder?: string;
  [key: string]: unknown;
};

export function RelatedToInput({
  allItems,          // [{ id, title, _cid, ... }]
  valueIds,          // string[]
  onChangeIds,       // (nextIds) => void
  excludeId,         // current item id (so you can't relate to yourself)
  placeholder,
  ...inputProps
}: RelatedToInputProps) {
  const { t } = useI18n();
  const resolvedPlaceholder = placeholder || t("fields.relatesToPlaceholder");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = useMemo(() => new Set(valueIds || []), [valueIds]);

  const suggestions = useMemo(() => {
    const query = norm(q);
    if (!query) return [];

    return (allItems || [])
      .filter((it) => it?.id && it.id !== excludeId)
      .filter((it) => !selected.has(it.id))
      .filter((it) => {
        const id = norm(it.id);
        const title = norm(it.title);
        return id.includes(query) || title.includes(query);
      })
      .slice(0, 8);
  }, [allItems, q, excludeId, selected]);

  useEffect(() => {
    if (!open) setActiveIndex(0);
  }, [open, q]);

  const addId = (id: string) => {
    if (!id) return;
    if (selected.has(id)) return;
    onChangeIds([...(valueIds || []), id]);
    setQ("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const removeId = (id: string) => {
    onChangeIds((valueIds || []).filter((x) => x !== id));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (open && suggestions[activeIndex]) {
        addId(suggestions[activeIndex].id);
        e.preventDefault();
      } else if (q.trim()) {
        // allow direct ID paste/typing (only if it exists)
        const typed = q.trim();
        const exists = (allItems || []).some((it) => it?.id === typed);
        if (exists) addId(typed);
        e.preventDefault();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Backspace" && !q && (valueIds || []).length) {
      // delete last chip
      const last = valueIds[valueIds.length - 1];
      removeId(last);
    }
  };

  return (
    <div className={css.wrap} >
      <div className={css.chips}>
        {(valueIds || []).map((id) => (
          <button
            key={id}
            type="button"
            className={css.chip}
            onClick={() => removeId(id)}
            title={t("actions.remove")}
          >
            {id} <span className={css.x}>×</span>
          </button>
        ))}

        <input
          {...inputProps}
          ref={inputRef}
          className={css.input}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder={resolvedPlaceholder}
        />
      </div>

      {open && suggestions.length > 0 ? (
        <div className={css.dropdown}>
          {suggestions.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              className={`${css.item} ${idx === activeIndex ? css.active : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                addId(it.id);
              }}
            >
              <div className={css.itemTop}>
                <span className={css.itemId}>{it.id}</span>
                <span className={css.itemTitle}>{it.title || ""}</span>
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
