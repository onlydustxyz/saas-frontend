import { PropsWithChildren } from "react";

import { GetProjectsV2PortParams } from "@/core/domain/project/project-contract.types";
import { ProjectTagUnion } from "@/shared/constants/project-tags";

export type BrowseProjectsContextFilter = {
  tags: ProjectTagUnion[];
  languageSlugs: string[];
  ecosystemSlugs: string[];
  categorySlugs: string[];
};

export const DEFAULT_FILTER: BrowseProjectsContextFilter = {
  tags: [],
  languageSlugs: [],
  ecosystemSlugs: [],
  categorySlugs: [],
};

export type BrowseProjectsContextReturn = {
  filters: {
    values: BrowseProjectsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<BrowseProjectsContextFilter>) => void;
    clear: () => void;
    count: number;
  };
  queryParams: Partial<BrowseProjectsContextQueryParams>;
};

export interface BrowseProjectsContextProviderProps extends PropsWithChildren {}

export type BrowseProjectsContextQueryParams = Omit<GetProjectsV2PortParams["queryParams"], "pageIndex" | "pageSize">;
