import { SponsorProgramsListItem } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";
import { SponsorTransactionListItemInterface } from "@/core/domain/sponsor/models/sponsor-transaction-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetSponsorResponse = components["schemas"]["SponsorResponse"];

export type GetSponsorPortResponse = HttpStorageResponse<GetSponsorResponse>;

type GetSponsorPathParams = operations["getSponsor"]["parameters"]["path"];
export type GetSponsorPortParams = HttpClientParameters<{
  PathParams: GetSponsorPathParams;
}>;

/* --------------------- Get Sponsor Programs --------------------- */

export type GetSponsorProgramsResponse = components["schemas"]["SponsorProgramPageResponse"];
export type GetSponsorProgramsModel = Omit<GetSponsorProgramsResponse, "programs"> & {
  programs: SponsorProgramsListItem[];
};

export type GetSponsorProgramsPortResponse = HttpStorageResponse<GetSponsorProgramsResponse>;

type GetSponsorProgramsPathParams = operations["getSponsorPrograms"]["parameters"]["path"];
type GetSponsorProgramsQueryParams = operations["getSponsorPrograms"]["parameters"]["query"];
export type GetSponsorProgramsPortParams = HttpClientParameters<{
  PathParams: GetSponsorProgramsPathParams;
  QueryParams: GetSponsorProgramsQueryParams;
}>;

/* ------------------------ Get Sponsor Transactions ------------------------ */
export type GetSponsorTransactionsResponse = components["schemas"]["SponsorTransactionPageResponse"];
export type GetSponsorTransactionsModel = Omit<GetSponsorTransactionsResponse, "transactions"> & {
  transactions: SponsorTransactionListItemInterface[];
};

type GetSponsorTransactionsQueryParams = operations["getSponsorTransactions_1"]["parameters"]["query"];

type GetSponsorTransactionsPathParams = operations["getSponsorTransactions_1"]["parameters"]["path"];

export type GetSponsorTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetSponsorTransactionsQueryParams;
  PathParams: GetSponsorTransactionsPathParams;
}>;

export type GetSponsorTransactionsPortResponse = HttpStorageResponse<GetSponsorTransactionsModel>;

/* ---------------------- Get Sponsor Transactions CSV ---------------------- */
export type GetSponsorTransactionsCsvPortResponse = HttpStorageResponse<Blob>;

/* --------------------- Create Sponsor Program --------------------- */

export type CreateSponsorProgramBody = components["schemas"]["CreateProgramRequest"];

type CreateSponsorProgramPathParams = operations["createProgram"]["parameters"]["path"];

export type CreateSponsorProgramPortParams = HttpClientParameters<{ PathParams: CreateSponsorProgramPathParams }>;

export type CreateSponsorProgramPortResponse = HttpStorageResponse;

/* ---------------------- Allocate Budget To Program ---------------------- */

export type AllocateBudgetToProgramBody = components["schemas"]["AllocateRequest"];

type AllocateBudgetToProgramPathParams = operations["allocateBudgetToProgram"]["parameters"]["path"];

export type AllocateBudgetToProgramPortParams = HttpClientParameters<{
  PathParams: AllocateBudgetToProgramPathParams;
}>;

export type AllocateBudgetToProgramPortResponse = HttpStorageResponse<never, AllocateBudgetToProgramBody>;
