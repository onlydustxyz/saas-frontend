import { useContributorContributionsFilterDataSidePanel } from "@/app/(saas)/my-dashboard/contributions/_features/filter-data/filter-data.hooks";
import { ContributionKanbanFilters } from "@/app/(saas)/my-dashboard/contributions/_features/filter-data/filter-data.types";

import { RewardedFilterType } from "@/core/kernel/filters/filters-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { ProjectFilter } from "@/shared/features/filters/project-filter/project-filter";
import { RewardedFilter } from "@/shared/features/filters/rewarded-filter/rewarded-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterData() {
  const { name } = useContributorContributionsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });

  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<ContributionKanbanFilters>();
  function getSelectedRewardedType(hasBeenRewarded: boolean | undefined): RewardedFilterType[] {
    if (hasBeenRewarded === undefined) return [RewardedFilterType.REWARDED, RewardedFilterType.UNREWARDED];
    return hasBeenRewarded ? [RewardedFilterType.REWARDED] : [RewardedFilterType.UNREWARDED];
  }

  function handleSelect(rewardedType: string[], setFilters: (filters: { hasBeenRewarded?: boolean }) => void) {
    const includesRewarded = rewardedType.includes(RewardedFilterType.REWARDED);
    const includesUnrewarded = rewardedType.includes(RewardedFilterType.UNREWARDED);

    setFilters({
      hasBeenRewarded: includesRewarded && includesUnrewarded ? undefined : includesRewarded,
    });
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"myDashboard:detail.filters.titles.contribution"} />,
        }}
        canGoBack={false}
        canClose
      />

      <SidePanelBody>
        <ProjectFilter selectedProjects={filters.projectIds} onSelect={projectIds => setFilters({ projectIds })} />
        <RewardedFilter
          selectedRewardedType={getSelectedRewardedType(filters.hasBeenRewarded)}
          onSelect={(rewardedType: string[]) => handleSelect(rewardedType, setFilters)}
        />
      </SidePanelBody>

      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={resetFilters} translate={{ token: "common:form.reset" }} />
          <Button size={"md"} variant={"secondary"} onClick={saveFilters} translate={{ token: "common:form.save" }} />
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
