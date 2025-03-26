import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterColumns } from "@/app/(saas)/manage-projects/[projectSlug]/financial/_features/rewards-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/(saas)/manage-projects/[projectSlug]/financial/_features/rewards-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/(saas)/manage-projects/[projectSlug]/financial/_features/rewards-table/_components/filter-data/filter-data";
import { useProjectRewardsFilterDataSidePanel } from "@/app/(saas)/manage-projects/[projectSlug]/financial/_features/rewards-table/_components/filter-data/filter-data.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { GetProjectRewardsPortParams, GetProjectRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";

export type RewardsTableFilters = Omit<
  NonNullable<GetProjectRewardsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function RewardsTable() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { open: openFilterPanel } = useProjectRewardsFilterDataSidePanel();
  // const { open } = useRewardDetailSidepanel();
  const [filters, setFilters] = useState<RewardsTableFilters>({});

  const {
    data: projectData,
    isLoading: isLoadingProjectData,
    isError: isErrorProjectData,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams } = useFilterColumns({
    projectId: projectData?.id ?? "",
  });

  const queryParams: Partial<GetProjectRewardsQueryParams> = {
    search: debouncedSearch,
    ...filters,
    ...sortingParams,
  };

  const {
    data: projectRewardsData,
    isLoading: isLoadingProjectRewardsData,
    isError: isErrorProjectRewardsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = RewardReactQueryAdapter.client.useGetProjectRewards({
    pathParams: {
      projectId: projectData?.id ?? "",
    },
    queryParams,
    options: {
      enabled: Boolean(projectData?.id),
    },
  });

  const isLoading = isLoadingProjectData || isLoadingProjectRewardsData;
  const isError = isErrorProjectData || isErrorProjectRewardsData;

  const rewards = useMemo(() => projectRewardsData?.pages.flatMap(page => page.rewards) ?? [], [projectRewardsData]);

  const table = useReactTable({
    data: rewards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    defaultColumn: TABLE_DEFAULT_COLUMN,
    columnResizeMode: "onChange",
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>

        <div className={"overflow-x-auto"}>
          <Table
            table={table}
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}
