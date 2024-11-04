import {
  AcceptApplicationPortParams,
  AcceptApplicationPortResponse,
  GetApplicationByIdPortParams,
  GetApplicationByIdPortResponse,
  PatchApplicationPortParams,
  PatchApplicationPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationStoragePort {
  routes: Record<string, string>;
  patchApplication(p: PatchApplicationPortParams): PatchApplicationPortResponse;
  acceptApplication(p: AcceptApplicationPortParams): AcceptApplicationPortResponse;
  getApplicationById(p: GetApplicationByIdPortParams): GetApplicationByIdPortResponse;
}
