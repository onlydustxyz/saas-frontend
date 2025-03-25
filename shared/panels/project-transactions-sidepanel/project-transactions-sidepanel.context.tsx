import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";

import {
  DEFAULT_FILTER,
  ProjectTransactionsContextFilter,
  ProjectTransactionsContextFilterType,
  ProjectTransactionsContextFiltersOptions,
  ProjectTransactionsContextProps,
  ProjectTransactionsContextQueryParams,
  ProjectTransactionsContextReturn,
} from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.types";

const ProjectTransactionsContext = createContext<ProjectTransactionsContextReturn>({
  projectSlug: "",
  monthlyTransactions: undefined,
  queryParams: {},
  isLoadingTransactions: false,
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
    options: {
      types: [],
    },
  },
});

export function ProjectTransactionsContextProvider({ children, projectSlug }: ProjectTransactionsContextProps) {
  const [filters, setFilters] = useState<ProjectTransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<ProjectTransactionsContextFiltersOptions>({
    types: [
      ProjectTransactionsContextFilterType.GRANTED,
      ProjectTransactionsContextFilterType.REWARDED,
      ProjectTransactionsContextFilterType.UNGRANTED,
      ProjectTransactionsContextFilterType.UNALLOCATED,
    ],
  });
  const [queryParams, setQueryParams] = useState<ProjectTransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<ProjectTransactionsContextQueryParams>(queryParams);

  const dateKernelPort = bootstrap.getDateKernelPort();

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const { data: monthlyTransactions, isLoading } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      ...debouncedQueryParams,
      sort: "DATE",
      showEmpty: false,
      projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.types.length ? filters.types : undefined,
      sortDirection: filters.sortDirection ? filters.sortDirection : undefined,
      fromDate: filters.dateRange?.start ? dateKernelPort.format(filters.dateRange.start, "yyyy-MM-dd") : undefined,
      toDate: filters.dateRange?.end ? dateKernelPort.format(filters.dateRange.end, "yyyy-MM-dd") : undefined,
    });
  }, [dateKernelPort, filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.types.length + (filters.dateRange ? 1 : 0);
  }, [filters]);

  function setFilter(filter: Partial<ProjectTransactionsContextFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
  }

  return (
    <ProjectTransactionsContext.Provider
      value={{
        projectSlug,
        monthlyTransactions,
        queryParams: debouncedQueryParams,
        isLoadingTransactions: isLoading,
        filters: {
          values: filters,
          isCleared,
          set: setFilter,
          clear: clearFilters,
          count: filtersCount,
          options: filtersOptions,
        },
      }}
    >
      {children}
    </ProjectTransactionsContext.Provider>
  );
}

export function useProjectTransactionsContext() {
  const context = useContext(ProjectTransactionsContext);

  if (!context) {
    throw new Error("ProjectTransactionsContext must be used inside a ProjectTransactionsContextProvider");
  }

  return context;
}
