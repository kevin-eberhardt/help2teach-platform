import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NodeType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

export default function ToolbarItem({
  tooltipContent,
  type,
  children,
}: {
  tooltipContent?: React.ReactNode;
  type: NodeType;
  children?: React.ReactNode;
}) {
  const id = uuidv4();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type,
      id,
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {tooltipContent ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        children
      )}
    </div>
  );
}
