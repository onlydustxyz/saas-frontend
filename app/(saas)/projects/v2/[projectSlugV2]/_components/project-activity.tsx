import dynamic from "next/dynamic";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function ProjectActivity({ projectSlug = "", projectId = "" }: { projectSlug?: string; projectId?: string }) {
  const dateKernel = bootstrap.getDateKernelPort();
  const { open } = useContributionsSidepanel();
  const { capture } = usePosthog();

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      pageSize: 10,
      sort: "UPDATED_AT",
      sortDirection: "DESC",
      projectSlugs: [projectSlug],
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  if (isLoading) {
    return <Skeleton className={"h-[422px] w-full"} />;
  }

  if (isError || !contributions || contributions.length === 0) {
    return null;
  }

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Recent Activity</TypographyH3>

      <ul className={"flex flex-col"}>
        {contributions.map(contribution => (
          <li key={contribution.id}>
            <button
              onClick={() => {
                capture("project_overview_click_recent_activity", { projectId, contributionId: contribution.id });
                open({ id: contribution.id, as: ContributionAs.CONTRIBUTOR });
              }}
              className={
                "flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm p-1.5 text-left transition-colors hover:bg-muted/50"
              }
            >
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge
                  type={contribution.type}
                  number={contribution.githubNumber}
                  githubStatus={contribution.githubStatus}
                />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>{contribution.githubTitle}</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>
                {dateKernel.format(new Date(contribution.lastUpdatedAt), "dd MMM.")}
              </TypographyMuted>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
