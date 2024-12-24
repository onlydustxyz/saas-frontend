import { getCoreRowModel } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import {
  GetProjectContributorsV2PortParams,
  GetProjectContributorsV2QueryParams,
} from "@/core/domain/project/project-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";
import { TableLoading } from "@/design-system/molecules/table/table.loading";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";

import { FilterColumns } from "./filter-columns/filter-columns/filter-columns";
import { useFilterColumns } from "./filter-columns/filter-columns/filter-columns.hooks";

export type ContributorsTableFilters = Omit<
  NonNullable<GetProjectContributorsV2PortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function ContributorsTable() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [filters, setFilters] = useState<ContributorsTableFilters>({});
  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

  const queryParams: Partial<GetProjectContributorsV2QueryParams> = {
    login: debouncedSearch,
  };

  const {
    data: contributorsData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectContributorsV2({
    queryParams,
  });

  const contributors = useMemo(
    () => contributorsData?.pages.flatMap(page => page.contributors) ?? [],
    [contributorsData]
  );

  const totalItemNumber = useMemo(() => contributorsData?.pages[0].totalItemNumber, [contributorsData]);

  const table = useReactTable({
    data: contributors,
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
      <div className={"flex h-full flex-col divide-y divide-border-primary overflow-hidden"}>
        <nav className={"flex gap-md p-xl"}>
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>
        <div className="overflow-hidden p-lg">
          <ScrollView direction={"x"}>
            <Table
              table={table}
              header={{
                headerGroups: table.getHeaderGroups(),
                classNames: {
                  base: "bg-transparent relative",
                },
              }}
              rows={table.getRowModel().rows}
            />
            {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
          </ScrollView>
          <div className="flex gap-2">
            <Typo
              size={"sm"}
              color={"secondary"}
              translate={{ token: "project:details.contributors.contributorsCount" }}
            />
            <Typo size={"sm"} color={"primary"}>
              {totalItemNumber}
            </Typo>
          </div>
        </div>
      </div>
    </FilterDataProvider>
  );
}
