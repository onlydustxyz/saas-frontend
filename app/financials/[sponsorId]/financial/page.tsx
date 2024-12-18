"use client";

import { BudgetAvailableCards } from "@/app/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available-cards";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";
import { Cashflow } from "@/shared/charts/cashflow/cashflow";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TransactionsContextProvider } from "./_features/transactions/context/transactions.context";
import { Transactions } from "./_features/transactions/transactions";

export default function FinancialsFinancialPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  const { data } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
            href: NEXT_ROUTER.financials.root,
          },
          {
            id: "details",
            label: data?.name,
            href: NEXT_ROUTER.financials.programs.root(sponsorId),
          },
          {
            id: "financial",
            label: <Translate token={"financials:details.views.financial"} />,
          },
        ]}
      />
      <div className="flex h-full gap-lg">
        <div className="flex flex-1 flex-col gap-lg">
          <BudgetAvailableCards />
          <BudgetInTime sponsorId={sponsorId} />
          <div className="w-full flex-1">
            <Cashflow />
          </div>
        </div>

        <div>
          <TransactionsContextProvider sponsorId={sponsorId}>
            <Transactions />
          </TransactionsContextProvider>
        </div>
      </div>

      <FinancialDetailSidepanel />
      <DepositFlow />
    </ScrollView>
  );
}
