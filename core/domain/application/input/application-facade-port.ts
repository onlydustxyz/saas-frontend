import {
  AcceptApplicationPortParams,
  AcceptApplicationPortResponse,
  DeleteApplicationPortParams,
  DeleteApplicationPortResponse,
  GetApplicationByIdPortParams,
  GetApplicationByIdPortResponse,
  PatchApplicationPortParams,
  PatchApplicationPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationFacadePort {
  patchApplication(p: PatchApplicationPortParams): PatchApplicationPortResponse;
  acceptApplication(p: AcceptApplicationPortParams): AcceptApplicationPortResponse;
  getApplicationById(p: GetApplicationByIdPortParams): GetApplicationByIdPortResponse;
  deleteApplication(p: DeleteApplicationPortParams): DeleteApplicationPortResponse;
}
