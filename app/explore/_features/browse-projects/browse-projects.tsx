"use client";

import { useCallback, useState } from "react";

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

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";

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
  const { queryParams } = useBrowseProjectsContext();
  const [selectedTab, setSelectedTab] = useState("issues-available");

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
        {/* TODO @hayden handle tabs */}
        <Tabs
          variant={"flat"}
          searchParams={"data-view"}
          tabs={tabs}
          selectedId={selectedTab}
          onTabClick={setSelectedTab}
          classNames={{
            base: "flex-wrap",
          }}
        />

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
