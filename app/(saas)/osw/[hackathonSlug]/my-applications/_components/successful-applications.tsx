"use client";

import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";
import { CardDescription } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

export function SuccessfulApplications({ hackathonSlug }: { hackathonSlug: string }) {
  const { githubUserId } = useAuthUser();

  const {
    data: hackathon,
    isLoading: isHackathonLoading,
    isError: isHackathonError,
  } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  const {
    data: contributions,
    isLoading: isContributionsLoading,
    isError: isContributionsError,
  } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      hackathonId: hackathon?.id,
      contributorIds: githubUserId ? [githubUserId] : [],
      types: ["ISSUE"],
      statuses: ["IN_PROGRESS"],
    },
    options: {
      enabled: Boolean(githubUserId) && Boolean(hackathon?.id),
    },
  });

  const applications = useMemo(() => contributions?.pages.flatMap(page => page.contributions) ?? [], [contributions]);
  const isLoading = isHackathonLoading || isContributionsLoading;
  const isError = isHackathonError || isContributionsError;

  const renderApplications = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-[82px] w-full" />;
    }

    if (isError) {
      return <TypographyMuted className="text-center">Error loading applications</TypographyMuted>;
    }

    if (!applications.length) {
      return <TypographyMuted className="text-center">No applications</TypographyMuted>;
    }

    return applications.map(application => (
      <IssueSidepanel key={application.id} projectId={application.project?.id ?? ""} contributionUuid={application.id}>
        <CardIssue
          title={application.githubTitle}
          contribution={{
            type: "ISSUE",
            githubStatus: application.githubStatus,
            number: application.githubNumber,
          }}
          createdAt={application.createdAt}
          users={application.applicants.map(a => ({
            login: a.login,
            avatarUrl: a.avatarUrl,
          }))}
          createdBy={{
            login: application.githubAuthor.login,
            avatarUrl: application.githubAuthor.avatarUrl,
          }}
          repo={{
            name: application.repo.name,
            url: application.repo.htmlUrl,
          }}
        />
      </IssueSidepanel>
    ));
  }, [applications, isLoading, isError]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <TypographyH3>Successful applications</TypographyH3>
        <CardDescription>You have been assigned to these issues, time to get to work!</CardDescription>
      </header>

      <div className="flex flex-col gap-4">{renderApplications()}</div>
    </div>
  );
}
