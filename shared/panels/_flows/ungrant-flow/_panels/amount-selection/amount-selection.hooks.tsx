import { useEffect, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { toast } from "@/design-system/molecules/toaster";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const PANEL_NAME = "ungrant-amount-selection";

export function useAmountSelection() {
  return useSinglePanelContext(PANEL_NAME);
}

export function useUngrantProgram() {
  const { close, isOpen } = useSidePanelsContext();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");
  const isPanelOpen = isOpen(PANEL_NAME);
  const { projectId, program } = useUngrantFlow();

  const {
    data: projectFinancialDetails,
    isLoading: isLoadingProjectFinancialDetails,
    isError: isErrorProjectFinancialDetails,
  } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsById({
    pathParams: {
      projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const allBudgets = projectFinancialDetails?.totalAvailable.totalPerCurrency ?? [];

  useEffect(() => {
    if (isPanelOpen && projectFinancialDetails) {
      setBudget(projectFinancialDetails.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isPanelOpen) {
      setBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isPanelOpen, projectFinancialDetails]);

  const { mutate, isPending } = ProjectReactQueryAdapter.client.useUngrantProject({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        close();
        toast.success(
          <Translate
            token={"panels:ungrantAmountSelection.toast.success"}
            values={{
              program: program?.name,
              amount,
              code: budget?.currency.code,
            }}
          />
        );
      },
      onError: () => {
        toast.error(<Translate token={"panels:ungrantAmountSelection.toast.error"} />);
      },
    },
    invalidateTagParams: {
      project: {
        pathParams: {
          projectSlug: projectFinancialDetails?.slug ?? "",
        },
      },
    },
  });

  function handleUngrant() {
    const currencyId = budget?.currency.id;

    if (!program || !currencyId) return;

    mutate({
      programId: program.id,
      amount: parseFloat(amount),
      currencyId,
    });
  }

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

  const usdConversionRate = budget?.usdConversionRate ?? 0;

  const ungrantedAmount = parseFloat(amount);
  const newBudgetBalance = (budget?.amount ?? 0) - ungrantedAmount;
  const newBalanceIsNegative = newBudgetBalance < 0;

  return {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    isLoading: isLoadingProjectFinancialDetails,
    isError: isErrorProjectFinancialDetails,
    summary: {
      usdConversionRate,
      ungrantedAmount,
      newBudgetBalance,
      budget,
    },
    ungrant: {
      post: handleUngrant,
      isPending,
      newBalanceIsNegative,
    },
  };
}
