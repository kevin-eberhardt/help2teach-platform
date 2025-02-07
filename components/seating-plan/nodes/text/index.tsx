import { TextNodeProps } from "@/lib/types/seating-plan";
import GenericNode from "../generic";
import { NodeResizer, useReactFlow } from "@xyflow/react";
import { cn } from "@/lib/utils";
import TextNodeInput from "./input";
import { ONE_SEAT_DESK_SETTINGS } from "../../utils";
import { memo, useCallback } from "react";

function TextNode({ id, data, selected, className, style }: TextNodeProps) {
  const { setNodes, getNodes } = useReactFlow();

  const handleResizeEnd = useCallback(
    (width: number, height: number) => {
      try {
        setNodes((nodes) =>
          getNodes().map((node) => {
            if (node.id === id) {
              return { ...node, width, height };
            }
            return node;
          })
        );
      } catch (error) {
        console.warn("Resize operation failed:", error);
      }
    },
    [id, setNodes, getNodes]
  );

  return (
    <GenericNode
      className={cn(
        "h-full",
        "w-full",
        "flex",
        "items-center",
        "justify-center",
        className
      )}
      style={{ ...style }}
      selected={selected}
      data={data}
      id={id}
      key={id}
    >
      <NodeResizer
        color="hsl(var(--primary))"
        isVisible={selected}
        minWidth={ONE_SEAT_DESK_SETTINGS.width}
        minHeight={30}
        onResizeEnd={(_, params) =>
          handleResizeEnd(params.width, params.height)
        }
      />
      <TextNodeInput id={id} text={data.text} />
    </GenericNode>
  );
}

export default memo(TextNode);
