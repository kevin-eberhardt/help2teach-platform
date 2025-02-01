import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  SeatingPlanElementType,
  SeatingPlanElementTypes,
} from "@/lib/types/seating-plan";
import { useSeatingPlan } from "@/hooks/use-seating-plan";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeatingPlanElementProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  element?: SeatingPlanElementType;
  onRotationChange?: (rotation: number) => void;
}

const SeatingPlanElement = React.forwardRef<
  HTMLDivElement,
  SeatingPlanElementProps
>(
  (
    {
      className,
      children,
      isActive: isActiveProp = false,
      element,
      onRotationChange,
      style,
      ...props
    },
    ref
  ) => {
    const { selectedElement, setSelectedElement, setElementToDelete } =
      useSeatingPlan();
    const containerRef = useRef<HTMLDivElement>(null);

    const [rotation, setRotation] = useState(element?.rotation || 0);
    const [isActive, setIsActive] = useState(isActiveProp);
    const [isSelected, setIsSelected] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    useEffect(() => {
      setIsActive(isActiveProp);
    }, [isActiveProp]);

    useEffect(() => {
      setIsSelected(selectedElement?.id === element?.id);
    }, [selectedElement]);

    useEffect(() => {
      if (element?.rotation !== undefined && element.rotation !== rotation) {
        setRotation(element.rotation);
      }
    }, [element?.rotation]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          isSelected &&
          (e.key === "Delete" || e.key === "Backspace") &&
          element?.type !== SeatingPlanElementTypes.StudentList
        ) {
          e.preventDefault();
          setElementToDelete(element);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isSelected, element, setElementToDelete]);

    const handleRotationPointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);

      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const initialRotation = rotation;

      const onPointerMove = (moveEvent: PointerEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();

        const currentAngle = Math.atan2(
          moveEvent.clientY - centerY,
          moveEvent.clientX - centerX
        );
        const angleDiff = (currentAngle - startAngle) * (180 / Math.PI);
        const newRotation = initialRotation + angleDiff;
        setRotation(newRotation);
      };

      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        setIsRotating(false);

        if (onRotationChange) {
          onRotationChange(rotation);
        }
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        className={cn(
          "relative p-4 bg-white border rounded-md shadow-sm flex gap-4 min-h-16",
          isActive || isSelected ? "border-primary" : "border-accent",
          className
        )}
        {...(!isRotating && props)}
        onClick={() => {
          setSelectedElement(element);
        }}
        style={{
          ...style,
          transform: `${
            style?.transform ? style.transform + " " : ""
          }rotate(${rotation}deg)`,
          transformOrigin: "center center",
          pointerEvents: isRotating ? "none" : "auto",
        }}
      >
        {isSelected && (
          <>
            <div
              className="absolute -top-4 left-1/2 bg-white rounded-md border border-primary size-2"
              onPointerDown={handleRotationPointerDown}
            />
            <Button
              className="absolute -top-4 right-0 p-0 h-4 w-4"
              size="icon"
              variant="ghost"
              onClick={() => setElementToDelete(element)}
            >
              <X className="size-4 text-primary" />
            </Button>
          </>
        )}
        {children}
      </div>
    );
  }
);

SeatingPlanElement.displayName = "SeatingPlanElement";

export default SeatingPlanElement;
