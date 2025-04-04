import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { AllocateProgramData } from "@/shared/panels/allocate-program-sidepanel/allocate-program.types";
import { Translate } from "@/shared/translation/components/translate/translate";

const PANEL_NAME = "allocate-program";

export function useAllocateProgramSidepanel() {
  return useSinglePanelContext<AllocateProgramData>(PANEL_NAME);
}

export function useAllocateProgram({ sponsorId, programId = "" }: { sponsorId: string; programId?: string }) {
  const { close, isOpen } = useSidePanelsContext();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");
  const isPanelOpen = isOpen(PANEL_NAME);

  const {
    data: program,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
  } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  const {
    data: sponsor,
    isLoading: isLoadingSponsor,
    isError: isErrorSponsor,
  } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  const allBudgets = sponsor?.totalAvailable.totalPerCurrency ?? [];

  useEffect(() => {
    if (isPanelOpen && sponsor) {
      setBudget(sponsor.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isPanelOpen) {
      setBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isPanelOpen, sponsor]);

  const { mutate, isPending } = SponsorReactQueryAdapter.client.useAllocateBudgetToProgram({
    pathParams: {
      sponsorId,
    },
    options: {
      onSuccess: () => {
        close();
        toast.success(
          <Translate
            token={"panels:allocateProgram.success.toast"}
            values={{
              program: program?.name,
              amount,
              code: budget?.currency.code,
            }}
          />
        );
      },
      onError: () => {
        toast.error(<Translate token={"panels:allocateProgram.error.toast"} />);
      },
    },
    invalidateTagParams: {
      sponsor: {
        pathParams: {
          sponsorId,
        },
      },
      program: {
        pathParams: {
          programId,
        },
      },
    },
  });

  function handleAllocateBudget() {
    const currencyId = budget?.currency.id;

    if (!programId || !currencyId) return;

    mutate({
      programId,
      amount: parseFloat(amount),
      currencyId,
    });
  }

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: programUsdAmount } = moneyKernelPort.format({
    amount: program?.totalAvailable.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

  const usdConversionRate = budget?.usdConversionRate ?? 0;

  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = (budget?.amount ?? 0) - allocatedAmount;
  const newBalanceIsNegative = newBudgetBalance < 0;

  const programBudget = program?.totalAvailable.totalPerCurrency?.find(b => {
    return b.currency.id === budget?.currency.id;
  });

  const currentProgramBalance = programBudget?.amount ?? 0;
  const newProjectBalance = currentProgramBalance + allocatedAmount;

  return {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    isLoading: isLoadingProgram || isLoadingSponsor,
    isError: isErrorProgram || isErrorSponsor,
    program,
    programUsdAmount,
    summary: {
      usdConversionRate,
      allocatedAmount,
      newBudgetBalance,
      currentProgramBalance,
      newProjectBalance,
      budget,
    },
    allocate: {
      post: handleAllocateBudget,
      isPending,
      newBalanceIsNegative,
    },
  };
}
