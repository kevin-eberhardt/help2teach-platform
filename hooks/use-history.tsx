import { useState } from "react";

export function useHistory<T>(initialState: T): {
  history: T;
  setHistory(s: T): void;
  undo(): void;
  redo(): void;
  store(): void;
  redoStack: T[];
  undoStack: T[];
} {
  const [history, setHistory] = useState(initialState);
  const [undoStack, setUndoStack] = useState<T[]>([initialState]);
  const [redoStack, setRedoStack] = useState<T[]>([]);

  const store = () => {
    setUndoStack([...undoStack, history]);
    console.log("Unstack length", [...undoStack, history].length, [
      ...undoStack,
      history,
    ]);
  };

  const undo = () => {
    if (undoStack.length > 1) {
      const last = undoStack[undoStack.length - 1];
      const desired = undoStack[undoStack.length - 2];
      setUndoStack(undoStack.slice(0, undoStack.length - 1));
      setRedoStack([...redoStack, last]);
      setHistory(desired);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const last = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, last]);
      setRedoStack(redoStack.slice(0, redoStack.length - 1));
      setHistory(last);
    }
  };

  return { history, setHistory, undo, redo, store, redoStack, undoStack };
}
