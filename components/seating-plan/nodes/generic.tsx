import { GenericNodeProps } from "@/lib/types/seating-plan";
import { cn } from "@/lib/utils";
import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import React, { useEffect, useRef, useState } from "react";
const GenericNode = React.forwardRef<HTMLDivElement, GenericNodeProps>(
  ({ id, children, className, style, data, selected }, ref) => {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(
      data ? (data.rotation ? data.rotation : 0) : 0
    );
    const { setNodes } = useReactFlow();

    useEffect(() => {
      if (rotation > 0) {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  rotation: rotation,
                },
              };
            }

            return node;
          })
        );
      }
    }, [rotation]);

    useEffect(() => {
      if (!rotateControlRef.current) {
        return;
      }
      const selection = select(rotateControlRef.current);
      const dragHandler = drag().on("drag", (evt) => {
        const dx = evt.x - 100;
        const dy = evt.y - 100;
        const rad = Math.atan2(dx, dy);
        const deg = rad * (180 / Math.PI);
        setRotation(180 - deg);
        updateNodeInternals(id ? id : "");
      });
      // @ts-expect-error Common error
      selection.call(dragHandler);
    }, [updateNodeInternals]);

    return (
      <div
        className={cn(
          "bg-white border border-accent rounded-md shadow-md p-4",
          selected ? "border-primary" : "border-accent",
          className
        )}
        style={{
          ...style,
          transform: `rotate(${rotation}deg)`,
        }}
        ref={ref}
      >
        <div
          ref={rotateControlRef}
          className={`${
            selected ? "visible" : "hidden"
          } absolute -top-4 left-1/2 -translate-x-1/2 size-2 bg-primary`}
        />
        {children}
      </div>
    );
  }
);

GenericNode.displayName = "GenericNode";

export default GenericNode;
