import {
  PreviewDepositPortParams,
  PreviewDepositPortResponse,
  UpdateDepositPortParams,
  UpdateDepositPortResponse,
} from "@/core/domain/deposit/deposit-contract.types";

export interface DepositFacadePort {
  previewDeposit(p: PreviewDepositPortParams): PreviewDepositPortResponse;
  updateDeposit(p: UpdateDepositPortParams): UpdateDepositPortResponse;
}
