"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Documentation } from "./_features/documentation/documentation";
import { EcosystemEvent } from "./_features/ecosystem-event/ecosystem-event";
import { EcosystemSummary } from "./_features/ecosystem-summary/ecosystem-summary";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "COMMUNITY" = "COMMUNITY",
}

function Navigation({ params }: { params: { ecosystemSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.ecosystems.details.overview.root(params.ecosystemSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.ecosystems.details.projects.root(params.ecosystemSlug));
  const isCommunity = useMatchPath(NEXT_ROUTER.ecosystems.details.community.root(params.ecosystemSlug));

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
      searchParams={"ecosystem-view"}
      classNames={{ base: "w-full pl-xl" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"ecosystems:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.overview.root(params.ecosystemSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"ecosystems:details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.projects.root(params.ecosystemSlug),
          },
        },
        {
          id: Views.COMMUNITY,
          children: <Translate token={"ecosystems:details.tabs.community"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.community.root(params.ecosystemSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function EcosystemLayout({
  params,
  children,
}: {
  params: { ecosystemSlug: string };
  children: ReactNode;
}) {
  return (
    <PageWrapper containerSize="medium">
      <AnimatedColumn className="h-full max-w-full">
        <ScrollView className="h-full">
          <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
            <div className="flex flex-col gap-lg desktop:col-span-1">
              <EcosystemSummary ecosystemSlug={params.ecosystemSlug} />
              <Documentation ecosystemSlug={params.ecosystemSlug} />
              <EcosystemEvent ecosystemSlug={params.ecosystemSlug} />
            </div>

            <Paper
              background="primary"
              border="primary"
              classNames={{ base: "desktop:col-span-2 overflow-hidden h-full flex flex-col" }}
              px="none"
            >
              <div className={"flex h-12 w-full flex-row items-end justify-between gap-1 laptop:h-[65px]"}>
                <Navigation params={params} />
              </div>
              {children}
            </Paper>
          </div>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}
