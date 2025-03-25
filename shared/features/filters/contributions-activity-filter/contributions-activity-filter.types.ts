import { ContributionTypeUnion } from "@/core/domain/contribution/models/contribution.types";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

type QuantityFilterValue = NonNullable<QuantityFilterProps["value"]>;

interface ContributionsActivityFilterValue extends QuantityFilterValue {
  contributionType: ContributionTypeUnion[];
}

export interface ContributionsActivityFilterProps {
  value?: ContributionsActivityFilterValue;
  onChange?: (value: ContributionsActivityFilterValue) => void;
}
