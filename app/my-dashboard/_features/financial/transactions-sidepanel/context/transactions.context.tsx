import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import {
  DEFAULT_FILTER,
  TransactionsContextFilter,
  TransactionsContextFilterType,
  TransactionsContextFiltersOptions,
  TransactionsContextProps,
  TransactionsContextQueryParams,
  TransactionsContextReturn,
} from "@/app/my-dashboard/_features/financial/transactions-sidepanel/context/transactions.context.types";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export const TransactionsContext = createContext<TransactionsContextReturn>({
  githubUserId: 0,
  transactionsStats: [],
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

export function TransactionsContextProvider({ children }: TransactionsContextProps) {
  const [filters, setFilters] = useState<TransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<TransactionsContextFiltersOptions>({
    types: [TransactionsContextFilterType.REWARDED, TransactionsContextFilterType.PAID],
  });
  const [queryParams, setQueryParams] = useState<TransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsContextQueryParams>(queryParams);

  const dateKernelPort = bootstrap.getDateKernelPort();

  const { githubUserId } = useAuthUser();

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const { data: transactionsStats } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      ...debouncedQueryParams,
      sort: "DATE",
      sortDirection: "DESC",
      showEmpty: true,
      recipientId: githubUserId,
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.types.length ? filters.types : undefined,
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
        githubUserId: githubUserId || 0,
        transactionsStats: transactionsStats?.stats,
        queryParams: debouncedQueryParams,
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