import { ProjectListItemV2 } from "@/core/domain/project/models/project-list-item-model-v2";
import { MatchingQuestions } from "@/core/domain/reco/models/matching-questions-model";
import { TailoredDiscoveries } from "@/core/domain/reco/models/tailored-discoveries-model";
import { RecoStoragePort } from "@/core/domain/reco/output/reco-storage-port";
import {
  GetMatchingQuestionsResponse,
  GetRecommendedProjectsResponse,
  GetTailoredDiscoveriesResponse,
  SaveMatchingQuestionsBody,
} from "@/core/domain/reco/reco-contract.types";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class RecoClientAdapter implements RecoStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getMatchingQuestions: "me/reco/projects/matching-questions",
    saveMatchingQuestions: "me/reco/projects/matching-questions/:questionId/answers",
    getRecommendedProjects: "me/reco/projects",
    getTailoredDiscoveries: "me/reco/discoveries",
  } as const;

  getMatchingQuestions = ({ queryParams }: FirstParameter<RecoStoragePort["getMatchingQuestions"]>) => {
    const path = this.routes["getMatchingQuestions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetMatchingQuestionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        questions: data.questions.map(question => new MatchingQuestions(question)),
      };
    };

    return {
      request,
      tag,
    };
  };

  saveMatchingQuestions = ({ pathParams }: FirstParameter<RecoStoragePort["saveMatchingQuestions"]>) => {
    const path = this.routes["saveMatchingQuestions"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: SaveMatchingQuestionsBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getRecommendedProjects = ({ queryParams }: FirstParameter<RecoStoragePort["getRecommendedProjects"]>) => {
    const path = this.routes["getRecommendedProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetRecommendedProjectsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ProjectListItemV2(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getTailoredDiscoveries = ({ queryParams }: FirstParameter<RecoStoragePort["getTailoredDiscoveries"]>) => {
    const path = this.routes["getTailoredDiscoveries"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetTailoredDiscoveriesResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return new TailoredDiscoveries(data);
    };

    return {
      request,
      tag,
    };
  };
}
