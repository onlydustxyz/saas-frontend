import { Progress } from "@/shared/ui/progress";
import { TypographyMuted } from "@/shared/ui/typography";

import { ApplyCounterProps } from "./apply-counter.types";

export function ApplyCounter({ children }: ApplyCounterProps) {
  return (
    <>
      {children}
      <div className="flex flex-col items-end gap-1">
        <TypographyMuted>5 applications / 10 remaining</TypographyMuted>
        <Progress value={50} max={100} />
      </div>
    </>
  );
}
