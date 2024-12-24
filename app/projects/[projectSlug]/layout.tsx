"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectOverviewSummary } from "../_features/project-details/project-overview-summary/project-overview-summary";
import { SimilarProjects } from "../_features/project-details/similar-projects/similar-projects";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "OPEN_ISSUES" = "OPEN_ISSUES",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "REWARDS" = "REWARDS",
}

function Navigation({ params }: { params: { projectSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.projects.overview.root(params.projectSlug));
  const isOpenIssues = useMatchPath(NEXT_ROUTER.projects.issues.root(params.projectSlug));
  const isContributors = useMatchPath(NEXT_ROUTER.projects.contributors.root(params.projectSlug));
  const isRewards = useMatchPath(NEXT_ROUTER.projects.rewards.root(params.projectSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isOpenIssues) {
      return Views.OPEN_ISSUES;
    }
    if (isContributors) {
      return Views.CONTRIBUTORS;
    }
    if (isRewards) {
      return Views.REWARDS;
    }
  }, [isOverview, isOpenIssues, isContributors, isRewards]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"project-view"}
      classNames={{ base: "w-full" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"project:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.overview.root(params.projectSlug),
          },
        },
        {
          id: Views.OPEN_ISSUES,
          children: <Translate token={"project:details.tabs.openIssues"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.issues.root(params.projectSlug),
          },
        },
        {
          id: Views.CONTRIBUTORS,
          children: <Translate token={"project:details.tabs.contributors"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.contributors.root(params.projectSlug),
          },
        },
        {
          id: Views.REWARDS,
          children: <Translate token={"project:details.tabs.rewards"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.rewards.root(params.projectSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function ProjectsLayout({ params, children }: { params: { projectSlug: string }; children: ReactNode }) {
  return (
    <PageWrapper>
      <AnimatedColumn className="h-full max-w-full">
        <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
          <div className="flex flex-col gap-lg desktop:col-span-1">
            <ProjectOverviewSummary projectIdOrSlug={params.projectSlug} />
            <SimilarProjects projectIdOrSlug={params.projectSlug} />
          </div>
          <Paper
            background="glass"
            border="primary"
            classNames={{ base: "desktop:col-span-2 overflow-hidden h-full" }}
            px="none"
          >
            <div className={"flex w-full flex-row items-center justify-between gap-1"}>
              <Navigation params={params} />
            </div>
            {children}
          </Paper>
        </div>
      </AnimatedColumn>
    </PageWrapper>
  );
}
