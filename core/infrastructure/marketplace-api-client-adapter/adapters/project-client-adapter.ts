import { ProjectAvailableIssues } from "@/core/domain/project/models/project-available-issues-model";
import { ProjectContributorLabels } from "@/core/domain/project/models/project-contributor-labels-model";
import { ProjectContributorsV2 } from "@/core/domain/project/models/project-contributors-model-v2";
import { ProjectFinancial } from "@/core/domain/project/models/project-financial-model";
import { ProjectLinkWithDescription } from "@/core/domain/project/models/project-link-with-description-model";
import { ProjectListItem } from "@/core/domain/project/models/project-list-item-model";
import { ProjectListItemV2 } from "@/core/domain/project/models/project-list-item-model-v2";
import { Project } from "@/core/domain/project/models/project-model";
import { ProjectV2 } from "@/core/domain/project/models/project-model-v2";
import { ProjectProgramListItem } from "@/core/domain/project/models/project-program-list-item";
import { ProjectRewardsV2 } from "@/core/domain/project/models/project-rewards-model-v2";
import { ProjectStats } from "@/core/domain/project/models/project-stats-model";
import { ProjectTransaction } from "@/core/domain/project/models/project-transaction-model";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import {
  EditProjectBody,
  GetProjectAvailableIssuesResponse,
  GetProjectByIdResponse,
  GetProjectBySlugOrIdV2Response,
  GetProjectBySlugResponse,
  GetProjectContributorLabelsResponse,
  GetProjectContributorsV2Response,
  GetProjectFinancialDetailsByIdResponse,
  GetProjectFinancialDetailsBySlugResponse,
  GetProjectProgramsResponse,
  GetProjectRewardsV2Response,
  GetProjectStatsResponse,
  GetProjectTransactionsResponse,
  GetProjectsV2Response,
  GetSimilarProjectsResponse,
  UngrantFundsFromProjectBody,
  UpdateProjectContributorLabelsBody,
  UploadProjectLogoResponse,
} from "@/core/domain/project/project-contract.types";
import { GetProjectsResponse } from "@/core/domain/project/project-contract.types";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectById: "projects/:projectId",
    getProjectStats: "projects/:projectId/stats",
    getProjects: "projects",
    editProject: "projects/:projectId",
    uploadProjectLogo: "projects/logos",
    getProjectFinancialDetailsBySlug: "projects/slug/:projectSlug/financial",
    getProjectFinancialDetailsById: "projects/:projectId/financial",
    getProjectTransactions: "projects/:projectIdOrSlug/transactions",
    getProjectTransactionsCsv: "projects/:projectIdOrSlug/transactions",
    getProjectBySlug: "projects/slug/:slug",
    getProjectContributorLabels: "projects/:projectIdOrSlug/contributor-labels",
    updateProjectContributorLabels: "projects/:projectId/contributors",
    unassignContributorFromProjectContribution:
      "projects/:projectId/contributions/:contributionUuid/unassign/:contributorId",
    getProjectPrograms: "projects/:projectId/programs",
    ungrantProject: "projects/:projectId/ungrant",
    getProjectBySlugOrIdV2: "projects/:projectIdOrSlug",
    getProjectAvailableIssues: "projects/:projectIdOrSlug/available-issues",
    getProjectContributorsV2: "projects/:projectIdOrSlug/contributors",
    getProjectRewardsV2: "projects/:projectIdOrSlug/rewards",
    getSimilarProjects: "projects/:projectIdOrSlug/similar-projects",
  } as const;

  getProjectById = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectById"]>) => {
    const path = this.routes["getProjectById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectByIdResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new Project(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectStats = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectStats"]>) => {
    const path = this.routes["getProjectStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectStatsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new ProjectStats(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjects = ({ queryParams }: FirstParameter<ProjectStoragePort["getProjects"]>) => {
    const path = this.routes["getProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ProjectListItem(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  uploadProjectLogo = () => {
    const path = this.routes["uploadProjectLogo"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: File) =>
      this.client.request<UploadProjectLogoResponse>({
        path,
        method,
        tag,
        body,
        headers: {
          "Content-Type": body.type,
        },
      });

    return {
      request,
      tag,
    };
  };

  editProject = ({ pathParams }: FirstParameter<ProjectStoragePort["editProject"]>) => {
    const path = this.routes["editProject"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: EditProjectBody) =>
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

  getProjectFinancialDetailsBySlug = ({
    pathParams,
  }: FirstParameter<ProjectStoragePort["getProjectFinancialDetailsBySlug"]>) => {
    const path = this.routes["getProjectFinancialDetailsBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectFinancialDetailsBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new ProjectFinancial(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectFinancialDetailsById = ({
    pathParams,
  }: FirstParameter<ProjectStoragePort["getProjectFinancialDetailsById"]>) => {
    const path = this.routes["getProjectFinancialDetailsById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectFinancialDetailsByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new ProjectFinancial(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectTransactions = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectTransactions"]>) => {
    const path = this.routes["getProjectTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectTransactionsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        transactions: data.transactions.map(transaction => new ProjectTransaction(transaction)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProjectTransactionsCsv = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectTransactionsCsv"]>) => {
    const path = this.routes["getProjectTransactionsCsv"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () =>
      this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          accept: "text/csv",
        },
      });

    return {
      request,
      tag,
    };
  };

  getProjectBySlug = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getProjectBySlug"]>) => {
    const path = this.routes["getProjectBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new Project(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectContributorLabels = ({
    queryParams,
    pathParams,
  }: FirstParameter<ProjectStoragePort["getProjectContributorLabels"]>) => {
    const path = this.routes["getProjectContributorLabels"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectContributorLabelsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        labels: data.labels.map(label => new ProjectContributorLabels(label)),
      };
    };

    return {
      request,
      tag,
    };
  };

  updateProjectContributorLabels = ({
    pathParams,
  }: FirstParameter<ProjectStoragePort["updateProjectContributorLabels"]>) => {
    const path = this.routes["updateProjectContributorLabels"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: UpdateProjectContributorLabelsBody) =>
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

  unassignContributorFromProjectContribution = ({
    pathParams,
  }: FirstParameter<ProjectStoragePort["unassignContributorFromProjectContribution"]>) => {
    const path = this.routes["unassignContributorFromProjectContribution"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () =>
      this.client.request<never>({
        path,
        version: MarketplaceApiVersion.v2,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  getProjectPrograms = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectPrograms"]>) => {
    const path = this.routes["getProjectPrograms"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectProgramsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        programs: data.programs.map(program => new ProjectProgramListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };

  ungrantProject = ({ pathParams }: FirstParameter<ProjectStoragePort["ungrantProject"]>) => {
    const path = this.routes["ungrantProject"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: UngrantFundsFromProjectBody) =>
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

  getProjectsV2 = ({ queryParams }: FirstParameter<ProjectStoragePort["getProjectsV2"]>) => {
    const path = this.routes["getProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectsV2Response>({
        path,
        method,
        tag,
        queryParams,
        version: MarketplaceApiVersion.v2,
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

  getProjectBySlugOrIdV2 = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectBySlugOrIdV2"]>) => {
    const path = this.routes["getProjectBySlugOrIdV2"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetProjectBySlugOrIdV2Response>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        version: MarketplaceApiVersion.v2,
      });

      return new ProjectV2(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectAvailableIssues = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectAvailableIssues"]>) => {
    const path = this.routes["getProjectAvailableIssues"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectAvailableIssuesResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        mock: true,
      });

      return {
        ...data,
        issues: data.issues.map(issue => new ProjectAvailableIssues(issue)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProjectContributorsV2 = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectContributorsV2"]>) => {
    const path = this.routes["getProjectContributorsV2"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetProjectContributorsV2Response>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        version: MarketplaceApiVersion.v2,
        mock: true,
      });

      return {
        ...data,
        contributors: data.contributors.map(contributor => new ProjectContributorsV2(contributor)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProjectRewardsV2 = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getProjectRewardsV2"]>) => {
    const path = this.routes["getProjectRewardsV2"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetProjectRewardsV2Response>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        version: MarketplaceApiVersion.v2,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new ProjectRewardsV2(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getSimilarProjects = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getSimilarProjects"]>) => {
    const path = this.routes["getSimilarProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetSimilarProjectsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ProjectLinkWithDescription(project)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
