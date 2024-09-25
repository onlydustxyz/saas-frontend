import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

import { ExportCsv } from "@/app/data/deep-dive/_features/projects-table/_components/export-csv/export-csv";
import { FilterColumns } from "@/app/data/deep-dive/_features/projects-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/data/deep-dive/_features/projects-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/data/deep-dive/_features/projects-table/_components/filter-data/filter-data";
import { FilterDataProvider } from "@/app/data/deep-dive/_features/projects-table/_components/filter-data/filter-data.context";
import { useProjectFilterDataSidePanel } from "@/app/data/deep-dive/_features/projects-table/_components/filter-data/filter-data.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiProjectsPortParams } from "@/core/domain/bi/bi-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export type ProjectTableFilters = Omit<
  NonNullable<GetBiProjectsPortParams["queryParams"]>["queryParams"],
  "pageSize" | "pageIndex"
>;

export function ProjectsTable() {
  const { open: openFilterPanel } = useProjectFilterDataSidePanel();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [filters, setFilters] = useState<ProjectTableFilters>({});

  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useAuthUser();
  const userProgramIds = user?.programs?.map(program => program.id) ?? [];
  const userEcosystemIds = user?.ecosystems?.map(ecosystem => ecosystem.id) ?? [];

  const queryParams: Partial<GetBiProjectsQueryParams> = {
    programOrEcosystemIds: [...userProgramIds, ...userEcosystemIds],
    search: debouncedSearch,
    ...filters,
  };

  const {
    data,
    isLoading: isLoadingBiProjects,
    isError: isErrorBiProjects,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiProjects({
    queryParams,
    options: {
      enabled: Boolean(user),
    },
  });

  const isLoading = isLoadingUser || isLoadingBiProjects;
  const isError = isErrorUser || isErrorBiProjects;

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

  const table = useReactTable({
    data: projects,
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
      <div className={"grid gap-lg"}>
        <nav className={"flex gap-md"}>
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <Button
            variant={"secondary"}
            size="sm"
            startIcon={{ component: Filter }}
            iconOnly
            onClick={() => openFilterPanel()}
          />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          <ExportCsv queryParams={queryParams} />
        </nav>
        <ScrollView direction={"x"}>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            classNames={{
              base: "min-w-[1200px]",
            }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
