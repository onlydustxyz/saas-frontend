import { Pyramid } from "lucide-react";
import { HTMLAttributes } from "react";

import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function ApplicantCard({
  applicant,
  ...restProps
}: { applicant: IssueApplicantInterface } & HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className="flex cursor-pointer flex-col gap-5 p-3 transition-opacity hover:opacity-80" {...restProps}>
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="rounded-sm">
            <AvatarImage src={applicant.contributor.avatarUrl} />
            <AvatarFallback className="rounded-sm">{applicant.contributor.login.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <TypographyH4>{applicant.contributor.login}</TypographyH4>
            <TypographyMuted>
              {applicant.contributor.rank.getTitle().wording} • {applicant.contributor.rank.getRank()} • Top{" "}
              {applicant.contributor.globalRankPercentile}%
            </TypographyMuted>
          </div>
        </div>

        <Badge variant="outline" className="flex items-center gap-2">
          <Pyramid className="size-3 text-purple-500" />
          64/100
        </Badge>
      </header>

      <ul className="flex flex-wrap gap-2">
        <li className="flex items-center gap-1">
          <Pyramid className="size-4 text-red-500" />
          <TypographyP className="text-xs">Commitment score 35/100</TypographyP>
        </li>
        <li className="flex items-center gap-1">
          <Pyramid className="size-4 text-yellow-500" />
          <TypographyP className="text-xs">Technical expertise 35/100</TypographyP>
        </li>
        <li className="flex items-center gap-1">
          <Pyramid className="size-4 text-blue-500" />
          <TypographyP className="text-xs">Project familiarity 35/100</TypographyP>
        </li>
        <li className="flex items-center gap-1">
          <Pyramid className="size-4 text-green-500" />
          <TypographyP className="text-xs">Issue matching 35/100</TypographyP>
        </li>
      </ul>

      <TypographyMuted>
        {`"${"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum tempore dolore pariatur illum aliquam repellendus eum beatae tenetur aut ut itaque hic, qui, voluptate quibusdam dolores sapiente nulla voluptatem magni?"}"`}
      </TypographyMuted>
    </Card>
  );
}
