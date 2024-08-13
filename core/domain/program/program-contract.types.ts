import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { TransactionListItemInterface } from "../transaction/models/transaction-list-item-model";

/* ------------------------------ Get Programs ------------------------------ */
export type GetProgramsResponse = components["schemas"]["ProgramPageResponse"];
export type GetProgramsModel = Omit<GetProgramsResponse, "programs"> & {
  programs: ProgramListItemInterface[];
};

type GetProgramsQueryParams = operations["getMyPrograms"]["parameters"]["query"];

export type GetProgramsPortResponse = HttpStorageResponse<GetProgramsModel>;

export type GetProgramsPortParams = HttpClientParameters<{
  QueryParams: GetProgramsQueryParams;
}>;

/* ------------------------------- Get Program ------------------------------ */
export type GetProgramResponse = components["schemas"]["ProgramResponse"];

export type GetProgramByIdPortResponse = HttpStorageResponse<GetProgramResponse>;

type GetProgramByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetProgramByIdPortParams = HttpClientParameters<{
  PathParams: GetProgramByIdPathParams;
}>;

/* ------------------------ Get Program Transactions ------------------------ */
export type GetTransactionsResponse = components["schemas"]["TransactionPageResponse"];
export type GetTransactionsModel = Omit<GetTransactionsResponse, "transactions"> & {
  transactions: TransactionListItemInterface[];
};

type GetTransactionsQueryParams = operations["getProgramTransactions"]["parameters"]["query"];

export type GetTransactionsPortResponse = HttpStorageResponse<GetTransactionsModel>;

export type GetTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetTransactionsQueryParams;
}>;

/* --------------------- Get Program Transactions Stats --------------------- */
export type ProgramTransactionsStatsResponse = components["schemas"]["ProgramTransactionStatListResponse"];

type ProgramTransactionsStatsQueryParams = operations["getProgramTransactionsStats"]["parameters"]["query"];

type ProgramTransactionsStatsPathParams = operations["getProgramTransactionsStats"]["parameters"]["path"];

export type ProgramTransactionsStatsPortParams = HttpClientParameters<{
  QueryParams: ProgramTransactionsStatsQueryParams;
  PathParams: ProgramTransactionsStatsPathParams;
}>;

export type ProgramTransactionsStatsPortResponse = HttpStorageResponse<ProgramTransactionsStatsResponse>;
