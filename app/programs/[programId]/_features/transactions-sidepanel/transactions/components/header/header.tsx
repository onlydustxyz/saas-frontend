import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

import { useTransactionsContext } from "../../../context/transactions.context";
import { TransactionsContextFilterTypes } from "../../../context/transactions.context.types";

export function Header() {
  const { t } = useTranslation("programs");

  const {
    filters: {
      count,
      set,
      clear,
      isCleared,
      values: { search, types },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  function handleSearch(value: string) {
    set({ search: value });
  }

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Popover>
        <Popover.Trigger>
          {() => (
            <div>
              <Button
                size="l"
                variant="secondary-light"
                hideText
                startIcon={{ name: "ri-filter-3-line" }}
                endContent={
                  count ? (
                    <Badge size="s" style="outline">
                      {count}
                    </Badge>
                  ) : null
                }
              />
            </div>
          )}
        </Popover.Trigger>

        <Popover.Content>
          {() => (
            <div className="flex max-w-[360px] flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <Typo translate={{ token: "programs:transactionPanel.filters.title" }} />

                {!isCleared ? (
                  <Button
                    onClick={clear}
                    size="s"
                    variant="secondary-light"
                    translate={{ token: "programs:transactionPanel.filters.clear" }}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "programs:transactionPanel.filters.options.types.title" }}
                />

                <div className="flex flex-wrap gap-1">
                  {typesOptions.map(type => (
                    <CheckboxButton
                      key={type}
                      value={types.includes(type)}
                      onChange={checked => handleTypes(type, checked)}
                    >
                      <Translate token={`programs:transactionPanel.filters.options.types.choices.${type}`} />
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "programs:transactionPanel.filters.options.period.title" }}
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Input
        value={search}
        onChange={e => handleSearch(e.target.value)}
        startContent={
          <Icon
            name="ri-search-line"
            classNames={{
              base: "text-text-2",
            }}
          />
        }
        placeholder={t("transactionPanel.transactions.search.placeholder")}
      />
    </div>
  );
}
