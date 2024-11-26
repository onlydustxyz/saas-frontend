"use client";

import { ReactNode, useMemo } from "react";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
}

export default function DataLayout({ children }: { children: ReactNode }) {
  const isOverview = useMatchPath(NEXT_ROUTER.data.overview.root);
  const isContributors = useMatchPath(NEXT_ROUTER.data.contributors.root);
  const isProjects = useMatchPath(NEXT_ROUTER.data.projects.root);

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isContributors) {
      return Views.CONTRIBUTORS;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
  }, [isOverview, isContributors, isProjects]);

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"data:details.header.title"} />,
          },
        ],
      }}
    >
      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          <PageContent classNames={{ base: "flex flex-col gap-3" }}>
            <Tabs
              variant={"solid"}
              searchParams={"data-view"}
              tabs={[
                {
                  id: Views.OVERVIEW,
                  children: <Translate token={"data:details.tabs.overview"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.overview.root,
                  },
                },
                {
                  id: Views.CONTRIBUTORS,
                  children: <Translate token={"data:details.tabs.contributor"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.contributors.root,
                  },
                },
                {
                  id: Views.PROJECTS,
                  children: <Translate token={"data:details.tabs.project"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.projects.root,
                  },
                },
              ]}
              selectedId={selectedId}
            />
            {children}
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
      <ContributorSidepanel />
      <ProjectSidepanel />
    </PageWrapper>
  );
}