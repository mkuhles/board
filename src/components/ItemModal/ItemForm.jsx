import { RelatedToInput } from "./RelatedToInput";
import { Field } from "./Field";
import css from "./ItemModal.module.css";

export function ItemForm({
  title, setTitle,
  description, setDescription,
  type, setType,
  areaId, setAreaId,
  relatesToIds, setRelatesToIds,
  typeCodes,
  areas,
  allItems,
  excludeId,
}) {
  return (
    <div className={css.grid}>
      <Field label="Title" inputId="item-title" required>
        <input
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </Field>

      <Field label="Type" inputId="item-type" required>
        <select className={css.input} value={type} onChange={(e) => setType(e.target.value)}>
          {Object.entries(typeCodes ?? {}).map(([typeKey, cfg]) => (
            <option key={typeKey} value={typeKey}>
              {cfg.label} ({cfg.prefix ?? "?"})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Area" inputId="item-area" required>
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
      </Field>

      <Field label="Description" inputId="item-desc" wide>
        <textarea
          className={css.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Field label="Relates to" inputId="item-relates" wide>
        <RelatedToInput
          allItems={allItems}
          valueIds={relatesToIds}
          onChangeIds={setRelatesToIds}
          excludeId={excludeId}
        />
      </Field>
    </div>
  );
}
