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

    useEffect(() => {
      setIsActive(isActiveProp);
    }, [isActiveProp]);

    useEffect(() => {
      setIsActive(selectedElement?.id === element?.id);
    }, [selectedElement]);

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 bg-white border rounded-md shadow-sm flex gap-4 min-h-16",
          isActive ? "border-primary" : "border-accent",
          className
        )}
        {...props}
        onClick={() => {
          setSelectedElement(element);
        }}
      >
        {children}
      </div>
    );
  }
);

SeatingPlanElement.displayName = "SeatingPlanElement";

export default SeatingPlanElement;
