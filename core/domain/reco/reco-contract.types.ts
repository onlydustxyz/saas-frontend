import { TailoredDiscoveriesInterface } from "@/core/domain/reco/models/tailored-discoveries-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { ProjectListItemInterfaceV2 } from "../project/models/project-list-item-model-v2";
import { MatchingQuestionsInterface } from "./models/matching-questions-model";

/* ------------------------------ Get Matching Questions ------------------------------ */

export type GetMatchingQuestionsResponse = components["schemas"]["MatchingQuestionsResponse"];

export type GetMatchingQuestionsModel = Omit<GetMatchingQuestionsResponse, "questions"> & {
  questions: MatchingQuestionsInterface[];
};

type GetMatchingQuestionsQueryParams = operations["getMatchingQuestions"]["parameters"]["query"];

export type GetMatchingQuestionsPortResponse = HttpStorageResponse<GetMatchingQuestionsModel>;

export type GetMatchingQuestionsPortParams = HttpClientParameters<{
  QueryParams: GetMatchingQuestionsQueryParams;
}>;

/* ------------------------------ Save Matching Questions ------------------------------ */

export type SaveMatchingQuestionsBody = components["schemas"]["SaveMatchingAnswersRequest"];

type SaveMatchingQuestionsPathParams = operations["saveMatchingQuestionAnswers"]["parameters"]["path"];

export type SaveMatchingQuestionsPortParams = HttpClientParameters<{
  PathParams: SaveMatchingQuestionsPathParams;
}>;

export type SaveMatchingQuestionsPortResponse = HttpStorageResponse;

/* ------------------------------ Get Recommended Projects ------------------------------ */

export type GetRecommendedProjectsResponse = components["schemas"]["RecommendedProjectsResponse"];

export type GetRecommendedProjectsModel = Omit<GetRecommendedProjectsResponse, "projects"> & {
  projects: ProjectListItemInterfaceV2[];
};

type GetRecommendedProjectsQueryParams = operations["getRecommendedProjects"]["parameters"]["query"];

export type GetRecommendedProjectsPortResponse = HttpStorageResponse<GetRecommendedProjectsModel>;

export type GetRecommendedProjectsPortParams = HttpClientParameters<{
  QueryParams: GetRecommendedProjectsQueryParams;
}>;

/* ------------------------------ Get Tailored Discoveries ------------------------------ */

export type GetTailoredDiscoveriesResponse = components["schemas"]["TailoredDiscoveriesResponse"];

export type GetTailoredDiscoveriesModel = TailoredDiscoveriesInterface;

export type GetTailoredDiscoveriesPortResponse = HttpStorageResponse<GetTailoredDiscoveriesModel>;

type GetTailoredDiscoveriesQueryParams = operations["getTailoredDiscoveries"]["parameters"]["query"];

export type GetTailoredDiscoveriesPortParams = HttpClientParameters<{
  QueryParams: GetTailoredDiscoveriesQueryParams;
}>;
