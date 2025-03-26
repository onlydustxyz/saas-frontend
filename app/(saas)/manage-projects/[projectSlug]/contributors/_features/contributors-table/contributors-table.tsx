import { RowSelectionState, Updater, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";

import { FilterColumns } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/_components/filter-data/filter-data";
import { useContributorFilterDataSidePanel } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/_components/filter-data/filter-data.hooks";
import {
  ContributorsTableContext,
  ContributorsTableProvider,
} from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table.context";
import { ContributorsTableProps } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table.types";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

export type ContributorsTableFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

function SafeContributorsTable() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [filters, setFilters] = useState<ContributorsTableFilters>({});

  const { rowSelection, setRowSelection, setUserSelected } = useContext(ContributorsTableContext);

  const { open: openFilterPanel } = useContributorFilterDataSidePanel();
  const { open: openContributor } = useContributorSidePanel();

  const { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams } = useFilterColumns();

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
    ...sortingParams,
  };

  const {
    data,
    isLoading: isLoadingBiContributors,
    isError: isErrorBiContributors,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      ...queryParams,
      projectSlugs: [projectSlug],
      showFilteredKpis: true,
      contributionStatuses: ["IN_PROGRESS", "COMPLETED"],
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const isLoading = isLoadingBiContributors;
  const isError = isErrorBiContributors;

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);

  const table = useReactTable({
    data: contributors,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.contributor.githubUserId.toString(),
    onRowSelectionChange: (selection: Updater<RowSelectionState>) => {
      const selectedIds = typeof selection === "function" ? selection(rowSelection) : selection;

      const selectedContributors = contributors.filter(
        contributor => selectedIds[contributor.contributor.githubUserId]
      );

      setUserSelected(selectedContributors);
      setRowSelection(selection);
      return selection;
    },
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    state: {
      rowSelection,
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
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
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
            onRowClick={row => {
              openContributor({ githubId: row.original.contributor.githubUserId });
            }}
            rowSelection={rowSelection}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}

export function ContributorsTable({ projectSlug }: ContributorsTableProps) {
  return (
    <ContributorsTableProvider projectSlug={projectSlug}>
      <SafeContributorsTable />
    </ContributorsTableProvider>
  );
}
