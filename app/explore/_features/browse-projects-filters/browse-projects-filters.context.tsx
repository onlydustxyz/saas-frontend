import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

export type BrowseProjectsFilter = {
  languageIds: string[];
  ecosystemIds: string[];
  categories: { value: string; label: string }[];
};

export const DEFAULT_FILTER: BrowseProjectsFilter = {
  languageIds: [],
  ecosystemIds: [],
  categories: [],
};

type BrowseProjectsContextReturn = {
  filters: {
    values: BrowseProjectsFilter;
    isCleared: boolean;
    set: (filter: Partial<BrowseProjectsFilter>) => void;
    clear: () => void;
    count: number;
  };
  queryParams: Partial<BrowseProjectsFilter>;
  isLoading: boolean;
};

const BrowseProjectsContext = createContext<BrowseProjectsContextReturn>({
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
  },
  queryParams: {},
  isLoading: false,
});

type BrowseProjectsContextProviderProps = {
  children: React.ReactNode;
};

export function BrowseProjectsContextProvider({ children }: BrowseProjectsContextProviderProps) {
  const [filters, setFilters] = useState<BrowseProjectsFilter>(DEFAULT_FILTER);
  const [queryParams, setQueryParams] = useState<Partial<BrowseProjectsFilter>>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<Partial<BrowseProjectsFilter>>(queryParams);

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  useEffect(() => {
    setQueryParams({
      languageIds: filters.languageIds.length ? filters.languageIds : undefined,
      ecosystemIds: filters.ecosystemIds.length ? filters.ecosystemIds : undefined,
      categories: filters.categories.length ? filters.categories : undefined,
    });
  }, [filters]);

  const isCleared = useMemo(() => JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.languageIds.length + filters.ecosystemIds.length;
  }, [filters]);

  function setFilter(filter: Partial<BrowseProjectsFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
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
        isLoading: false, // You can connect this to your actual data fetching logic
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
