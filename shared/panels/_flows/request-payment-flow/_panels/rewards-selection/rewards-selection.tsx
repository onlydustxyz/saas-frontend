import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Alert } from "@/design-system/molecules/alert";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { BillingProfileAccordion } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-accordion/billing-profile-accordion";
import { RewardsCardsSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/rewards-cards-selection/rewards-cards-selection";
import { useRewardsSelectionPanel } from "@/shared/panels/_flows/request-payment-flow/_panels/rewards-selection/rewards-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useAcceptInvoicingMandate } from "../accept-invoicing-mandate/accept-invoicing-mandate.hooks";
import { useGenerateInvoice } from "../generate-invoice/generate-invoice.hooks";

function Content() {
  const { billingProfileId = "", rewardIds } = useRequestPaymentFlow();
  const [isAddressWarningOpen, setIsAddressWarningOpen] = useState(true);
  const { open: openAcceptMandate } = useAcceptInvoicingMandate();
  const { open: openGenerateInvoice } = useGenerateInvoice();

  const {
    data: billingProfile,
    isLoading: isBillingProfileLoading,
    isError: isBillingProfileError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId,
    },
    options: {
      enabled: !!billingProfileId,
    },
  });

  const {
    data: rewards,
    isLoading: isRewardsProfileLoading,
    isError: isRewardsProfileError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileInvoiceableRewards({
    pathParams: {
      billingProfileId: billingProfileId ?? "",
    },
    options: {
      enabled: !!billingProfileId,
    },
  });

  const {
    data: payoutInformation,
    isLoading: isPayoutInformationLoading,
    isError: isPayoutInformationError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfilePayoutInfoById({
    pathParams: {
      billingProfileId: billingProfileId ?? "",
    },
    options: {
      enabled: !!billingProfileId,
    },
  });

  const isLoading = isBillingProfileLoading || isPayoutInformationLoading || isRewardsProfileLoading;
  const isError =
    isBillingProfileError ||
    !billingProfile ||
    isPayoutInformationError ||
    !payoutInformation ||
    isRewardsProfileError ||
    !rewards;

  const canSubmit = !!billingProfileId && rewardIds.length;

  function onSubmit() {
    if (billingProfile?.invoiceMandateAccepted || billingProfile?.type === "INDIVIDUAL") {
      openGenerateInvoice();
    } else {
      openAcceptMandate();
    }
  }

  if (isLoading) {
    return (
      <SidePanelBody>
        <Skeleton className={"h-15"} />
        <Skeleton className={"h-full"} />
      </SidePanelBody>
    );
  }

  if (isError) {
    return (
      <SidePanelBody>
        <EmptyStateLite />
      </SidePanelBody>
    );
  }

  function handleOnClose() {
    setIsAddressWarningOpen(false);
  }

  return (
    <>
      <SidePanelBody>
        {isAddressWarningOpen ? (
          <Alert
            color="warning"
            title={<Translate token="panels:requestPaymentFlow.addressWarning.title" />}
            description={<Translate token="panels:requestPaymentFlow.addressWarning.description" />}
            icon={{ component: AlertTriangle }}
            onClose={handleOnClose}
          />
        ) : null}
        <BillingProfileAccordion
          key={billingProfile.id}
          id={billingProfile.id}
          name={billingProfile.name}
          rewardCount={billingProfile.invoiceableRewardCount ?? 0}
          type={billingProfile.type}
          accounts={{
            aptosAddress: payoutInformation.aptosAddress,
            ethWallet: payoutInformation.ethWallet,
            nearAccountId: payoutInformation.nearAccountId,
            optimismAddress: payoutInformation.optimismAddress,
            starknetAddress: payoutInformation.starknetAddress,
            stellarAccountId: payoutInformation.stellarAccountId,
          }}
        />
        <RewardsCardsSelection rewards={rewards} />
      </SidePanelBody>
      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          translate={{
            token: "common:next",
          }}
          isDisabled={!canSubmit}
          onClick={onSubmit}
        />
      </SidePanelFooter>
    </>
  );
}

export function RewardsSelection() {
  const { name } = useRewardsSelectionPanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:requestPaymentFlow.title",
          },
        }}
        canGoBack
        canClose
      />
      <Content />
    </Panel>
  );
}
