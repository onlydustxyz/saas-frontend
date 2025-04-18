"use client";

import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";

import { FilterData } from "../filter-data/filter-data";
import { useCategoriesProjectsFilterDataSidePanel } from "../filter-data/filter-data.hooks";

export type ProjectsFilters = Omit<NonNullable<GetProjectsV2QueryParams>, "pageSize" | "pageIndex">;

export default function ProjectList({ categoryId }: { categoryId: string }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useCategoriesProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<ProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetProjectsV2QueryParams> = {
    search: debouncedSearch,
    categoryIds: [categoryId],
    ...filters,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full">
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
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
        tags={project.tags}
        odHackStats={project.odHackStats}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className="flex h-full flex-col gap-4xl overflow-hidden">
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>

        <div className="grid w-full grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {renderProjects}

          {hasNextPage ? (
            <div className="col-span-full">
              <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null}
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
