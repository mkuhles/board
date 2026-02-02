import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ItemCard } from "./ItemCard/ItemCard";

export function DraggableItem({ item, onDelete, onEdit, onAddToSprint, canAddToSprint }) {
  const id = `item:${item._cid}`;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItemCard
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddToSprint={onAddToSprint}
        canAddToSprint={canAddToSprint}
      />
    </div>
  );
}
