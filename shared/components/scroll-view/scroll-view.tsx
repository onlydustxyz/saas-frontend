import { ForwardedRef, forwardRef } from "react";

import { cn } from "@/shared/helpers/cn";

import { ScrollViewProps } from "./scroll-view.types";

export const ScrollView = forwardRef(function ScrollView(
  { className, children, direction = "y" }: ScrollViewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 size-full scrollbar-thin",
        {
          "overflow-y-auto": direction === "y",
          "overflow-x-auto": direction === "x",
        },
        className
      )}
    >
      {children}
    </div>
  );
});
