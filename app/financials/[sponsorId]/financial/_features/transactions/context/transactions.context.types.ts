import { PropsWithChildren } from "react";

import { GetBiStatsFinancialsPortParams, GetBiStatsFinancialsResponse } from "@/core/domain/bi/bi-contract.types";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { SortDirection } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";

export interface TransactionsContextProps extends PropsWithChildren {
  sponsorId: string;
}

export type TransactionsContextQueryParams = GetBiStatsFinancialsPortParams["queryParams"];

export interface TransactionsContextReturn {
  sponsorId: string;
  monthlyTransactions?: GetBiStatsFinancialsResponse;
  queryParams: TransactionsContextQueryParams;
  isLoadingTransactions: boolean;
  filters: {
    values: TransactionsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<TransactionsContextFilter>) => void;
    clear: () => void;
    count: number;
    options: TransactionsContextFiltersOptions;
  };
}

export enum TransactionsContextFilterType {
  DEPOSITED = "DEPOSITED",
  ALLOCATED = "ALLOCATED",
  UNALLOCATED = "UNALLOCATED",
}

export type TransactionsContextFilterTypes = `${TransactionsContextFilterType}`;

export interface TransactionsContextFilter {
  search: string;
  types: TransactionsContextFilterTypes[];
  sortDirection: SortDirection;
  dateRange?: DateRangePickerValue;
}

export interface TransactionsContextFiltersOptions {
  types: TransactionsContextFilterTypes[];
}

export const DEFAULT_FILTER: TransactionsContextFilter = {
  search: "",
  types: [],
  sortDirection: SortDirection.DESC,
  dateRange: undefined,
};
