"use client";

import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";
import { SearchBody, SearchDto } from "@/core/domain/search/dto/search-dto";
import { SearchItemInterface } from "@/core/domain/search/models/search-item-model";
import { SearchFacet, SearchRessourceType } from "@/core/domain/search/models/search.types";
import { SearchModel } from "@/core/domain/search/search-contract.types";

// Define types for filters and context
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
  fetchNextPage?: () => void;
  isFetchingNextPage: boolean;
  results: Record<SearchRessourceType, SearchItemInterface[] | undefined>;
  projectFacets: SearchModel["projectFacets"];
  typeFacets: SearchModel["typeFacets"];
  getTypeFacetCount: (type: SearchRessourceType) => number;
}

// Initialize context with default values
const GlobalSearchContext = createContext<GlobalSearchContextInterface>({
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
  getTypeFacetCount: () => 0,
  results: {
    [SearchRessourceType.PROJECT]: [],
    [SearchRessourceType.CONTRIBUTOR]: [],
  },
  projectFacets: {
    ecosystems: [],
    categories: [],
    languages: [],
  },
  typeFacets: {
    types: [],
  },
});

export function escapeSearchQuery(query: string): string {
  // List of special characters to escape
  const specialChars = /[.*+?^${}()|[\]\\]/g;

  // Replace special characters with their escaped versions
  return query.replace(specialChars, "\\$&");
}

function useSearchRequest(queryParams: SearchBody, type: SearchRessourceType, enabled: boolean) {
  return SearchReactQueryAdapter.client.useSearch({
    queryParams: {
      ...queryParams,
      pageSize: 5,
      type,
    },
    options: {
      enabled,
    },
  });
}

interface UseData {
  results: Record<SearchRessourceType, UseInfiniteQueryResult<InfiniteData<SearchModel, unknown>, Error>>;
  type?: SearchRessourceType;
}

interface UseDataReturn {
  results: Record<
    SearchRessourceType,
    UseInfiniteQueryResult<InfiniteData<SearchModel, unknown>, Error>["data"] | undefined
  >;
  fetchNextPage?: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

function useData({ results, type }: UseData): UseDataReturn {
  if (!type) {
    return {
      results: {
        [SearchRessourceType.PROJECT]: results[SearchRessourceType.PROJECT]?.data,
        [SearchRessourceType.CONTRIBUTOR]: results[SearchRessourceType.CONTRIBUTOR]?.data,
      },
      fetchNextPage: undefined,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }

  if (type === SearchRessourceType.PROJECT) {
    const projectResult = results[SearchRessourceType.PROJECT];
    return {
      results: {
        [SearchRessourceType.PROJECT]: projectResult?.data,
        [SearchRessourceType.CONTRIBUTOR]: undefined,
      },
      fetchNextPage: projectResult?.fetchNextPage,
      hasNextPage: projectResult?.hasNextPage ?? false,
      isFetchingNextPage: projectResult?.isFetchingNextPage ?? false,
    };
  }

  if (type === SearchRessourceType.CONTRIBUTOR) {
    const contributorResult = results[SearchRessourceType.CONTRIBUTOR];
    return {
      results: {
        [SearchRessourceType.PROJECT]: undefined,
        [SearchRessourceType.CONTRIBUTOR]: contributorResult?.data,
      },
      fetchNextPage: contributorResult?.fetchNextPage,
      hasNextPage: contributorResult?.hasNextPage ?? false,
      isFetchingNextPage: contributorResult?.isFetchingNextPage ?? false,
    };
  }

  return {
    results: {
      [SearchRessourceType.PROJECT]: undefined,
      [SearchRessourceType.CONTRIBUTOR]: undefined,
    },
    fetchNextPage: undefined,
    hasNextPage: false,
    isFetchingNextPage: false,
  };
}

export function GlobalSearchProvider({ children }: PropsWithChildren) {
  // State management
  const [open, setOpen] = useState(false);
  const [debouncedOpen, setDebouncedOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  // Debounce the search modal open state
  useDebounce(
    () => {
      setDebouncedOpen(open);
    },
    300,
    [open]
  );

  const queryParams = useMemo(
    () =>
      new SearchDto({
        keyword: inputValue ? escapeSearchQuery(inputValue) : "",
        languages: filters.languages,
        ecosystems: filters.ecosystems,
        categories: filters.categories,
        type: filters.type,
      }).toBody(),
    [inputValue, filters]
  );

  const contributionData = useSearchRequest(
    queryParams,
    SearchRessourceType.CONTRIBUTOR,
    debouncedOpen && filters.type !== SearchRessourceType.PROJECT
  );

  const projectData = useSearchRequest(
    queryParams,
    SearchRessourceType.PROJECT,
    debouncedOpen && filters.type !== SearchRessourceType.CONTRIBUTOR
  );

  const { results, fetchNextPage, hasNextPage, isFetchingNextPage } = useData({
    results: {
      [SearchRessourceType.PROJECT]: projectData,
      [SearchRessourceType.CONTRIBUTOR]: contributionData,
    },
    type: filters.type,
  });

  const { data: Suggestion } = SearchReactQueryAdapter.client.useSuggest({
    queryParams,
    options: {
      enabled: debouncedOpen,
    },
  });

  // Helper functions for facet handling
  const mergeFacetsWithFilters = (facets: SearchFacet[], filters: string[] = []): SearchFacet[] => {
    const result = [...facets];
    filters.forEach(filter => {
      if (!result.find(f => f.name === filter)) {
        result.push({ name: filter, count: 0 });
      }
    });

    return result;
  };

  const extractFacetsFromPages = (accessor: (page: SearchModel) => SearchFacet[] | undefined): SearchFacet[] => {
    if (!filters.type || filters.type === SearchRessourceType.PROJECT) {
      const result = results[SearchRessourceType.PROJECT]?.pages ?? [];
      return result.flatMap(page => accessor(page) ?? []);
    }

    return [];
  };

  // Memoized facets
  const projectFacets: SearchModel["projectFacets"] = useMemo(() => {
    const ecosystems = extractFacetsFromPages(page => page.projectFacets?.ecosystems);
    const categories = extractFacetsFromPages(page => page.projectFacets?.categories);
    const languages = extractFacetsFromPages(page => page.projectFacets?.languages);

    return {
      ecosystems: mergeFacetsWithFilters(ecosystems, filters.ecosystems),
      categories: mergeFacetsWithFilters(categories, filters.categories),
      languages: mergeFacetsWithFilters(languages, filters.languages),
    };
  }, [results]);

  const typeFacets: SearchModel["typeFacets"] = useMemo(() => {
    const contributorTypeFacets = results[SearchRessourceType.CONTRIBUTOR]?.pages ?? [];
    const projectTypeFacets = results[SearchRessourceType.PROJECT]?.pages ?? [];
    const contributor = contributorTypeFacets
      .flatMap(page => page.typeFacets?.types)
      .filter(f => f?.name === "Contributors");

    const project = projectTypeFacets.flatMap(page => page.typeFacets?.types).filter(f => f?.name === "Projects");

    return {
      types: [
        {
          name: "Contributors",
          count: contributor[0]?.count ?? 0,
        },
        {
          name: "Projects",
          count: project[0]?.count ?? 0,
        },
      ],
    };
  }, [results]);

  function getTypeFacetCount(type: SearchRessourceType) {
    if (type === SearchRessourceType.CONTRIBUTOR) {
      const contributorTypeFacets = results[SearchRessourceType.CONTRIBUTOR]?.pages ?? [];
      const contributor = contributorTypeFacets
        .flatMap(page => page.typeFacets?.types)
        .filter(f => f?.name === "Contributors");

      return contributor[0]?.count ?? 0;
    }

    if (type === SearchRessourceType.PROJECT) {
      const projectTypeFacets = results[SearchRessourceType.PROJECT]?.pages ?? [];
      const project = projectTypeFacets.flatMap(page => page.typeFacets?.types).filter(f => f?.name === "Projects");

      return project[0]?.count ?? 0;
    }

    return 0;
  }

  // Event handlers
  function onOpenChange(v: boolean) {
    if (!v) {
      setFilters({});
      setInputValue(null);
      setOpen(false);
      setOpenFilter(false);
    } else {
      setOpen(true);
      setDebouncedOpen(true);
    }
  }

  function onInputChange(v: string) {
    if (!v) {
      setFilters({});
      setOpenFilter(false);
    }
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

  // Keyboard event handlers
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

  // Render provider
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
        getTypeFacetCount,
        results: {
          [SearchRessourceType.PROJECT]:
            results[SearchRessourceType.PROJECT]?.pages.flatMap(page => page.results) ?? [],
          [SearchRessourceType.CONTRIBUTOR]:
            results[SearchRessourceType.CONTRIBUTOR]?.pages.flatMap(page => page.results) ?? [],
        },
        projectFacets,
        typeFacets,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

// Hook for consuming the context
export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}
