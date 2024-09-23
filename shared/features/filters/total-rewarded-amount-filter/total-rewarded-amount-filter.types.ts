import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

export interface TotalRewardedAmountFilterProps {
  value: QuantityFilterProps["value"];
  onChange?: QuantityFilterProps["onChange"];
}