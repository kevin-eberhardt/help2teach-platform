import { TextNodeProps } from "@/lib/types/seating-plan";
import GenericNode from "../generic";
import { NodeResizer, useReactFlow } from "@xyflow/react";
import { cn } from "@/lib/utils";
import TextNodeInput from "../../canvas/input";
import { ONE_SEAT_DESK_SETTINGS } from "../../utils";

function TextNode({ id, data, selected, className, style }: TextNodeProps) {
  const { setNodes, getNodes } = useReactFlow();

  function handleResizeEnd(width: number, height: number) {
    console.log("resize", width, height);
    setNodes((nodes) =>
      getNodes().map((node) => {
        if (node.id === id) {
          return { ...node, width, height };
        } else {
          return node;
        }
      })
    );
  }

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

export default TextNode;
