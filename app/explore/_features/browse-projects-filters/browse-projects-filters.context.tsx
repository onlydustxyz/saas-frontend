import { createContext, useContext, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import {
  BrowseProjectsContextFilter,
  BrowseProjectsContextProviderProps,
  BrowseProjectsContextQueryParams,
  BrowseProjectsContextReturn,
  DEFAULT_FILTER,
} from "./browse-projects-filters.types";

const BrowseProjectsContext = createContext<BrowseProjectsContextReturn>({
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
  },
  queryParams: {},
});

export function BrowseProjectsContextProvider({ children }: BrowseProjectsContextProviderProps) {
  const [filters, setFilters] = useState<BrowseProjectsContextFilter>(DEFAULT_FILTER);
  const [queryParams, setQueryParams] = useState<BrowseProjectsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<BrowseProjectsContextQueryParams>(queryParams);

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const isCleared = useMemo(() => JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.languageSlugs.length + filters.ecosystemSlugs.length + filters.categorySlugs.length;
  }, [filters]);

  function handleQueryParams(filters: BrowseProjectsContextFilter) {
    setQueryParams({
      tags: filters.tags.length ? filters.tags : undefined,
      languageSlugs: filters.languageSlugs.length ? filters.languageSlugs : undefined,
      ecosystemSlugs: filters.ecosystemSlugs.length ? filters.ecosystemSlugs : undefined,
      categorySlugs: filters.categorySlugs.length ? filters.categorySlugs : undefined,
    });
  }

  function setFilter(filter: Partial<BrowseProjectsContextFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
    handleQueryParams(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
    handleQueryParams(DEFAULT_FILTER);
  }

  return (
    <BrowseProjectsContext.Provider
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
    </BrowseProjectsContext.Provider>
  );
}

export function useBrowseProjectsContext() {
  const context = useContext(BrowseProjectsContext);

  if (!context) {
    throw new Error("BrowseProjectsContext must be used inside a BrowseProjectsContextProvider");
  }

  return context;
}