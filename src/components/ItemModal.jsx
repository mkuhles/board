import React, { useEffect, useMemo, useState } from "react";
import css from "./ItemModal.module.css";
import { useAreas, useTypeCodes } from "../context/ProjectContext";
import { RelatedToInput } from "./RelatedToInput";

function parseRelatesTo(input) {
  return String(input || "")
    .split(/[,\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function relatesToToText(arr) {
  return Array.isArray(arr) ? arr.join(", ") : "";
}

const DEFAULT_TYPE = 'task';

export function ItemModal({
  isOpen,
  mode, // "create" | "edit"
  initialItem, // item for edit, or null
  onCancel,
  onSubmit, // (payload) => void
  allItems,
}) {
  const isEdit = mode === "edit";
  const areas = useAreas();
  const typeCodes = useTypeCodes();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(DEFAULT_TYPE);
  const [areaId, setAreaId] = useState("");
  const [relatesTo, setRelatesTo] = useState("");
  const [error, setError] = useState("");
  const [relatesToIds, setRelatesToIds] = useState([]);

  const typeCodePreview = useMemo(() => typeCodes?.[type].prefix || "", [typeCodes, type]);

  useEffect(() => {
    if (!isOpen) return;

    setError("");

    if (isEdit && initialItem) {
      setTitle(initialItem.title ?? "");
      setDescription(initialItem.description ?? "");
      setType(initialItem.type ?? DEFAULT_TYPE);
      setAreaId(initialItem.area_id ?? "");
      setRelatesToIds(Array.isArray(initialItem.relates_to) ? initialItem.relates_to : []);
    } else {
      setTitle("");
      setDescription("");
      setType(DEFAULT_TYPE);
      // default: first area if exists
      setAreaId((areas?.[0]?.id) ?? "");
      setRelatesToIds([]);
    }
  }, [isOpen, isEdit, initialItem, areas]);

  if (!isOpen) return null;

  const submit = () => {
    setError("");

    if (!title.trim()) return setError("Title is required.");
    if (!typeCodes?.[type]) return setError(`Type "${type}" is missing in project.typeCodes.`);
    // if (!areaId) return setError("Area is required.");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      type,
      area_id: areaId,
      relates_to: relatesToIds,
    };

    onSubmit(payload);
  };

  return (
    <div className={css.backdrop} onMouseDown={onCancel}>
      <div className={css.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <div>
            <div className={css.title}>{isEdit ? "Edit item" : "New item"}</div>
            <div className={css.sub}>
              Type code: <b>{typeCodePreview || "—"}</b>
              {isEdit && initialItem?.id ? <> · Current ID: <b>{initialItem.id}</b></> : null}
            </div>
          </div>

          <button className={css.iconBtn} onClick={onCancel} type="button" title="Close">
            ✕
          </button>
        </div>

        {error ? <div className={css.error}>{error}</div> : null}

        <div className={css.grid}>
          <label className={css.label}>
            <span>Title *</span>
            <input className={css.input} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </label>

          <label className={css.label}>
            <span>Type *</span>
            <select className={css.input} value={type} onChange={(e) => setType(e.target.value)}>
              {Object.keys(typeCodes).map((key) => (
                <option key={typeCodes[key].id} value={typeCodes[key].id}>
                  {typeCodes[key].label} ({[typeCodes[key].prefix] ?? "?"})
                </option>
              ))}
            </select>
          </label>

          <label className={css.label}>
            <span>Area</span>
            <select className={css.input} value={areaId} onChange={(e) => setAreaId(e.target.value)}>
              <option value="" disabled>
                Select area…
              </option>
              {(areas ?? []).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} {Number.isFinite(a.number) ? `(${a.number})` : ""}
                </option>
              ))}
            </select>
          </label>

          <label className={css.labelWide}>
            <span>Description</span>
            <textarea className={css.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <label className={css.labelWide}>
            <span>Relates to</span>
            <RelatedToInput
                allItems={allItems}
                valueIds={relatesToIds}
                onChangeIds={setRelatesToIds}
                excludeId={initialItem?.id}
            />
          </label>
        </div>

        <div className={css.footer}>
          <button className={css.btn} onClick={onCancel} type="button">
            Cancel
          </button>
          <button className={`${css.btn} ${css.btnPrimary}`} onClick={submit} type="button">
            {isEdit ? "Save changes" : "Create item"}
          </button>
        </div>
      </div>
    </div>
  );
}
