import { useCallback } from "react";

import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { IssueCardProps } from "./issue-card.types";

export function IssueCard({ title, project, languages, createdAt, labels, issue, onClick }: IssueCardProps) {
  const limitedLabels = labels?.slice(0, 2) ?? [];

  const dateKernelPort = bootstrap.getDateKernelPort();

  const renderLanguages = useCallback(() => {
    if (!languages?.length) return null;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {languages.slice(0, 2).map(language => (
              <Avatar className="size-5" key={language.name}>
                <AvatarImage src={language.logoUrl} />
                <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom" align="end">
          <ul className="flex flex-col gap-2">
            {languages.map(language => (
              <li key={language.name} className="flex items-center gap-1">
                <Avatar className="size-5" key={language.name}>
                  <AvatarImage src={language.logoUrl} />
                  <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <TypographySmall>{language.name}</TypographySmall>
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    );
  }, [languages]);

  return (
    <Card className="flex flex-col gap-4 p-4" onClick={onClick}>
      <header>
        <CardTitle className="flex w-full flex-row items-center justify-start gap-2">
          <ContributionBadge type="ISSUE" githubStatus={issue.githubStatus} number={issue.number} />
          <div className="line-clamp-1 flex-1">{title}</div>
        </CardTitle>
      </header>

      <div className="flex flex-row items-center gap-1">
        <Avatar className="size-5">
          <AvatarImage src={project.logoUrl} />
          <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <TypographyMuted>
            {project.name}/{project.repo}
          </TypographyMuted>

          {renderLanguages()}
        </div>
      </div>

      <footer className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row items-center justify-end gap-1">
          {limitedLabels.map(label => (
            <Badge variant={"secondary"} key={label}>
              {label}
            </Badge>
          ))}
        </div>
        <TypographyMuted>{dateKernelPort.formatDistanceToNow(new Date(createdAt))}</TypographyMuted>
      </footer>
    </Card>
  );
}
