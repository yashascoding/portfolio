"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Terminal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("z-0 h-full w-full max-w-[500px] rounded-md border border-border bg-background font-mono text-sm", className)} {...props}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
);
Terminal.displayName = "Terminal";

export { Terminal };
