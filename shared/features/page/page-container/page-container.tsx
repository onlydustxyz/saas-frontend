import { PropsWithChildren } from "react";

import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";
import { cn } from "@/shared/utils";

export function PageContainer({
  children,
  size = "small",
}: PropsWithChildren<{ size?: "small" | "medium" | "large" }>) {
  return (
    <div
      className={cn("mx-auto w-full px-4", {
        "max-w-[1400px]": size === "small",
        "max-w-[1600px]": size === "medium",
        "max-w-[2200px]": size === "large",
      })}
    >
      <SidePanelsProvider>{children}</SidePanelsProvider>
    </div>
  );
}
