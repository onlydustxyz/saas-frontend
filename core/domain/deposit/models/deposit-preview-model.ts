import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type DepositPreviewResponse = components["schemas"]["PreviewDepositResponse"];

interface DepositPreviewInterface extends DepositPreviewResponse {}

export class DepositPreview implements DepositPreviewInterface {
  id!: DepositPreviewResponse["id"];

  constructor(props: DepositPreviewResponse) {
    Object.assign(this, props);
  }
}
