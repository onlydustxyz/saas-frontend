import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { StatProps } from "@/shared/components/stat/stat.types";

export function Stat({ label, value, iconProps, badgeProps }: StatProps) {
  return (
    <div className={"flex flex-col gap-xxs"}>
      <Typo size="xs" color="tertiary">
        {label}
      </Typo>

      <div className="flex items-center">
        <div className="flex w-full items-center gap-md">
          {iconProps ? <Icon {...iconProps} size="md" /> : null}

          <Typo size="xs" variant="heading" weight="medium">
            {value}
          </Typo>
        </div>

        {badgeProps ? <Badge size="xs" shape="squared" variant="solid" {...badgeProps} /> : null}
      </div>
    </div>
  );
}
