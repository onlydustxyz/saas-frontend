import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import {
  DEFAULT_FILTER,
  MyRewardsTransactionsContextFilter,
  MyRewardsTransactionsContextFilterType,
  MyRewardsTransactionsContextFiltersOptions,
  MyRewardsTransactionsContextProps,
  MyRewardsTransactionsContextQueryParams,
  MyRewardsTransactionsContextReturn,
} from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.types";

const MyRewardsTransactionsContext = createContext<MyRewardsTransactionsContextReturn>({
  githubUserId: 0,
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

export function MyRewardsTransactionsContextProvider({ children }: MyRewardsTransactionsContextProps) {
  const [filters, setFilters] = useState<MyRewardsTransactionsContextFilter>(DEFAULT_FILTER);
  const [filtersOptions] = useState<MyRewardsTransactionsContextFiltersOptions>({
    types: [MyRewardsTransactionsContextFilterType.REWARDED, MyRewardsTransactionsContextFilterType.PAID],
  });
  const [queryParams, setQueryParams] = useState<MyRewardsTransactionsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] =
    useState<MyRewardsTransactionsContextQueryParams>(queryParams);

  const dateKernelPort = bootstrap.getDateKernelPort();

  const { githubUserId = 0 } = useAuthUser();

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
      sortDirection: filters.sortDirection ? filters.sortDirection : undefined,
      fromDate: filters.dateRange?.start ? dateKernelPort.format(filters.dateRange.start, "yyyy-MM-dd") : undefined,
      toDate: filters.dateRange?.end ? dateKernelPort.format(filters.dateRange.end, "yyyy-MM-dd") : undefined,
    });
  }, [dateKernelPort, filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.types.length + (filters.dateRange ? 1 : 0);
  }, [filters]);

  function setFilter(filter: Partial<MyRewardsTransactionsContextFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
  }

  return (
    <MyRewardsTransactionsContext.Provider
      value={{
        githubUserId,
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
    </MyRewardsTransactionsContext.Provider>
  );
}

export function useMyRewardsTransactionsContext() {
  const context = useContext(MyRewardsTransactionsContext);

  if (!context) {
    throw new Error("MyRewardsTransactionsContext must be used inside a MyRewardsTransactionsContextProvider");
  }

  return context;
}
