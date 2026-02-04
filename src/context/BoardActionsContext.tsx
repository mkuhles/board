import React, { createContext, useContext } from "react";
import type { Item } from "../lib/models";

export type BoardActions = {
  onEditItem?: (item: Item, options?: { focusTime?: boolean }) => void;
  onAddTime?: (item: Item) => void;
  onDeleteItem?: (item: Item) => void;
  onAddItemToSprint?: (item: Item) => void;
  canAddItemToSprint?: boolean;
};

const BoardActionsContext = createContext<BoardActions | null>(null);

export function BoardActionsProvider({
  value,
  children,
}: {
  value: BoardActions;
  children: React.ReactNode;
}) {
  return (
    <BoardActionsContext.Provider value={value}>
      {children}
    </BoardActionsContext.Provider>
  );
}

export function useBoardActions(): BoardActions {
  const ctx = useContext(BoardActionsContext);
  // Intent: keep Item/Column components dumb by sourcing actions from context.
  return ctx || {};
}
