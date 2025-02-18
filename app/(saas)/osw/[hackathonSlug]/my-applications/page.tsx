"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectAvailableIssuesInterface } from "@/core/domain/project/models/project-available-issues-model";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardDescription } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

function MyApplicationsPage({ params }: { params: { hackathonSlug: string } }) {
  const { open } = useApplyIssueSidePanel();

  const { data: issuesData } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: "onlyrust",
    },
    options: {
      enabled: Boolean(params.hackathonSlug),
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.issues) ?? [], [issuesData]);

  const assignedIssues = issues.filter(issue => issue.applicants.length > 0);
  const notAssignedIssues = issues.filter(issue => issue.applicants.length === 0);

  function handleIssueClick(issue: ProjectAvailableIssuesInterface) {
    open({ issueId: issue.id, projectId: "onlydust" });
  }

  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Open-Source Week",
            href: NEXT_ROUTER.osw.root,
          },
          {
            id: "slug",
            label: params.hackathonSlug,
          },
          {
            id: "my-applications",
            label: "My applications",
          },
        ]}
      />

      <div className="flex flex-col gap-4">
        <div className="pb-2 pt-6 lg:col-span-2 xl:col-span-3">
          <TypographyH3>My applications on issues already assigned</TypographyH3>
          <CardDescription>
            These issues are already assigned to other contributors, so the chances of being assigned are low. We advise
            you to apply to other issues.
          </CardDescription>
        </div>

        {assignedIssues.map(issue => (
          <CardIssue
            key={issue.id}
            title={issue.title}
            onClick={() => handleIssueClick(issue)}
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

        <div className="pb-2 pt-6 lg:col-span-2 xl:col-span-3">
          <TypographyH3>My applications on open issues</TypographyH3>
          <CardDescription>These issues are not assigned to any contributor yet.</CardDescription>
        </div>
        {notAssignedIssues.map(issue => (
          <CardIssue
            key={issue.id}
            title={issue.title}
            onClick={() => handleIssueClick(issue)}
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
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(MyApplicationsPage));
