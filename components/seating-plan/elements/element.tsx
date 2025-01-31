import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SeatingPlanElementType } from "@/lib/types/seating-plan";
import { useSeatingPlan } from "@/hooks/use-seating-plan";

interface SeatingPlanElementProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  element?: SeatingPlanElementType;
}

const SeatingPlanElement = React.forwardRef<
  HTMLDivElement,
  SeatingPlanElementProps
>(
  (
    { className, children, isActive: isActiveProp = false, element, ...props },
    ref
  ) => {
    const { selectedElement, setSelectedElement } = useSeatingPlan();

    const [isActive, setIsActive] = useState(isActiveProp);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      setIsActive(isActiveProp);
    }, [isActiveProp]);

    useEffect(() => {
      setIsSelected(selectedElement?.id === element?.id);
    }, [selectedElement]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative p-4 bg-white border rounded-md shadow-sm flex gap-4 min-h-16",
          isActive || isSelected ? "border-primary" : "border-accent",
          className
        )}
        {...props}
        onClick={() => {
          setSelectedElement(element);
        }}
      >
        {isSelected && (
          <div className="absolute -top-4 left-1/2 bg-white rounded-md border border-primary ">
            Test
          </div>
        )}
        {children}
      </div>
    );
  }
);

SeatingPlanElement.displayName = "SeatingPlanElement";

export default SeatingPlanElement;
