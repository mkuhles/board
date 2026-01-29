import { useCallback, useEffect, useState } from "react";
import { DEFAULT_STATUS } from "../../constants/statuses";

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
  // innerhalb jeder Spalte sortieren
  for (const key of Object.keys(grouped)) grouped[key] = sortByOrder(grouped[key]);
  return grouped;
}

export function useItemDraft({ isOpen, isEdit, initialItem, areas, typeCodes }) {
  const fallbackType = Object.keys(typeCodes ?? {})[0] ?? DEFAULT_TYPE;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(DEFAULT_TYPE);
  const [areaId, setAreaId] = useState("");
  const [error, setError] = useState("");
  const [relatesToIds, setRelatesToIds] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    setError("");

    if (isEdit && initialItem) {
      setTitle(initialItem.title ?? "");
      setDescription(initialItem.description ?? "");
      setType(initialItem?.type ?? fallbackType);
      setAreaId(initialItem.area_id ?? "");
      setRelatesToIds(Array.isArray(initialItem.relates_to) ? initialItem.relates_to : []);
    } else {
      setTitle("");
      setDescription("");
      setType(fallbackType);
      setAreaId(areas?.[0]?.id ?? "");
      setRelatesToIds([]);
    }
  }, [isOpen, isEdit, initialItem, areas, fallbackType]);

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

    return {
      title: title.trim(),
      description: description.trim(),
      type,
      area_id: areaId,
      relates_to: relatesToIds,
    };
  }, [title, description, type, areaId, relatesToIds, typeCodes]);

  return {
    title, setTitle,
    description, setDescription,
    type, setType,
    areaId, setAreaId,
    relatesToIds, setRelatesToIds,
    error, setError,
    validateAndBuildPayload,
  };
}
