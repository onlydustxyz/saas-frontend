import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";

import {
  DEFAULT_FILTER,
  TransactionsContextFilter,
  TransactionsContextFilterType,
  TransactionsContextFiltersOptions,
  TransactionsContextProps,
  TransactionsContextQueryParams,
  TransactionsContextReturn,
} from "./transactions.context.types";

const TransactionsContext = createContext<TransactionsContextReturn>({
  programId: "",
  monthlyTransactions: undefined,
  isLoadingTransactions: false,
  queryParams: {},
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

export function TransactionsContextProvider({ children, programId }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    types: [
      TransactionsContextFilterType.GRANTED,
      TransactionsContextFilterType.UNGRANTED,
      TransactionsContextFilterType.ALLOCATED,
      TransactionsContextFilterType.UNALLOCATED,
    ],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsContextQueryParams>(queryParams);

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
      programId,
    },
    options: {
      enabled: !!programId,
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

  const setFilter = (filter: Partial<TransactionsContextFilter>) => {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTER);
  };

  return (
    <TransactionsContext.Provider
      value={{
        programId,
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
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("TransactionsContext must be used inside a TransactionsContextProvider");
  }

  return context;
}
