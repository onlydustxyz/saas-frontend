import { bootstrap } from "@/core/bootstrap";

export async function fetchInvoicePreviewData({
  token,
  rewardIds,
  billingProfileId,
  impersonationHeaders,
}: {
  token: string | null;
  rewardIds: string;
  billingProfileId: string;
  impersonationHeaders?: string;
}) {
  if (!token) throw new Error("Token is required");
  const billingProfileStoragePortForServer = bootstrap.getBillingProfileStoragePortForServer();

  return await billingProfileStoragePortForServer
    .getBillingProfileInvoicePreviewById({
      pathParams: {
        billingProfileId,
      },
      queryParams: {
        rewardIds: [rewardIds],
      },
      impersonationHeaders,
    })
    .request()
    .then(res => res)
    .catch(() => {
      throw new Error("Failed to fetch invoice preview data.");
    });
}
