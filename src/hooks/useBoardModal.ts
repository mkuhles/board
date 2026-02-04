import { useMemo, useState } from "react";
import type { Item, ItemPayload } from "../lib/models";

type UseBoardModalOptions = {
  allItems?: Item[];
  onCreateItem?: (payload: ItemPayload) => void;
  onUpdateItem?: (cid: string, payload: ItemPayload) => void;
};

type SubmitOptions = {
  keepOpen?: boolean;
};

export function useBoardModal({
  allItems,
  onCreateItem,
  onUpdateItem,
}: UseBoardModalOptions = {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCid, setEditCid] = useState<string | null>(null);
  const [timeOpen, setTimeOpen] = useState(false);

  const editingItem = useMemo(
    () => (editCid ? allItems?.find((it) => it._cid === editCid) ?? null : null),
    [allItems, editCid]
  );

  const openCreate = () => {
    setEditCid(null);
    setTimeOpen(false);
    setModalOpen(true);
  };

  const openEdit = (item: Item, { focusTime = false }: { focusTime?: boolean } = {}) => {
    setEditCid(item?._cid ?? null);
    setTimeOpen(Boolean(focusTime));
    setModalOpen(true);
  };

  const openAddTime = (item: Item) => openEdit(item, { focusTime: true });

  const closeModal = () => {
    setModalOpen(false);
    setTimeOpen(false);
  };

  const submitModal = (payload: ItemPayload, options: SubmitOptions = {}) => {
    if (editingItem) {
      if (typeof onUpdateItem !== "function") {
        console.error("onUpdateItem missing. Did you pass board.updateItem to <Board />?");
        return;
      }
      onUpdateItem(editingItem._cid, payload);
    } else {
      if (typeof onCreateItem !== "function") {
        console.error("onCreateItem missing. Did you pass board.createItem to <Board />?");
        return;
      }
      onCreateItem(payload);
    }
    if (!options.keepOpen) setModalOpen(false);
  };

  return {
    modalOpen,
    timeOpen,
    editCid,
    editingItem,
    openCreate,
    openEdit,
    openAddTime,
    closeModal,
    submitModal,
  };
}
