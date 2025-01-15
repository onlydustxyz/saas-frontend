import { PropsWithChildren } from "react";

import { GetProjectsV2PortParams } from "@/core/domain/project/project-contract.types";

import { ProjectTagUnion } from "@/shared/constants/project-tags";

export type EcosystemsContextFilter = {
  tags: ProjectTagUnion[];
  languageIds: string[];
  ecosystemIds: string[];
  categoryIds: string[];
};

export const DEFAULT_FILTER: EcosystemsContextFilter = {
  tags: [],
  languageIds: [],
  ecosystemIds: [],
  categoryIds: [],
};

export type EcosystemsContextReturn = {
  filters: {
    values: EcosystemsContextFilter;
    isCleared: boolean;
    set: (filter: Partial<EcosystemsContextFilter>) => void;
    clear: () => void;
    count: number;
  };
  queryParams: Partial<EcosystemsContextQueryParams>;
};

export interface EcosystemsContextProviderProps extends PropsWithChildren {}

export type EcosystemsContextQueryParams = Omit<GetProjectsV2PortParams["queryParams"], "pageIndex" | "pageSize">;
