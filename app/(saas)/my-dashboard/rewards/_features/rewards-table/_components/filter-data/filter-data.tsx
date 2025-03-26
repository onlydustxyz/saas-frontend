import { useProjectRewardsFilterDataSidePanel } from "@/app/(saas)/my-dashboard/rewards/_features/rewards-table/_components/filter-data/filter-data.hooks";
import { RewardsTableFilters } from "@/app/(saas)/my-dashboard/rewards/_features/rewards-table/rewards-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { CurrencyFilter } from "@/shared/features/filters/currency-filter/currency-filter";
import { ProjectFilter } from "@/shared/features/filters/project-filter/project-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterData() {
  const { name } = useProjectRewardsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<RewardsTableFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"myDashboard:detail.filters.titles.rewards"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <ProjectFilter selectedProjects={filters.projectIds} onSelect={projectIds => setFilters({ projectIds })} />
        <CurrencyFilter
          selectedCurrencies={filters.currencyIds}
          onSelect={currencyIds => setFilters({ currencyIds })}
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"common:form.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"common:form.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
