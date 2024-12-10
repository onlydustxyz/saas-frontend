"use client";

import { ReactNode, useCallback } from "react";

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
import { PROJECT_TAG, PROJECT_TAG_METADATA } from "@/shared/constants/project-tags";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";

const tabs: { id: PROJECT_TAG | "ALL"; children: ReactNode }[] = Object.values(PROJECT_TAG).map(tag => ({
  id: tag,
  children: <Translate token={PROJECT_TAG_METADATA[tag].label} />,
}));

const ALL_TAB = {
  id: "ALL",
  children: <Translate token={"common:all"} />,
} as const;

tabs.unshift(ALL_TAB);

function Safe() {
  const { filters, queryParams } = useBrowseProjectsContext();

  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams,
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full">
          <ErrorState />
        </div>
      );
    }

    const projects = data?.pages.flatMap(({ projects }) => projects) ?? [];

    if (!projects.length) {
      return (
        <div className="col-span-full py-40">
          <EmptyStateLite />
        </div>
      );
    }

    // TODO @hayden show more projects

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        name={project.name}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        pullRequestCount={project.pullRequestCount}
        issueCount={project.issueCount}
        goodFirstIssueCount={project.goodFirstIssueCount}
        categories={project.categories}
        languages={project.languages}
      />
    ));
  }, [data, isError, isLoading]);

  return (
    <div className="flex flex-col gap-3xl">
      <header className="flex flex-row items-start justify-between gap-xl">
        <Tabs
          variant={"flat"}
          tabs={tabs}
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

      <div className="grid gap-xl mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-3xl">
        {renderProjects()}
      </div>
    </div>
  );
}

export function BrowseProjects() {
  return (
    <BrowseProjectsContextProvider>
      <Safe />
    </BrowseProjectsContextProvider>
  );
}
