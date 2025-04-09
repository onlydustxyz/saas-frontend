"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";
import { ProjectAvailableIssuesInterface } from "@/core/domain/project/models/project-available-issues-model";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3 } from "@/shared/ui/typography";

import { ProjectIssuesProvider, useProjectIssues } from "./project-issues-context";

function ProjectIssuesContent({ projectSlug }: { projectSlug: string }) {
  const {
    issues,
    labels,
    selectedLabels,
    selectedHackathons,
    liveHackathons,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLabelClick,
    handleHackathonClick,
    fetchNextPage,
  } = useProjectIssues();

  if (isLoading) {
    return <Skeleton className="h-[406px] w-full" />;
  }

  if (isError) {
    return null;
  }

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Issues</TypographyH3>

      {labels.length || liveHackathons.length ? (
        <div className="flex flex-wrap gap-2">
          {labels?.map(label => (
            <Button
              key={label.name}
              size="sm"
              onClick={() => handleLabelClick(label)}
              variant={selectedLabels.some(l => l.name === label.name) ? "default" : "secondary"}
            >
              {label.name} ({label.count})
            </Button>
          ))}

          {labels?.length > 0 && liveHackathons?.length > 0 ? (
            <div className="h-8 border-l border-border-primary" />
          ) : null}

          {liveHackathons?.map(hackathon => (
            <Button
              key={hackathon.slug}
              size="sm"
              onClick={() => handleHackathonClick(hackathon)}
              variant={selectedHackathons.some(h => h.id === hackathon.id) ? "default" : "secondary"}
            >
              {hackathon.title}
            </Button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {!issues?.length ? (
          <EmptyState
            titleTranslate={{ token: "project:details.issues.empty.title" }}
            descriptionTranslate={{ token: "project:details.issues.empty.description" }}
          />
        ) : (
          issues.map((issue: ProjectAvailableIssuesInterface) => (
            <IssueSidepanel key={issue.id} projectId={projectSlug} issueId={issue.id} issues={issues}>
              <CardIssue
                title={issue.title}
                contribution={{
                  type: "ISSUE",
                  githubStatus: issue.status,
                  number: issue.number,
                }}
                createdAt={issue.createdAt}
                users={issue.applicants.map(a => ({
                  login: a.login,
                  avatarUrl: a.avatarUrl,
                }))}
                selectedLabels={selectedLabels.map(label => label.name)}
                githubLabels={issue.labels.map(label => ({
                  label: label.name,
                  description: label.description,
                  onClick: () =>
                    handleLabelClick({
                      ...label,
                      count: 0,
                    }),
                }))}
                createdBy={{
                  login: issue.author.login,
                  avatarUrl: issue.author.avatarUrl,
                }}
                repo={{
                  name: issue.repo.name,
                  url: issue.repo.htmlUrl,
                }}
              />
            </IssueSidepanel>
          ))
        )}

        <ShowMore
          hasNextPage={hasNextPage}
          onNext={fetchNextPage}
          loading={isFetchingNextPage}
          buttonProps={{ variant: "secondary", size: "sm" }}
          skip
        />
      </div>
    </Card>
  );
}

export function ProjectIssues({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectIssuesProvider projectSlug={projectSlug}>
      <ProjectIssuesContent projectSlug={projectSlug} />
    </ProjectIssuesProvider>
  );
}
