import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SortDirection, TableSortPort } from "../../table-sort.types";
import { TableSortDefaultVariants } from "./default.variants";

export function TableSortDefaultAdapter({ classNames, direction, onDirectionChange }: TableSortPort) {
  const slots = TableSortDefaultVariants();
  const { t } = useTranslation("table");

  const sortIcons: Record<SortDirection, ButtonPort<"button">["startIcon"]> = {
    ASC: { component: ArrowUpNarrowWide },
    DESC: { component: ArrowDownWideNarrow },
  };

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <Tooltip content={<Translate token={"table:tableSort.title"} />}>
              {/*// TODO BUTTON*/}
              <Button size="lg" hideText startIcon={sortIcons[direction]} />
            </Tooltip>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-3">
            <Typo translate={{ token: "table:tableSort.title" }} />

            <div className="grid gap-2">
              <Typo size="xs" color="text-2" translate={{ token: "table:tableSort.direction.title" }} />
              {/*// TODO BUTTON*/}
              <RadioButtonGroup
                variant={"secondary-light"}
                value={direction}
                items={[
                  {
                    value: SortDirection.ASC,
                    label: t("tableSort.direction.ascending"),
                  },
                  {
                    value: SortDirection.DESC,
                    label: t("tableSort.direction.descending"),
                  },
                ]}
                onChange={onDirectionChange}
              />
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
