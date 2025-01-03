"use client";

import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubLabelWithCountInterface } from "@/core/domain/github/models/github-label-model";
import { GetProjectAvailableIssuesQueryParams } from "@/core/domain/project/project-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProjectIssuesPage({ params }: { params: { projectSlug: string } }) {
  const [selectedLabels, setSelectedLabels] = useState<GithubLabelWithCountInterface[]>([]);
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const queryParams: Partial<GetProjectAvailableIssuesQueryParams> = {
    githubLabels: selectedLabels.map(label => label.name),
  };

  const { data: issuesData } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    queryParams,
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.issues) ?? [], [issuesData]);
  const totalItemNumber = useMemo(() => issuesData?.pages[0]?.totalItemNumber, [issuesData]);

  const labels = useMemo(() => {
    const allLabels = issuesData?.pages.flatMap(page => page.labels) ?? [];
    return [...new Map(allLabels.map(label => [label.name, label])).values()] as GithubLabelWithCountInterface[];
  }, [issuesData]);

  function handleLabelClick(label: GithubLabelWithCountInterface) {
    setSelectedLabels(prev => {
      if (prev.some(l => l.name === label.name)) {
        return prev.filter(l => l.name !== label.name);
      }
      return [...prev, label];
    });
  }

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: data?.name,
            href: NEXT_ROUTER.projects.overview.root(params.projectSlug),
            level: "3",
          },
          {
            id: "open-issues",
            label: <Translate token={"project:details.tabs.openIssues"} />,
            level: "5",
          },
        ]}
      />
      <div className={"flex h-full flex-col divide-y divide-border-primary overflow-hidden"}>
        <div className="flex flex-wrap gap-md p-lg">
          {labels?.map(label => (
            <Badge
              key={label.name}
              onClick={() => handleLabelClick(label)}
              color={selectedLabels.some(l => l.name === label.name) ? "brand" : "grey"}
            >
              {label.name} ({label.count})
            </Badge>
          ))}
        </div>
        <ScrollView direction={"x"} className="flex flex-col gap-4 p-lg">
          {issues?.map(issue => (
            <CardIssue
              key={issue.id}
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
              githubLabels={issue.labels.map(label => ({
                label: label.name,
                description: label.description,
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
          ))}
        </ScrollView>
        <div className="flex gap-md p-lg pb-0">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "project:details.issues.issuesCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
    </ScrollView>
  );
}
