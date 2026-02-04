import React from "react";
import { Field } from "./Field";
import css from "../ItemModal/ItemModal.module.css";
import type { ItemFormLookups } from "../../types/props";

type ItemFieldsProps = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  areaId: string;
  setAreaId: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sprintId: string;
  setSprintId: (value: string) => void;
} & ItemFormLookups;

export function ItemFields({
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
  areaId,
  setAreaId,
  status,
  setStatus,
  sprintId,
  setSprintId,
  typeCodes,
  areas,
  statuses,
  sprints,
}: ItemFieldsProps) {
  return (
    <>
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

      <Field label="Status" inputId="item-status" required>
        <select className={css.input} value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((stat) => (
            <option key={stat.id} value={stat.id}>
              {stat.title}
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

      {sprints && (
        <Field label="Sprint" inputId="item-strint">
          <select className={css.input} value={sprintId} onChange={(e) => setSprintId(e.target.value)}>
            <option key="none" value="">none</option>
            {Object.entries(sprints).map(([typeKey, cfg]) => (
              <option key={cfg.id} value={cfg.id}>
                {cfg.title} ({cfg.start})
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Description" inputId="item-desc" wide>
        <textarea
          className={css.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
    </>
  );
}
