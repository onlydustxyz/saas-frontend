import { useEffect } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { SingleUserAmountSelectorProps } from "./single-user-amount-selector.types";

export function SingleUserAmountSelector({
  id,
  amount,
  onAmountChange,
  onBudgetChange,
  budget,
}: SingleUserAmountSelectorProps) {
  const { projectId = "" } = useRewardFlow();

  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsById({
    pathParams: {
      projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const allBudgets = project?.totalAvailable.totalPerCurrency ?? [];

  useEffect(() => {
    if (project) {
      onBudgetChange(project.totalAvailable.totalPerCurrency?.[0]);
      onAmountChange(amount ?? "0");
      return;
    }
  }, [project]);

  if (isLoading) {
    return (
      <>
        <AmountSelectorLoading />

        <Skeleton classNames={{ base: "h-56" }} />
      </>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!project || !budget) {
    return null;
  }

  return (
    <AmountSelector
      id={id}
      amount={amount}
      onAmountChange={onAmountChange}
      budget={budget}
      allBudgets={allBudgets}
      onBudgetChange={onBudgetChange}
      showBudgetAmount={false}
      actions={[
        {
          value: 150,
          label: "150 USD",
          type: "USD",
        },
        {
          value: 500,
          label: "500 USD",
          type: "USD",
        },
        {
          value: 1000,
          label: "1000 USD",
          type: "USD",
        },
        {
          value: 2000,
          label: "2000 USD",
          type: "USD",
        },
      ]}
    />
  );
}
