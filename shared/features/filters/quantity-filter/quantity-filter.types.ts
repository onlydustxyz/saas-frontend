import { ReactNode } from "react";

import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

interface QuantityFilterValues {
  type: QuantityFilterType;
  amount?: {
    gte?: number;
    eq?: number;
    lte?: number;
  };
}
export interface QuantityFilterProps {
  name: string;
  value?: QuantityFilterValues;
  onChange?: (v: QuantityFilterValues) => void;
  unit?: ReactNode;
}
