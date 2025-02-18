import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { cn } from "@/shared/utils";

export function SidePanelFooter({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <Paper
      as={"footer"}
      py={"lg"}
      classNames={{
        base: cn(
          "relative flex items-center justify-end rounded-none border-t border-t-border-primary border-solid",
          className
        ),
      }}
    >
      {children}
    </Paper>
  );
}
