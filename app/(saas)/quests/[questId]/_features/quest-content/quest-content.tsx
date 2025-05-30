"use client";

import Link from "next/link";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH2, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { QuestListData } from "../../../_data/quest-list.data";
import { ContributorGuidelines } from "../contributor-guidelines/contributor-guidelines";
import { IssueItem } from "../issue-item/issue-item";
import { SquadItem } from "../squad-item/squad-item";
import { QuestContentProps } from "./quest-content.types";

export function QuestContent({ questId }: QuestContentProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const quest = QuestListData.find(quest => quest.id === questId);
  if (!quest) return null;

  const { startDate, endDate, maintainers, issues, status } = quest;

  const providedProfiles = Object.entries(quest.wantedProfiles).flatMap(([_, value]) =>
    value.provided.map(githubId => ({
      githubId,
    }))
  );

  const wantedProfiles = Object.entries(quest.wantedProfiles)
    .flatMap(([_, value]) =>
      Array(value.wanted - (value.provided.length ?? 0)).fill({
        githubId: undefined,
        skills: quest.requiredSkills,
      })
    )
    .filter(({ githubId }) => githubId === undefined);

  return (
    <Card>
      <CardHeader className="flex w-full flex-row flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>
            <TypographyH2>{quest.name}</TypographyH2>
          </CardTitle>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{dateKernelPort.format(new Date(startDate), "yyyy-MM-dd")}</Badge>
          <span className="text-muted-foreground">→</span>
          <Badge variant="outline">{dateKernelPort.format(new Date(endDate), "yyyy-MM-dd")}</Badge>
          <Badge variant="secondary" className="ml-2">
            {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
          </Badge>
          {status === "application-open" && <Badge variant="warning">Waiting for applications</Badge>}
          {status === "started" && <Badge variant="success">Started</Badge>}
          {status === "finished" && <Badge variant="secondary">Finished</Badge>}
        </div>

        <div className="flex w-full flex-col gap-2">
          <TypographyMuted>Description</TypographyMuted>
          <TypographyP>{quest.longDescription.description}</TypographyP>
          <ul className="list-inside list-disc">
            {quest?.longDescription.requirements?.map(requirement => <li key={requirement}>{requirement}</li>)}
          </ul>
          <TypographyP>{quest.longDescription.warning}</TypographyP>
          {quest.longDescription.links?.map(link => (
            <Link href={link} key={link} target="_blank" className="truncate hover:underline">
              {link}
            </Link>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <TypographyMuted>Guidelines</TypographyMuted>
          <ContributorGuidelines />
        </div>
        <div className="flex flex-col gap-2">
          <TypographyMuted>Squad</TypographyMuted>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {providedProfiles.map(({ githubId }) => (
              <SquadItem key={githubId} githubId={githubId} />
            ))}
            {wantedProfiles.map(({ githubId }, index) => (
              <SquadItem key={index} githubId={githubId} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {quest.requiredSkills.map(skill => (
              <Badge variant="outline" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TypographyMuted>Maintainers</TypographyMuted>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {maintainers.map(githubId => (
              <SquadItem key={githubId} githubId={githubId} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TypographyMuted>Issues</TypographyMuted>
          <div className="flex flex-col gap-4">
            {issues.map(issueId => (
              <IssueItem key={issueId} issueId={issueId} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
