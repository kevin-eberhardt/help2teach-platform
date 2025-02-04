import { CustomTextSeatingPlanElementType } from "@/lib/types/seating-plan";
import { useDraggable } from "@dnd-kit/core";
import { ZoomTransform } from "d3-zoom";
import SeatingPlanElement from "../element";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSeatingPlan } from "@/hooks/use-seating-plan";

export default function CustomText({
  element,
  canvasTransform,
  updateText,
  updateElement,
}: {
  element: CustomTextSeatingPlanElementType;
  canvasTransform: ZoomTransform;
  updateText: (text: string) => void;
  updateElement: (element: CustomTextSeatingPlanElementType) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: element.id,
      data: element,
    });

  const [isEditing, setIsEditing] = useState(false);
  const { setSelectedElement } = useSeatingPlan();
  const [text, setText] = useState(element.data.text);

  useEffect(() => {
    if (isEditing) {
      setSelectedElement(undefined);
    }
  }, [isEditing]);

  useEffect(() => {
    if (text !== element.data.text) {
      const timeout = setTimeout(() => {
        updateText(text);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [text, element.data.text]);

  return (
    <SeatingPlanElement
      isActive={isDragging}
      isResizable={true}
      element={element}
      updateElement={(element) =>
        updateElement(element as CustomTextSeatingPlanElementType)
      }
      style={{
        position: "absolute",
        top: `${element.coordinates.y * canvasTransform.k}px`,
        left: `${element.coordinates.x * canvasTransform.k}px`,
        width: element.width,
        height: element.height,
        transformOrigin: "top left",
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
            }
          : {
              transform: `scale(${canvasTransform.k})`,
            }),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onPointerDown={(e) => {
        if (isEditing) {
          setIsEditing(false);
        } else {
          listeners?.onPointerDown?.(e);
          e.preventDefault();
        }
      }}
    >
      <div className="flex items-center justify-center">
        <Input
          style={{ width: text.length * 20 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={() => setIsEditing(!isEditing)}
          onBlur={() => setIsEditing(false)}
          className="text-center border-none shadow-none"
        />
      </div>
    </SeatingPlanElement>
  );
}
