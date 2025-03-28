import { ContributorsTableFilters } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { ContributionsActivityFilter } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import {
  getQuantityFilterAmount,
  getQuantityFilterType,
} from "@/shared/features/filters/quantity-filter/quantity-filter.utils";
import { RewardCountFilter } from "@/shared/features/filters/reward-count-filter/reward-count-filter";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useContributorFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { name } = useContributorFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<ContributorsTableFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"manageProjects:detail.filters.titles.contributor"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <LanguageFilter
          selectedLanguages={filters.languageIds}
          onSelect={languages => setFilters({ languageIds: languages })}
        />
        <TotalRewardedAmountFilter
          value={{
            amount: filters.totalRewardedUsdAmount,
            type: getQuantityFilterType(filters.totalRewardedUsdAmount),
          }}
          onChange={value =>
            setFilters({
              totalRewardedUsdAmount: {
                ...value.amount,
              },
            })
          }
          unit={
            <Typo size={"sm"} color={"tertiary"}>
              {moneyKernelPort.getCurrency("USD").code}
            </Typo>
          }
        />
        <ContributionsActivityFilter
          value={{
            amount: getQuantityFilterAmount(filters.contributionCount),
            type: getQuantityFilterType(filters.contributionCount),
            contributionType: filters.contributionCount?.types || [],
          }}
          onChange={value => {
            setFilters({
              contributionCount: {
                ...value.amount,
                types: value.contributionType,
              },
            });
          }}
        />
        <RewardCountFilter
          value={{
            amount: filters.rewardCount,
            type: getQuantityFilterType(filters.rewardCount),
          }}
          onChange={value =>
            setFilters({
              rewardCount: {
                ...value.amount,
              },
            })
          }
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"manageProjects:detail.filters.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"manageProjects:detail.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
