import { Button } from "@/components/ui/button";
import { Redo, Undo } from "lucide-react";

export default function Controls({
  redo,
  undo,
  isRedoDisabled,
  isUndoDisabled,
}: {
  redo: () => void;
  undo: () => void;
  isRedoDisabled: boolean;
  isUndoDisabled: boolean;
}) {
  return (
    <div className="absolute left-12 bottom-3 z-10">
      <Button
        size="icon"
        variant="outline"
        onClick={undo}
        disabled={isUndoDisabled}
        className="size-7 rounded-none"
      >
        <Undo />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={redo}
        disabled={isRedoDisabled}
        className="size-7 rounded-none"
      >
        <Redo />
      </Button>
    </div>
  );
}
