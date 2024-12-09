"use client";

import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { ErrorState } from "@/shared/components/error-state/error-state";

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";
import {
  BrowseProjectsContextProvider,
  useBrowseProjectsContext,
} from "../browse-projects-filters/browse-projects-filters.context";

/* TODO @hayden define the tabs */
const tabs = [
  {
    id: "issues-available",
    children: "Issues available",
  },
  {
    id: "hot-community",
    children: "Hot community",
  },
  {
    id: "newbies-welcome",
    children: "Newbies welcome",
  },
  {
    id: "big-whale",
    children: "Big whale",
  },
  {
    id: "likely-to-reward",
    children: "Likely to reward",
  },
  {
    id: "work-in-progress",
    children: "Work in progress",
  },
  {
    id: "fast-and-furious",
    children: "Fast and furious",
  },
];

function Safe() {
  const {
    filters: { values: filters },
  } = useBrowseProjectsContext();

  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      // TODO @hayden convert slugs to ids
      languageSlugs: filters.languageIds,
      ecosystemSlugs: filters.ecosystemIds,
      categorySlugs: filters.categories,
    },
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

    if (!data) {
      return null;
    }

    return data.pages.flatMap(({ projects }) =>
      projects.map(project => (
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
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <div className="flex flex-col gap-3xl">
      <header className="flex justify-between gap-3xl">
        <Tabs variant={"flat"} searchParams={"data-view"} tabs={tabs} selectedId={"issues-available"} />

        <BrowseProjectsFilters />
      </header>

      <div className="grid grid-cols-1 gap-3xl mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4">
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
