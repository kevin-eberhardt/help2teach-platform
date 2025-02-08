import { TextNodeProps } from "@/lib/types/seating-plan";
import GenericNode from "../generic";
import { NodeResizer } from "@xyflow/react";
import { cn } from "@/lib/utils";
import TextNodeInput from "./input";
import { ONE_SEAT_DESK_SETTINGS } from "../../utils";
import { memo } from "react";

function TextNode({ id, data, selected, className, style }: TextNodeProps) {
  return (
    <>
      <NodeResizer
        color="hsl(var(--primary))"
        isVisible={selected}
        minWidth={ONE_SEAT_DESK_SETTINGS.width}
        minHeight={30}
      />

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
        <TextNodeInput id={id} text={data.text} />
      </GenericNode>
    </>
  );
}

export default memo(TextNode);
