import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

export function Summary({
  summary,
}: {
  summary: {
    usdConversionRate: number;
    ungrantedAmount: number;
    newBudgetBalance: number;
    budget?: DetailedTotalMoneyTotalPerCurrency;
  };
}) {
  const { usdConversionRate, ungrantedAmount, newBudgetBalance, budget } = summary;

  if (!budget) return null;

  return (
    <CardBudgetAccordion
      defaultSelected={["budgetBalance", "programBalance"]}
      items={[
        {
          id: "budgetBalance",
          titleProps: {
            translate: {
              token: "panels:ungrantAmountSelection.summary.budgetBalance",
              values: { budget: budget.currency.name },
            },
          },
          cards: [
            {
              amount: {
                value: budget.amount,
                currency: budget.currency,
                usdEquivalent: budget.usdEquivalent ?? 0,
              },
              badgeProps: { children: <Translate token={"panels:ungrantAmountSelection.summary.currentBalance"} /> },
            },
            {
              amount: {
                value: ungrantedAmount,
                currency: budget.currency,
                usdEquivalent: ungrantedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:ungrantAmountSelection.summary.ungrant"} /> },
              type: CardBudgetType.UNGRANTED,
            },
            {
              amount: {
                value: newBudgetBalance,
                currency: budget.currency,
                usdEquivalent: newBudgetBalance * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:ungrantAmountSelection.summary.finalBalance"} /> },
              isError: newBudgetBalance < 0,
            },
          ],
        },
        {
          id: "programBalance",
          titleProps: { translate: { token: "panels:ungrantAmountSelection.summary.programBalance" } },
          cards: [
            {
              amount: {
                value: ungrantedAmount,
                currency: budget.currency,
                usdEquivalent: ungrantedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:ungrantAmountSelection.summary.ungrant"} /> },
              type: CardBudgetType.RECEIVED,
            },
          ],
        },
      ]}
      multiple
    />
  );
}
