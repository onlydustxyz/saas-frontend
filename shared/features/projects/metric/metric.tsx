import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { MetricProps } from "./metric.types";

export function Metric({ icon, count, iconSize = "xxs" }: MetricProps) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size={iconSize} classNames={{ base: "text-foreground-quinary" }} />

      <Typo size="xs" weight="medium">
        {Intl.NumberFormat().format(count)}
      </Typo>
    </div>
  );
}
