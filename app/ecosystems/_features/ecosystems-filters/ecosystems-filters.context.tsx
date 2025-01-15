import { createContext, useContext, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import {
  DEFAULT_FILTER,
  EcosystemsContextFilter,
  EcosystemsContextProviderProps,
  EcosystemsContextQueryParams,
  EcosystemsContextReturn,
} from "./ecosystems-filters.types";

const EcosystemsContext = createContext<EcosystemsContextReturn>({
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
  },
  queryParams: {},
});

export function EcosystemsContextProvider({ children }: EcosystemsContextProviderProps) {
  const [filters, setFilters] = useState<EcosystemsContextFilter>(DEFAULT_FILTER);
  const [queryParams, setQueryParams] = useState<EcosystemsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<EcosystemsContextQueryParams>(queryParams);

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const isCleared = useMemo(() => JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.languageIds.length + filters.ecosystemIds.length + filters.categoryIds.length;
  }, [filters]);

  function handleQueryParams(filters: EcosystemsContextFilter) {
    setQueryParams({
      tags: filters.tags.length ? filters.tags : undefined,
      languageIds: filters.languageIds.length ? filters.languageIds : undefined,
      ecosystemIds: filters.ecosystemIds.length ? filters.ecosystemIds : undefined,
      categoryIds: filters.categoryIds.length ? filters.categoryIds : undefined,
    });
  }

  function setFilter(filter: Partial<EcosystemsContextFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
    handleQueryParams(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
    handleQueryParams(DEFAULT_FILTER);
  }

  return (
    <EcosystemsContext.Provider
      value={{
        filters: {
          values: filters,
          isCleared,
          set: setFilter,
          clear: clearFilters,
          count: filtersCount,
        },
        queryParams: debouncedQueryParams,
      }}
    >
      {children}
    </EcosystemsContext.Provider>
  );
}

export function useEcosystemsContext() {
  const context = useContext(EcosystemsContext);

  if (!context) {
    throw new Error("EcosystemsContext must be used inside a EcosystemsContextProvider");
  }

  return context;
}
