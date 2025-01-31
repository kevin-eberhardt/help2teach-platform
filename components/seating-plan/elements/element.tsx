import React from "react";
import { cn } from "@/lib/utils";

interface SeatingPlanElementProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const SeatingPlanElement = React.forwardRef<
  HTMLDivElement,
  SeatingPlanElementProps
>(({ className, children, isActive = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-4 bg-white border rounded-md p-2 shadow-sm flex gap-4 min-h-16",
        isActive ? "border-primary" : "border-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SeatingPlanElement.displayName = "SeatingPlanElement";

export default SeatingPlanElement;
