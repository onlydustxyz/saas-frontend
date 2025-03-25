import { ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyH4, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const Emoji = dynamic(() => import("react-emoji-render"));

export function ProjectContributeNowGFI({
  projectId = "",
  size = "default",
  hideWhenEmpty = false,
  posthogPrefix = "project_overview_click_good_first_issue",
}: {
  projectId?: string;
  size?: "default" | "small";
  hideWhenEmpty?: boolean;
  posthogPrefix?: string;
}) {
  const dateKernel = bootstrap.getDateKernelPort();

  const { capture } = usePosthog();

  const Title = size === "default" ? TypographyH3 : TypographyH4;

  const { data, isLoading, isError, hasNextPage } = ProjectReactQueryAdapter.client.useGetProjectGoodFirstIssues({
    pathParams: {
      projectId,
    },
    queryParams: {
      pageSize: 3,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const goodFirstIssues = useMemo(() => data?.pages.flatMap(page => page.issues) ?? [], [data]);

  const renderGoodFirstIssues = useCallback(() => {
    if (isLoading) {
      return (
        <ul className={"flex flex-col gap-3"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className={"h-12 w-full"} />
            </li>
          ))}
        </ul>
      );
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>Error loading Good First Issues</TypographyMuted>
        </div>
      );
    }

    if (goodFirstIssues.length === 0) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>No good first issues found</TypographyMuted>
        </div>
      );
    }

    return (
      <ul className={"flex flex-col gap-3"}>
        {goodFirstIssues.map(issue => (
          <li key={issue.id}>
            <IssueSidepanel key={issue.id} projectId={projectId} issueId={issue.id}>
              <button
                onClick={() => {
                  capture(posthogPrefix, { projectId, issueId: issue.id });
                }}
                className={"w-full text-left transition-opacity hover:opacity-80"}
              >
                <Card className={"flex cursor-pointer items-center justify-between gap-3 p-3"}>
                  <div className={"flex flex-1 items-center gap-3"}>
                    <ContributionBadge type={"ISSUE"} number={issue.number} githubStatus={issue.status} />

                    <TypographySmall className={"line-clamp-1"}>
                      <Emoji>{issue.title}</Emoji>
                    </TypographySmall>
                  </div>

                  <TypographyMuted className={"text-xs"}>
                    {dateKernel.format(new Date(issue.createdAt), "dd MMM.")}
                  </TypographyMuted>
                </Card>
              </button>
            </IssueSidepanel>
          </li>
        ))}
      </ul>
    );
  }, [goodFirstIssues, isLoading, isError, dateKernel]);

  if (hideWhenEmpty && (goodFirstIssues.length === 0 || isError)) {
    return null;
  }

  return (
    <Card
      className={cn("flex flex-col bg-gradient-to-br from-green-950 to-transparent to-50%", {
        "gap-4 p-4": size === "default",
        "gap-3 p-3": size === "small",
      })}
    >
      <header className={"flex items-center gap-2"}>
        <ThumbsUp className={cn("text-green-700", { "size-5": size === "small" })} />
        <Title>Good First Issues</Title>
      </header>

      <TypographyP className={cn({ "text-sm": size === "small" })}>
        This project&apos;s Good First Issues, perfect for new contributors.
      </TypographyP>

      {renderGoodFirstIssues()}

      {hasNextPage ? (
        <div>
          <Button variant={"outline"} asChild>
            <Link
              href={NEXT_ROUTER.projects.details.root(projectId)}
              onClick={() => capture(`${posthogPrefix}_view_all`, { projectId })}
            >
              View all issues
            </Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
