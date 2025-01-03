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

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "COMMUNITY" = "COMMUNITY",
}

function Navigation({ params }: { params: { hackathonSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.hackathons.details.overview.root(params.hackathonSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.hackathons.details.projects.root(params.hackathonSlug));
  const isCommunity = useMatchPath(NEXT_ROUTER.hackathons.details.community.root(params.hackathonSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    if (isCommunity) {
      return Views.COMMUNITY;
    }
  }, [isOverview, isProjects, isCommunity]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"hackathon-view"}
      classNames={{ base: "w-full" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"hackathon:details.details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.hackathons.details.overview.root(params.hackathonSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"hackathon:details.details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.hackathons.details.projects.root(params.hackathonSlug),
          },
        },
        {
          id: Views.COMMUNITY,
          children: <Translate token={"hackathon:details.details.tabs.community"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.hackathons.details.community.root(params.hackathonSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function HackathonsLayout({
  params,
  children,
}: {
  params: { hackathonSlug: string };
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <AnimatedColumn className="h-full max-w-full">
        <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
          <div className="flex flex-col gap-lg desktop:col-span-1">
            {/* Placeholder for Hackathon Summary Component */}
          </div>
          <Paper
            background="glass"
            border="primary"
            classNames={{ base: "desktop:col-span-2 overflow-hidden h-full flex flex-col" }}
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
