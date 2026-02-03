import { useMemo, useState } from "react";

export function useBoardModal({ allItems, onCreateItem, onUpdateItem } = {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCid, setEditCid] = useState(null);
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

  const openEdit = (item, { focusTime = false } = {}) => {
    setEditCid(item?._cid ?? null);
    setTimeOpen(Boolean(focusTime));
    setModalOpen(true);
  };

  const openAddTime = (item) => openEdit(item, { focusTime: true });

  const closeModal = () => {
    setModalOpen(false);
    setTimeOpen(false);
  };

  const submitModal = (payload, options = {}) => {
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
