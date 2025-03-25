"use client";

import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { CardProject } from "@/shared/components/cards/card-project";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";

import { FilterData } from "./_components/filter-data/filter-data";
import { useEcosystemProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type EcosystemProjectsFilters = Omit<NonNullable<GetProjectsV2QueryParams>, "pageSize" | "pageIndex">;

function EcosystemProjectsPage({ params }: { params: { ecosystemSlug: string } }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useEcosystemProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<EcosystemProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetProjectsV2QueryParams> = {
    ecosystemSlugs: [params.ecosystemSlug],
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
      options: {
        enabled: Boolean(params.ecosystemSlug),
      },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-[200px]" />
        </div>
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full p-4">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full p-4">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProject
        key={project.id}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.projects.details.root(project.slug) }}
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
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Ecosystems",
            href: NEXT_ROUTER.ecosystems.root,
          },
          {
            id: "slug",
            label: params.ecosystemSlug,
          },
          {
            id: "projects",
            label: "Projects",
          },
        ]}
      />
      <div className="flex h-full flex-col gap-6 overflow-hidden p-4 pb-0">
        <nav className="flex gap-4">
          <FilterButton onClick={openFilterPanel} />
          <Input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyUp={e => {
              if (e.key === "Enter") {
                setDebouncedSearch(search);
              }
            }}
          />
        </nav>
        <ScrollView>
          <div className="grid w-full grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {renderProjects}
            {hasNextPage ? (
              <div className="col-span-full">
                <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
              </div>
            ) : null}
          </div>
        </ScrollView>
        <div className="flex gap-4">
          <p className="text-sm text-muted-foreground">Projects</p>
          <p className="text-sm">{totalItemNumber}</p>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}

export default withClientOnly(EcosystemProjectsPage);
