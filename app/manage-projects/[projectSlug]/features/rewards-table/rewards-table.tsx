import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterColumns } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-data/filter-data";
import { useProjectRewardsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-data/filter-data.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { GetProjectRewardsPortParams, GetProjectRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
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

  const queryParams: Partial<GetProjectRewardsQueryParams> = {
    search: debouncedSearch,
    sort: "REQUESTED_AT",
    ...filters,
  };

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
  const totalItemNumber = useMemo(() => projectRewardsData?.pages[0].totalItemNumber, [projectRewardsData]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns({ projectId: projectData?.id ?? "" });

  const table = useReactTable({
    data: rewards,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>
        <ScrollView direction={"x"}>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            // TODO @Mehdi enable reward detail sidepanel once feature ready
            // onRowClick={row => {
            //   open({ rewardId: row.original.id, projectId: projectData?.id ?? "" });
            // }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-2">
          <Typo
            size={"sm"}
            color={"secondary"}
            translate={{ token: "manageProjects:detail.rewardsTable.rewardsCount" }}
          />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
