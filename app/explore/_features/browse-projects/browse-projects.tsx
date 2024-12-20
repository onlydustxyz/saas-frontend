"use client";

import { ReactNode, useCallback, useMemo } from "react";

import { Section } from "@/app/explore/_components/section/section";
import {
  BrowseProjectsContextProvider,
  useBrowseProjectsContext,
} from "@/app/explore/_features/browse-projects-filters/browse-projects-filters.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { PROJECT_TAG, PROJECT_TAG_METADATA } from "@/shared/constants/project-tags";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";

const ALL_TAB = {
  id: "ALL",
  children: <Translate token={"common:all"} />,
} as const;

const TABS: { id: PROJECT_TAG | "ALL"; children: ReactNode }[] = [
  ALL_TAB,
  ...Object.values(PROJECT_TAG).map(tag => ({
    id: tag,
    children: <Translate token={PROJECT_TAG_METADATA[tag].label} />,
  })),
];

function Safe() {
  const { filters, queryParams } = useBrowseProjectsContext();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full py-40">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full py-40">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        availableIssueCount={project.availableIssueCount}
        goodFirstIssueCount={project.goodFirstIssueCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
      />
    ));
  }, [projects, isError, isLoading]);

  return (
    <Section
      title={{
        translate: { token: "explore:browse.title" },
      }}
      count={count}
      description={{
        translate: { token: "explore:browse.description" },
      }}
      classNames={{
        base: "gap-3xl",
      }}
    >
      <div className="flex flex-col gap-3xl">
        <header className="flex flex-row items-start justify-between gap-xl">
          <Tabs
            variant={"flat"}
            tabs={TABS}
            selectedId={filters.values.tags[0] ?? ALL_TAB.id}
            onTabClick={id => {
              filters.set({ tags: id === ALL_TAB.id ? [] : [id as PROJECT_TAG] });
            }}
            classNames={{
              base: "flex-wrap",
            }}
          />

          <BrowseProjectsFilters />
        </header>

        <div className="grid gap-xl mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-2xl desktop:grid-cols-5 desktop:gap-3xl wide:grid-cols-7">
          {renderProjects()}
          {hasNextPage ? (
            <div className="col-span-full">
              <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

export function BrowseProjects() {
  return (
    <BrowseProjectsContextProvider>
      <Safe />
    </BrowseProjectsContextProvider>
  );
}
