"use client";

import { useCallback, useMemo } from "react";

import {
  BrowseProjectsContextProvider,
  useBrowseProjectsContext,
} from "@/app/(saas)/projects/_features/browse-projects-filters/browse-projects-filters.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";

function Safe() {
  const { queryParams } = useBrowseProjectsContext();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams: { ...queryParams, pageSize: 16 },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

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
        as={BaseLink}
        htmlProps={{
          href: NEXT_ROUTER.projects.details.root(project.slug),
        }}
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
        tags={project.tags}
      />
    ));
  }, [projects, isError, isLoading]);

  return (
    <section className={"flex flex-col"}>
      <div className="flex flex-col gap-3xl">
        <BrowseProjectsFilters />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderProjects()}
          {hasNextPage ? (
            <div className="col-span-full">
              <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function BrowseProjects() {
  return (
    <BrowseProjectsContextProvider>
      <Safe />
    </BrowseProjectsContextProvider>
  );
}
