import { Sponsor } from "@/core/domain/sponsor/models/sponsor-model";
import { SponsorProgramsListItem } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";
import { SponsorTransactionListItem } from "@/core/domain/sponsor/models/sponsor-transaction-list-item-model";
import { SponsorStoragePort } from "@/core/domain/sponsor/outputs/sponsor-storage-port";
import {
  AllocateBudgetToProgramBody,
  CreateSponsorProgramBody,
  GetSponsorProgramsResponse,
  GetSponsorResponse,
  GetSponsorTransactionsResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class SponsorClientAdapter implements SponsorStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getSponsor: "sponsors/:sponsorId",
    getSponsorProgram: "sponsors/:sponsorId/programs",
    getSponsorTransactions: "sponsors/:sponsorId/transactions",
    allocateBudgetToProgram: "sponsors/:sponsorId/allocate",
    createSponsorProgram: "sponsors/:sponsorId/programs",
  } as const;

  getSponsor = ({ pathParams }: FirstParameter<SponsorStoragePort["getSponsor"]>) => {
    const path = this.routes["getSponsor"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetSponsorResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Sponsor(data);
    };

    return {
      request,
      tag,
    };
  };

  getSponsorPrograms = ({ queryParams, pathParams }: FirstParameter<SponsorStoragePort["getSponsorPrograms"]>) => {
    const path = this.routes["getSponsorProgram"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetSponsorProgramsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        programs: data.programs.map(program => new SponsorProgramsListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getSponsorTransactions = ({
    pathParams,
    queryParams,
  }: FirstParameter<SponsorStoragePort["getSponsorTransactions"]>) => {
    const path = this.routes["getSponsorTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetSponsorTransactionsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        transactions: data.transactions.map(transaction => new SponsorTransactionListItem(transaction)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getSponsorTransactionsCsv = ({
    pathParams,
    queryParams,
  }: FirstParameter<SponsorStoragePort["getSponsorTransactionsCsv"]>) => {
    const path = this.routes["getSponsorTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      return await this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          accept: "text/csv",
        },
      });
    };

    return {
      request,
      tag,
    };
  };

  allocateBudgetToProgram = ({ pathParams }: FirstParameter<SponsorStoragePort["allocateBudgetToProgram"]>) => {
    const path = this.routes["allocateBudgetToProgram"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AllocateBudgetToProgramBody) =>
      this.client.request<never>({
        path,
        pathParams,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  createSponsorProgram = ({ pathParams }: FirstParameter<SponsorStoragePort["createSponsorProgram"]>) => {
    const path = this.routes["createSponsorProgram"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: CreateSponsorProgramBody) =>
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
}
