"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";
import { SearchItemInterface } from "@/core/domain/search/models/search-item-model";
import { SearchModel, SearchRessourceType } from "@/core/domain/search/search-contract.types";

interface Filters {
  type?: SearchRessourceType;
  languages?: string[];
  ecosystems?: string[];
  categories?: string[];
}

interface GlobalSearchContextInterface {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  inputValue: string | null;
  onInputChange: (value: string) => void;
  suggestion?: string;
  isOpenFilter: boolean;
  onOpenFilterChange: (value: boolean) => void;
  onClearAllFilters: () => void;
  filters: Filters;
  onFiltersChange: (value: Filters) => void;
  onFiltersTypeChange: (value?: SearchRessourceType) => void;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  results: SearchItemInterface[];
  projectFacets: SearchModel["projectFacets"];
  typeFacets: SearchModel["typeFacets"];
}

export const GlobalSearchContext = createContext<GlobalSearchContextInterface>({
  isOpen: false,
  onOpenChange: () => {},
  inputValue: "",
  onInputChange: () => {},
  suggestion: "",
  isOpenFilter: false,
  onOpenFilterChange: () => {},
  onClearAllFilters: () => {},
  filters: {},
  onFiltersChange: () => {},
  onFiltersTypeChange: () => {},
  hasNextPage: false,
  fetchNextPage: () => {},
  isFetchingNextPage: false,
  results: [],
  projectFacets: {
    ecosystems: [],
    categories: [],
    languages: [],
  },
  typeFacets: {
    types: [],
  },
});

export function GlobalSearchProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [debouncedOpen, setDebouncedOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  useDebounce(
    () => {
      setDebouncedOpen(open);
    },
    300,
    [open]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = SearchReactQueryAdapter.client.useSearch({
    queryParams: {
      keyword: inputValue ?? undefined,
      languages: filters.languages,
      ecosystems: filters.ecosystems,
      categories: filters.categories,
      type: filters.type,
    },
    options: {
      enabled: debouncedOpen,
    },
  });

  const { data: Suggestion } = SearchReactQueryAdapter.client.useSuggest({
    queryParams: {
      keyword: inputValue ?? "",
      languages: filters.languages,
      ecosystems: filters.ecosystems,
      categories: filters.categories,
    },
    options: {
      enabled: debouncedOpen,
    },
  });

  function onOpenChange(v: boolean) {
    if (!v) {
      setFilters({});
      setInputValue(null);
      setOpen(false);
    } else {
      setOpen(true);
      setDebouncedOpen(true);
    }
  }

  function onInputChange(v: string) {
    setInputValue(v);
  }

  function onOpenFilterChange(v: boolean) {
    setOpenFilter(v);
  }

  function onClearAllFilters() {
    setFilters({});
    setOpenFilter(false);
  }

  function onFiltersChange(value: Filters) {
    setFilters(value);
  }

  function onFiltersTypeChange(value?: SearchRessourceType) {
    if (value) {
      setFilters({ type: value });
    } else {
      setFilters({});
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
      if (e.key === "Tab" && Suggestion?.value) {
        e.preventDefault();
        setInputValue(Suggestion.value);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [Suggestion, open]);

  const projectFacets: SearchModel["projectFacets"] = useMemo(() => {
    return {
      ecosystems: data?.pages.flatMap(page => page.projectFacets?.ecosystems ?? []),
      categories: data?.pages.flatMap(page => page.projectFacets?.categories ?? []),
      languages: data?.pages.flatMap(page => page.projectFacets?.languages ?? []),
    };
  }, [data]);

  const typeFacets: SearchModel["typeFacets"] = useMemo(() => {
    return {
      types: data?.pages.flatMap(page => page.typeFacets?.types ?? []),
    };
  }, [data]);

  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen: open,
        onOpenChange,
        inputValue,
        onInputChange,
        suggestion: Suggestion?.value,
        isOpenFilter: openFilter,
        onOpenFilterChange,
        onClearAllFilters,
        filters,
        onFiltersChange,
        onFiltersTypeChange,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        results: data?.pages.flatMap(page => page.results) ?? [],
        projectFacets,
        typeFacets,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}
