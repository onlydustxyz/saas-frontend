"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { BillingProfileSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/billing-profile-selection/billing-profile-selection";
import { useBillingProfileSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/billing-profile-selection/billing-profile-selection.hooks";
import { GenerateInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/generate-invoice/generate-invoice";
import { RewardsSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/rewards-selection/rewards-selection";
import { UploadInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/upload-invoice/upload-invoice";

import { AcceptInvoicingMandate } from "./_panels/accept-invoicing-mandate/accept-invoicing-mandate";
import { InvoicingMandate } from "./_panels/invoicing-mandate/invoicing-mandate";
import { OpenProps, RequestPaymentFlowContextInterface, SelectedState } from "./request-payment-flow.types";

const RequestPaymentFlowContext = createContext<RequestPaymentFlowContextInterface>({
  billingProfileId: undefined,
  rewardIds: [],
  open: () => null,
  selectBillingProfile: () => null,
  selectRewards: () => null,
});

export function RequestPaymentFlowProvider({ children }: PropsWithChildren) {
  const [selectedState, setSelectedState] = useState<SelectedState>({
    billingProfileId: undefined,
    rewardIds: [],
  });

  const { open: openBillingProfileSelection } = useBillingProfileSelection();

  function open(props?: OpenProps) {
    if (props?.initialState) {
      // open the right panel -> open the selected rewards panels
      setSelectedState({
        rewardIds: props.initialState.selectedRewardsIds,
        billingProfileId: props.initialState.selectedBillingProfileId,
      });
    } else {
      openBillingProfileSelection();
    }
  }

  function onSelectRewards(billingProfileId: string, rewardIds: string[]) {
    setSelectedState({
      rewardIds,
      billingProfileId,
    });
  }

  function onSelectBillingProfile(billingProfileId: string) {
    setSelectedState({
      rewardIds: [],
      billingProfileId,
    });
  }

  return (
    <RequestPaymentFlowContext.Provider
      value={{
        rewardIds: selectedState.rewardIds,
        billingProfileId: selectedState.billingProfileId,
        open,
        selectRewards: onSelectRewards,
        selectBillingProfile: onSelectBillingProfile,
      }}
    >
      {children}
      <BillingProfileSelection />
      <RewardsSelection />
      <AcceptInvoicingMandate />
      <InvoicingMandate />
      <GenerateInvoice />
      <UploadInvoice />
    </RequestPaymentFlowContext.Provider>
  );
}

export function useRequestPaymentFlow() {
  return useContext(RequestPaymentFlowContext);
}
