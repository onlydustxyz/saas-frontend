import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";
import { IssueInterface } from "@/core/domain/issue/models/issue-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Issue ------------------------------ */

export type GetIssueResponse = components["schemas"]["GithubIssueResponse"];

export type GetIssueModel = IssueInterface;

export type GetIssuePortResponse = HttpStorageResponse<GetIssueModel>;

export type GetIssuePathParams = operations["getIssue"]["parameters"]["path"];

export type GetIssuePortParams = HttpClientParameters<{
  PathParams: GetIssuePathParams;
}>;

/* ---------------------------- Get Issue Applicants --------------------------- */

export type GetIssueApplicantsResponse = components["schemas"]["IssueApplicantsPageResponse"];

export type GetIssueApplicantsModel = Omit<GetIssueApplicantsResponse, "applicants"> & {
  applicants: IssueApplicantInterface[];
};

export type GetIssueApplicantsPortResponse = HttpStorageResponse<GetIssueApplicantsModel>;

export type GetIssueApplicantsPathParams = operations["getIssue"]["parameters"]["path"];
export type GetIssueApplicantsQueryParams = operations["getIssue"]["parameters"]["query"];

export type GetIssueApplicantsPortParams = HttpClientParameters<{
  PathParams: GetIssueApplicantsPathParams;
  QueryParams: GetIssueApplicantsQueryParams;
}>;