import { BaseQueries } from "@/core/actions/base-queries.actions";
import { BaseQueriesOptions } from "@/core/actions/type.actions";
import { GetBillingProfileInvoicePreviewByIdResponse } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { MARKETPLACE_API_BASE_URL } from "@/core/infrastructure/marketplace-api-client-adapter/config/base-url";

async function retrieveInvoicePreviewByBillingProfileId(billingProfileId: string, options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<GetBillingProfileInvoicePreviewByIdResponse>(
    `${MARKETPLACE_API_BASE_URL}/api/${MarketplaceApiVersion.v1}/billing-profiles/${billingProfileId}/invoice-preview`,
    {
      provideTag: [`billing-profiles-${billingProfileId}-invoice-preview`],
      ...(options || {}),
    }
  );
}

export default {
  retrieveInvoicePreviewByBillingProfileId,
};
