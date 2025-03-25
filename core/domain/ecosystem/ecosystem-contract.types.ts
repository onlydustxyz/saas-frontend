import { EcosystemLink } from "@/core/domain/ecosystem/models/ecosystem-link-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { EcosystemContributorsInterface } from "./models/ecosystem-contributors-list-item-model";
import { EcosystemEventInterface } from "./models/ecosystem-event-model";
import { EcosystemsListItem } from "./models/ecosystem-list-item-model";
import { EcosystemInterface } from "./models/ecosystem-model";

/* --------------------------------- Search ecosystems -------------------------------- */

export type SearchEcosystemsResponse = components["schemas"]["EcosystemPage"];

export type SearchEcosystemsModel = Omit<SearchEcosystemsResponse, "ecosystems"> & {
  ecosystems: EcosystemLink[];
};

type SearchEcosystemsQueryParams = operations["getAllEcosystems"]["parameters"]["query"];
type SearchEcosystemsPathParams = operations["getAllEcosystems"]["parameters"]["path"];

export type SearchEcosystemsPortParams = HttpClientParameters<{
  QueryParams: SearchEcosystemsQueryParams;
  PathParams: SearchEcosystemsPathParams;
}>;

export type SearchEcosystemsPortResponse = HttpStorageResponse<SearchEcosystemsModel>;

/* --------------------------------- Get Ecosystems -------------------------------- */

export type GetEcosystemsResponse = components["schemas"]["EcosystemPageV3"];

export type GetEcosystemsModel = Omit<GetEcosystemsResponse, "ecosystems"> & {
  ecosystems: EcosystemsListItem[];
};

type GetEcosystemsQueryParams = operations["getEcosystemsV3"]["parameters"]["query"];

export type GetEcosystemsPortResponse = HttpStorageResponse<GetEcosystemsModel>;

export type GetEcosystemsPortParams = HttpClientParameters<{ QueryParams: GetEcosystemsQueryParams }>;

/* --------------------------------- Get ecosystem by slug -------------------------------- */

export type GetEcosystemBySlugResponse = components["schemas"]["EcosystemResponseV2"];

type GetEcosystemBySlugPathParams = operations["getEcosystemV2"]["parameters"]["path"];

export type GetEcosystemBySlugPortResponse = HttpStorageResponse<EcosystemInterface>;

export type GetEcosystemBySlugPortParams = HttpClientParameters<{
  PathParams: GetEcosystemBySlugPathParams;
}>;

/* ------------------------------ Get Ecosystem Contributors ------------------------------ */

export type GetEcosystemContributorsResponse = components["schemas"]["ContributorsPageResponseV2"];

export type GetEcosystemContributorsModel = Omit<GetEcosystemContributorsResponse, "contributors"> & {
  contributors: EcosystemContributorsInterface[];
};

export type GetEcosystemContributorsQueryParams = operations["getEcosystemContributorsV2"]["parameters"]["query"];
type GetEcosystemContributorsPathParams = operations["getEcosystemContributorsV2"]["parameters"]["path"];

export type GetEcosystemContributorsPortResponse = HttpStorageResponse<GetEcosystemContributorsModel>;

export type GetEcosystemContributorsPortParams = HttpClientParameters<{
  QueryParams: GetEcosystemContributorsQueryParams;
  PathParams: GetEcosystemContributorsPathParams;
}>;

/* ------------------------------ Get Ecosystem Events ------------------------------ */

export type GetEcosystemEventsResponse = components["schemas"]["EcosystemEventsListResponse"];
export type GetEcosystemEventsModel = Omit<GetEcosystemEventsResponse, "events"> & {
  events: EcosystemEventInterface[];
};

type GetEcosystemEventsPathParams = operations["getEcosystemEvents"]["parameters"]["path"];
type GetEcosystemEventsQueryParams = operations["getEcosystemEvents"]["parameters"]["query"];

export type GetEcosystemEventsPortResponse = HttpStorageResponse<GetEcosystemEventsModel>;

export type GetEcosystemEventsPortParams = HttpClientParameters<{
  PathParams: GetEcosystemEventsPathParams;
  QueryParams: GetEcosystemEventsQueryParams;
}>;
