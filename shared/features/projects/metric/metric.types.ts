import { IconPort, IconSize } from "@/design-system/atoms/icon";

export interface MetricProps {
  icon: NonNullable<IconPort["component"]>;
  count: number;
  iconSize?: IconSize;
}
