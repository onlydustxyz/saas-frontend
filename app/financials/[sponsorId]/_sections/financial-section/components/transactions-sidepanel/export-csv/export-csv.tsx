import { useTransactionsContext } from "@/app/financials/[sponsorId]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";
import { TransactionsContextFilterTypes } from "@/app/financials/[sponsorId]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context.types";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv() {
  const {
    sponsorId,
    queryParams,
    filters: {
      set,
      values: { types, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const sponsorStoragePortForClient = bootstrap.getSponsorStoragePortForClient();

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  function handleDateRange(value: DateRangePickerValue) {
    set({ dateRange: value });
  }

  async function handleClick() {
    const data = await sponsorStoragePortForClient
      .getSponsorTransactionsCsv({
        pathParams: { sponsorId },
        queryParams: {
          types: queryParams?.types,
          fromDate: queryParams?.fromDate,
          toDate: queryParams?.toDate,
          pageSize: 100,
        },
      })
      .request();

    fileKernelPort.download({
      blob: data,
      name: `transactions-${new Date().getTime()}`,
      extension: "csv",
    });
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="h-full">
        <div className="flex flex-col gap-2">
          <Accordion
            classNames={{ base: "flex flex-col gap-3" }}
            id={"types"}
            titleProps={{
              translate: { token: "financials:transactionPanel.filters.options.types.title" },
              size: "xs",
              weight: "medium",
            }}
            defaultSelected={["types"]}
          >
            <div className="flex flex-wrap gap-1">
              {typesOptions.map(type => (
                <CheckboxButton
                  key={type}
                  value={types.includes(type)}
                  onChange={checked => handleTypes(type, checked)}
                >
                  <Translate token={`financials:transactionPanel.filters.options.types.choices.${type}`} />
                </CheckboxButton>
              ))}
            </div>
          </Accordion>

          <Accordion
            classNames={{ base: "flex flex-col gap-3" }}
            id={"period"}
            titleProps={{
              translate: { token: "financials:transactionPanel.filters.options.period.title" },
              size: "xs",
              weight: "medium",
            }}
            defaultSelected={["period"]}
          >
            <DateRangePicker
              label={
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{ token: "financials:transactionPanel.filters.options.period.title" }}
                />
              }
              value={dateRange}
              onChange={handleDateRange}
            />
          </Accordion>

          <Accordion
            classNames={{ base: "flex flex-col gap-1" }}
            id={"data"}
            titleProps={{
              translate: { token: "financials:transactionPanel.export.data.title" },
              size: "xs",
              weight: "medium",
            }}
            defaultSelected={["data"]}
          >
            <div className="flex flex-col gap-1">
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.id" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.timestamp" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.transactionType" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.depositStatus" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.programId" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.amount" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.currency" }}
              />
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "financials:transactionPanel.export.data.columns.usdAmount" }}
              />
            </div>
          </Accordion>
        </div>
      </div>

      <SidePanelFooter>
        <Button
          onClick={handleClick}
          translate={{
            token: "financials:transactionPanel.export.button",
          }}
          size="lg"
          classNames={{ base: "w-full" }}
        />
      </SidePanelFooter>
    </div>
  );
}
