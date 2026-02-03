import React, { createContext, useContext } from "react";

const BoardActionsContext = createContext(null);

export function BoardActionsProvider({ value, children }) {
  return (
    <BoardActionsContext.Provider value={value}>
      {children}
    </BoardActionsContext.Provider>
  );
}

export function useBoardActions() {
  const ctx = useContext(BoardActionsContext);
  return ctx || {};
}
