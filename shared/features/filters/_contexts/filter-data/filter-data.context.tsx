"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { FilterDataContextInterface, FilterDataProviderProps } from "./filter-data.types";

const FilterDataContext = createContext<FilterDataContextInterface<AnyType>>({
  filters: {},
  filterCount: 0,
  setFilters: () => {},
  saveFilters: () => {},
  resetFilters: () => {},
});

export function FilterDataProvider<F extends object>({ children, filters, setFilters }: FilterDataProviderProps<F>) {
  const [localFilters, setLocalFilters] = useState<F>(filters);

  const validationKernelPort = bootstrap.getValidationKernelPort();
  const filterCount = Object.values(filters)?.filter(value => !validationKernelPort.isInvalidValue(value)).length;

  function handleUpdateFilters(newFilters: F) {
    setLocalFilters({
      ...localFilters,
      ...newFilters,
    });
  }

  function handleSave() {
    setFilters(localFilters);
  }

  function handleReset() {
    setLocalFilters({} as F);
    setFilters({} as F);
  }

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <FilterDataContext.Provider
      value={{
        filters: localFilters,
        filterCount,
        setFilters: handleUpdateFilters,
        saveFilters: handleSave,
        resetFilters: handleReset,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}

export function useFilterData<F extends object>() {
  const context = useContext<FilterDataContextInterface<F>>(FilterDataContext);

  if (context === undefined) {
    throw new Error("useFilterData must be used within an FilterDataProvider");
  }

  return context;
}
