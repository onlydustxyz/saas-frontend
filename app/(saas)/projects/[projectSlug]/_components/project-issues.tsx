"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubLabelWithCountInterface } from "@/core/domain/github/models/github-label-model";
import { HackathonListItemInterface } from "@/core/domain/hackathon/models/hackathon-list-item-model";
import { GetProjectAvailableIssuesQueryParams } from "@/core/domain/project/project-contract.types";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3 } from "@/shared/ui/typography";

export function ProjectIssues({ projectSlug }: { projectSlug: string }) {
  const searchParams = useSearchParams();

  const [selectedLabels, setSelectedLabels] = useState<GithubLabelWithCountInterface[]>(() => {
    const labels = searchParams.get("l")?.split(",").filter(Boolean) || [];

    return labels.map(name => ({ name })) as GithubLabelWithCountInterface[];
  });

  const [selectedHackathons, setSelectedHackathons] = useState<HackathonListItemInterface[]>(() => {
    const hackathons = searchParams.get("h")?.split(",").filter(Boolean) || [];

    return hackathons.map(id => ({ id })) as HackathonListItemInterface[];
  });

  const { data: hackathons } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const liveHackathons = useMemo(
    () => hackathons?.hackathons.filter(hackathon => hackathon.isLive()) ?? [],
    [hackathons]
  );

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const queryParams: Partial<GetProjectAvailableIssuesQueryParams> = {
    githubLabels: selectedLabels.map(label => label.name),
    hackathonId: selectedHackathons[0]?.id,
    pageSize: 5,
  };

  const {
    data: issuesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    queryParams,
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.issues) ?? [], [issuesData]);

  const labels = useMemo(() => {
    const allLabels = issuesData?.pages.flatMap(page => page.labels) ?? [];
    return [...new Map(allLabels.map(label => [label.name, label])).values()] as GithubLabelWithCountInterface[];
  }, [issuesData]);

  function handleLabelClick(label: GithubLabelWithCountInterface) {
    setSelectedLabels(prev => {
      const next = prev.some(l => l.name === label.name) ? prev.filter(l => l.name !== label.name) : [...prev, label];

      const params = new URLSearchParams(window.location.search);

      const labels = next.map(l => l.name);

      if (labels.length) {
        params.set("l", labels.join(","));
      } else {
        params.delete("l");
      }

      window.history.replaceState(null, "", `?${params.toString()}`);

      return next;
    });
  }

  function handleHackathonClick(hackathon: HackathonListItemInterface) {
    setSelectedHackathons(prev => {
      const next = prev.some(h => h.id === hackathon.id)
        ? prev.filter(h => h.id !== hackathon.id)
        : [...prev, hackathon];

      const params = new URLSearchParams(window.location.search);

      const hackathons = next.map(h => h.id);

      if (hackathons.length) {
        params.set("h", hackathons.join(","));
      } else {
        params.delete("h");
      }

      window.history.replaceState(null, "", `?${params.toString()}`);

      return next;
    });
  }

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
          issues.map(issue => (
            <IssueSidepanel key={issue.id} projectId={data?.id ?? ""} issueId={issue.id}>
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
