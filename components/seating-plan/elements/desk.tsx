import React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
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

Table.displayName = "Table";

export default Table;
