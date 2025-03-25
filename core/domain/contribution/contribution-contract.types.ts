import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionEvent } from "@/core/domain/contribution/models/contribution-event-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Contributions ------------------------------ */

export type GetContributionsResponse = components["schemas"]["ContributionActivityPageResponse"];
export type GetContributionsModel = Omit<GetContributionsResponse, "contributions"> & {
  contributions: ContributionActivityInterface[];
};

export type GetContributionsQueryParams = operations["getContributions"]["parameters"]["query"]["queryParams"];

export type GetContributionsPortResponse = HttpStorageResponse<GetContributionsModel>;

export type GetContributionsPortParams = HttpClientParameters<{ QueryParams: GetContributionsQueryParams }>;

/* ------------------------------ Get Contributions By Id ------------------------------ */

export type GetContributionByIdResponse = components["schemas"]["ContributionActivityPageItemResponse"];
type GetContributionByIdModel = ContributionActivityInterface;

type GetContributionByIdPathParams = operations["getContributionById"]["parameters"]["path"];

export type GetContributionByIdPortResponse = HttpStorageResponse<GetContributionByIdModel>;

export type GetContributionByIdPortParams = HttpClientParameters<{
  PathParams: GetContributionByIdPathParams;
}>;

/* ------------------------------ Get Contributions events ------------------------------ */

export type GetContributionEventsResponse = components["schemas"]["ContributionEventListResponse"];
type GetContributionEventsModel = ContributionEvent[];

type GetContributionEventsQueryParams = operations["getContributionEvents"]["parameters"]["query"];
type GetContributionEventsPathParams = operations["getContributionEvents"]["parameters"]["path"];

export type GetContributionEventsPortResponse = HttpStorageResponse<GetContributionEventsModel>;

export type GetContributionEventsPortParams = HttpClientParameters<{
  QueryParams: GetContributionEventsQueryParams;
  PathParams: GetContributionEventsPathParams;
}>;
