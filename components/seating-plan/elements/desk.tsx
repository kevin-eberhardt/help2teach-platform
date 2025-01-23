import React from "react";
import { cn } from "@/lib/utils";

const Desk = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white border border-gray-100 rounded-md p-2 shadow-sm flex gap-4 min-h-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Desk.displayName = "Desk";

export default Desk;
