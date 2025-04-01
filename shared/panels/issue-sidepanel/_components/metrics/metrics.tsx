import { bootstrap } from "@/core/bootstrap";

import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function Metrics({
  applicantsCount,
  commentsCount,
}: {
  applicantsCount: number;
  commentsCount: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="flex flex-col gap-1 p-3">
        <TypographyMuted>Applicants</TypographyMuted>
        <TypographyH4>{applicantsCount}</TypographyH4>
      </Card>

      <Card className="flex flex-col gap-1 p-3">
        <TypographyMuted>Comments</TypographyMuted>
        <TypographyH4>{commentsCount}</TypographyH4>
      </Card>
    </div>
  );
}
