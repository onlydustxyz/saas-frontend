"use client";

import { BudgetAvailableCards } from "@/app/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available-cards";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";
import { Cashflow } from "@/shared/charts/cashflow/cashflow";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";

import { TransactionsContextProvider } from "./_features/transactions/context/transactions.context";
import { Transactions } from "./_features/transactions/transactions";

export default function FinancialsFinancialPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  return (
    <ScrollView>
      <div className="flex h-full w-full gap-lg">
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
