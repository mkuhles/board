import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_STATUS } from "../../constants/statuses";
import { nowIso } from "../time";

const DEFAULT_TYPE = "task";

export function ensureDefaults(item) {
  return {
    status: DEFAULT_STATUS,
    order: Number.isFinite(item?.order) ? item.order : 0,
    ...item,
  };
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function groupByStatus(items, statuses) {
  const grouped = Object.fromEntries(statuses.map((s) => [s.id, []]));
  for (const it of items) {
    const st = grouped[it.status] ? it.status : DEFAULT_STATUS;
    grouped[st].push(it);
  }
  for (const key of Object.keys(grouped)) grouped[key] = sortByOrder(grouped[key]);
  return grouped;
}

export function useItemDraft({
  isOpen,
  isEdit,
  initialItem,
  areas,
  typeCodes,
  sprints,
  statuses,
}) {
  const fallbackType = useMemo(
    () => Object.keys(typeCodes ?? {})[0] ?? DEFAULT_TYPE,
    [typeCodes]
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(fallbackType);
  const [areaId, setAreaId] = useState("");
  const [error, setError] = useState("");
  const [relatesToIds, setRelatesToIds] = useState([]);
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [sprintId, setSprintId] = useState("");

  // timestamps (in draft state)
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setError("");

    if (isEdit && initialItem) {
      setTitle(initialItem.title ?? "");
      setDescription(initialItem.description ?? "");
      setType(initialItem?.type ?? fallbackType);
      setAreaId(initialItem.area_id ?? "");
      setRelatesToIds(Array.isArray(initialItem.relates_to) ? initialItem.relates_to : []);
      setStatus(initialItem.status ?? DEFAULT_STATUS);
      setSprintId(initialItem.sprintId ?? "");

      const existingCreated = initialItem.created_at ?? "";
      const existingUpdated = initialItem.updated_at ?? "";

      setCreatedAt(existingCreated || nowIso());
      setUpdatedAt(existingUpdated || existingCreated || nowIso());
    } else {
      setTitle("");
      setDescription("");
      setType(fallbackType);
      setAreaId(areas?.[0]?.id ?? "");
      setRelatesToIds([]);
      setStatus(DEFAULT_STATUS);
      setSprintId("");

      const ts = nowIso();
      setCreatedAt(ts);
      setUpdatedAt(ts);
    }
  }, [isOpen, isEdit, initialItem, areas, fallbackType, sprints]);

  const validateAndBuildPayload = useCallback(() => {
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return null;
    }
    if (!typeCodes?.[type]) {
      setError(`Type "${type}" is missing in project.typeCodes.`);
      return null;
    }

    const tsNow = nowIso();

    // created_at bleibt beim Edit stabil; updated_at wird immer neu gesetzt
    const nextCreatedAt = isEdit ? (createdAt || tsNow) : (createdAt || tsNow);
    const nextUpdatedAt = tsNow;

    return {
      title: title.trim(),
      description: description.trim(),
      type,
      area_id: areaId,
      relates_to: relatesToIds,
      status,
      sprintId,

      // neue Felder im JSON
      created_at: nextCreatedAt,
      updated_at: nextUpdatedAt,
    };
  }, [
    title,
    description,
    type,
    areaId,
    relatesToIds,
    typeCodes,
    status,
    sprintId,
    isEdit,
    createdAt,
  ]);

  return {
    title, setTitle,
    description, setDescription,
    type, setType,
    areaId, setAreaId,
    relatesToIds, setRelatesToIds,
    status, setStatus,
    sprintId, setSprintId,

    createdAt, setCreatedAt,
    updatedAt, setUpdatedAt,

    error, setError,
    validateAndBuildPayload,
  };
}
