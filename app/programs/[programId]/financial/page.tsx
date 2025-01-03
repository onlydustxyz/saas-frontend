"use client";

import { BudgetAvailableCards } from "@/app/programs/[programId]/financial/_features/budget-available-cards/budget-available-cards";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TransactionsContextProvider } from "./_features/transactions/context/transactions.context";
import { Transactions } from "./_features/transactions/transactions";

export default function ProgramsFinancialPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
            level: "1",
          },
          {
            id: "details",
            label: data?.name,
            href: NEXT_ROUTER.programs.projects.root(programId),
            level: "2",
          },
          {
            id: "financial",
            label: <Translate token={"programs:details.views.financial"} />,
            level: "5",
          },
        ]}
      />
      <div className="flex h-full gap-lg">
        <div className="flex flex-1 flex-col gap-lg">
          <BudgetAvailableCards />
          <BudgetInTime programId={programId} />
        </div>

        <div>
          <TransactionsContextProvider programId={programId}>
            <Transactions />
          </TransactionsContextProvider>
        </div>
      </div>
    </ScrollView>
  );
}
