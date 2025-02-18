import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { cn } from "@/shared/utils";

export function SidePanelBody({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <Paper
      as={ScrollView}
      size={"xl"}
      classNames={{ base: cn("flex flex-1 w-full flex-col gap-3 rounded-none h-full", className) }}
    >
      {children}
    </Paper>
  );
}
