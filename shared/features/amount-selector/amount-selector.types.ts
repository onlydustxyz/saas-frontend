import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

type AmountSelectorActionsTypes = "USD" | "PERCENT";

export interface AmountSelectorActions {
  type: AmountSelectorActionsTypes;
  value: number;
  label: string;
}

interface BaseProps {
  amount: string;
  budget?: DetailedTotalMoneyTotalPerCurrency;
  showBudgetAmount?: boolean;
  actions?: AmountSelectorActions[];
}

interface AmountSelectorReadOnlyProps extends BaseProps {
  id?: never;
  onAmountChange?: never;
  allBudgets?: never;
  onBudgetChange?: never;
  readOnly?: true;
}

export interface AmountSelectorInputProps extends BaseProps {
  id?: string | number;
  onAmountChange: (amount: string) => void;
  allBudgets?: DetailedTotalMoneyTotalPerCurrency[];
  onBudgetChange: (budget?: DetailedTotalMoneyTotalPerCurrency) => void;
  readOnly?: never;
}

export type AmountSelectorProps = AmountSelectorReadOnlyProps | AmountSelectorInputProps;
