import { useMemo, useState } from "react";

import { EcosystemsFilters } from "@/app/ecosystems/_features/ecosystems-filters/ecosystems-filters";
import {
  EcosystemsContextProvider,
  useEcosystemsContext,
} from "@/app/ecosystems/_features/ecosystems-filters/ecosystems-filters.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardProjectMarketplaceLoading } from "@/design-system/molecules/cards/card-project-marketplace/card-project-marketplace.loading";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace/variants/card-project-marketplace-default";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";

function Safe() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { queryParams } = useEcosystemsContext();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams: { ...queryParams, search: debouncedSearch },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return <EmptyStateLite />;
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
  }, [isLoading, isError, projects]);

  return (
    <div className="flex h-full flex-col gap-4xl overflow-hidden">
      <header className="flex flex-row items-start justify-between gap-xl">
        <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        <EcosystemsFilters />
      </header>

      <div className="grid w-full grid-cols-1 gap-4xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {renderProjects}

        {hasNextPage ? (
          <div className="col-span-full">
            <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EcosystemsList() {
  return (
    <EcosystemsContextProvider>
      <Safe />
    </EcosystemsContextProvider>
  );
}
