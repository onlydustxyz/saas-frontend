import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { buildNodesAndDataForSankey } from "@/shared/charts/cashflow/cashflow.utils";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useSankeyChartOptions } from "@/shared/components/charts/highcharts/sankey-chart/sankey-chart.hooks";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

const mockData = {
  sponsors: [
    { id: "2a8b6e9c-1d4f-4a3c-9b7d-5e8f0a2c6b1d", name: "Big Money Foundation", color: "#004080" },
    { id: "7c9d3f5a-2e8b-4c1d-8a6e-9f4b2d5c7a3e", name: "Tech Giants Foundation", color: "#0066CC" },
    { id: "1f4a7b2e-8c5d-4e3f-9a6b-2d5c8e9f4a7b", name: "Future Investments Group", color: "#003366" },
    { id: "5e8f2a4c-9b7d-1f3e-6a8b-4c7d9e5f2a1b", name: "Sustainable Ventures", color: "#00509E" },
  ],
  programs: [
    { id: "3b9a4c8d-7e2f-5a1b-6c9d-4e8f2a3b9c7d", name: "Coca Cola Program", color: "#800080", sponsorId: "2a8b6e9c-1d4f-4a3c-9b7d-5e8f0a2c6b1d", funding: 70000 },
    { id: "9c7d5e8f-2a4b-6c1d-3e9a-8b7f4c5d2e1a", name: "Optimism Program", color: "#9932CC", sponsorId: "2a8b6e9c-1d4f-4a3c-9b7d-5e8f0a2c6b1d", funding: 30000 },
    { id: "4e8f2a3b-9c7d-5e1f-2a4b-6c9d8e7f4a5b", name: "Tech Innovation Program", color: "#8A2BE2", sponsorId: "7c9d3f5a-2e8b-4c1d-8a6e-9f4b2d5c7a3e", funding: 50000 },
    { id: "8b7f4c5d-2e1a-9c3b-7e4f-5a2b6c8d9e1f", name: "Green Future Program", color: "#9370DB", sponsorId: "7c9d3f5a-2e8b-4c1d-8a6e-9f4b2d5c7a3e", funding: 40000 },
    { id: "6c9d4e8f-2a3b-7c5d-1e9f-4a2b8c7d5e3f", name: "Clean Energy Program", color: "#663399", sponsorId: "1f4a7b2e-8c5d-4e3f-9a6b-2d5c8e9f4a7b", funding: 60000 },
    { id: "2e1f8b7f-4c5d-9a3b-6c8d-2e4f7a5b9c1d", name: "Healthcare Reform Program", color: "#6A5ACD", sponsorId: "5e8f2a4c-9b7d-1f3e-6a8b-4c7d9e5f2a1b", funding: 45000 },
  ],
  projects: [
    { id: "7d5e8f2a-4b9c-1d3e-6f8b-2c7d4e9f5a3b", name: "Onlydust Project", color: "#FF8C00", programId: "3b9a4c8d-7e2f-5a1b-6c9d-4e8f2a3b9c7d", funding: 40000 },
    { id: "1e9f4a2b-8c7d-5e3f-2a6b-9c1d7e4f8b5a", name: "Elmex Project", color: "#FFA500", programId: "3b9a4c8d-7e2f-5a1b-6c9d-4e8f2a3b9c7d", funding: 30000 },
    { id: "5c8d2e1f-9b7f-4a3b-6c5d-8e2f7a4b9c1d", name: "NextGen Tech", color: "#FFB347", programId: "9c7d5e8f-2a4b-6c1d-3e9a-8b7f4c5d2e1a", funding: 20000 },
    { id: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", name: "EcoHomes Initiative", color: "#FFD700", programId: "8b7f4c5d-2e1a-9c3b-7e4f-5a2b6c8d9e1f", funding: 25000 },
    { id: "3b6c9d4e-8f2a-7b5c-1d9f-4e2b8c7d5a3f", name: "Smart Agriculture", color: "#FF7F50", programId: "4e8f2a3b-9c7d-5e1f-2a4b-6c9d8e7f4a5b", funding: 30000 },
    { id: "7f4c5d2e-1a9b-3c8d-6e4f-2a5b9c7d1e8f", name: "SolarGrid Expansion", color: "#FF6347", programId: "6c9d4e8f-2a3b-7c5d-1e9f-4a2b8c7d5e3f", funding: 50000 },
    { id: "1d9f4e2b-8c7d-5a3f-2e6b-9c1d7f4b8e5a", name: "AI for Healthcare", color: "#FFA07A", programId: "2e1f8b7f-4c5d-9a3b-6c8d-2e4f7a5b9c1d", funding: 35000 },
    { id: "5c8d2e1f-9b7f-4a3b-6c5d-8e2f7a4b9c1d", name: "Carbon Capture Tech", color: "#FF4500", programId: "6c9d4e8f-2a3b-7c5d-1e9f-4a2b8c7d5e3f", funding: 55000 },
    { id: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", name: "Education for All", color: "#FF7F24", programId: "2e1f8b7f-4c5d-9a3b-6c8d-2e4f7a5b9c1d", funding: 32000 },
  ],
  contributors: [
    { id: "4b9c7d5e-8f2a-1d3e-6f8b-2c7d4e9f5a3b", name: "Pixelfact", projectId: "7d5e8f2a-4b9c-1d3e-6f8b-2c7d4e9f5a3b", amount: 3500 },
    { id: "8c7d1e9f-4a2b-5e3f-2a6b-9c1d7e4f8b5a", name: "Alexbeno", projectId: "7d5e8f2a-4b9c-1d3e-6f8b-2c7d4e9f5a3b", amount: 5000 },
    { id: "2e1f5c8d-9b7f-4a3b-6c5d-8e2f7a4b9c1d", name: "Ofux", projectId: "1e9f4a2b-8c7d-5e3f-2a6b-9c1d7e4f8b5a", amount: 6000 },
    { id: "6b9c9e5f-2a4b-7c1d-3e8f-6b9c2d5e8f4a", name: "Haydencleary", projectId: "1e9f4a2b-8c7d-5e3f-2a6b-9c1d7e4f8b5a", amount: 5300 },
    { id: "4e8f3b6c-9d4e-8f2a-7b5c-1d9f4e2b8c7d", name: "TechSavvy", projectId: "5c8d2e1f-9b7f-4a3b-6c5d-8e2f7a4b9c1d", amount: 4500 },
    { id: "8c7d7f4c-5d2e-1a9b-3c8d-6e4f2a5b9c7d", name: "GreenGeek", projectId: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", amount: 4000 },
    { id: "2e6b1d9f-4e2b-8c7d-5a3f-2e6b9c1d7f4b", name: "FutureFarmer", projectId: "3b6c9d4e-8f2a-7b5c-1d9f-4e2b8c7d5a3f", amount: 8000 },
    { id: "6c5d5c8d-2e1f-9b7f-4a3b-6c5d8e2f7a4b", name: "CodeWizard", projectId: "7d5e8f2a-4b9c-1d3e-6f8b-2c7d4e9f5a3b", amount: 2500 },
    { id: "4a7b9e5f-2a4b-7c1d-3e8f-6b9c2d5e8f4a", name: "EcoCoder", projectId: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", amount: 5000 },
    { id: "8e5a4b9c-7d5e-8f2a-1d3e-6f8b2c7d4e9f", name: "SustainableDev", projectId: "3b6c9d4e-8f2a-7b5c-1d9f-4e2b8c7d5a3f", amount: 7000 },
    { id: "2c7d8c7d-1e9f-4a2b-5e3f-2a6b9c1d7e4f", name: "SolarHero", projectId: "7f4c5d2e-1a9b-3c8d-6e4f-2a5b9c7d1e8f", amount: 8500 },
    { id: "6f8b2e1f-5c8d-9b7f-4a3b-6c5d8e2f7a4b", name: "AIEnthusiast", projectId: "1d9f4e2b-8c7d-5a3f-2e6b-9c1d7f4b8e5a", amount: 4500 },
    { id: "4e9f6b9c-9e5f-2a4b-7c1d-3e8f6b9c2d5e", name: "CarbonChamp", projectId: "5c8d2e1f-9b7f-4a3b-6c5d-8e2f7a4b9c1d", amount: 9000 },
    { id: "8c7d4e8f-3b6c-9d4e-8f2a-7b5c1d9f4e2b", name: "EdSupporter", projectId: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", amount: 4000 },
    { id: "2a6b8c7d-7f4c-5d2e-1a9b-3c8d6e4f2a5b", name: "GreenCoder", projectId: "7f4c5d2e-1a9b-3c8d-6e4f-2a5b9c7d1e8f", amount: 7500 },
    { id: "6c5d2e6b-1d9f-4e2b-8c7d-5a3f2e6b9c1d", name: "TechWhiz", projectId: "5c8d2e1f-9b7f-4a3b-6c5d-8e2f7a4b9c1d", amount: 6500 },
    { id: "4a3b6c5d-5c8d-2e1f-9b7f-4a3b6c5d8e2f", name: "FutureGuru", projectId: "9e5f2a4b-7c1d-3e8f-6b9c-2d5e8f4a7b3c", amount: 7000 },
  ],
};

export function Cashflow() {
  const rangeMenu = useRangeSelectOptions();
  // const dateKernelPort = bootstrap.getDateKernelPort();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);
  const [filteredData, setFilteredData] = useState(mockData);

  const { nodes, data } = buildNodesAndDataForSankey(filteredData);

  function handleOnChartAction(dataSourceId: string) {
     // TODO temp code to simulate data filtering, this will work as other charts with query params passed to API
    const filteredSponsors = mockData.sponsors.filter(sponsor => sponsor.id === dataSourceId);
    const isSponsorSelected = filteredSponsors.length > 0;

    const filteredPrograms = mockData.programs.filter(program => 
      isSponsorSelected ? program.sponsorId === dataSourceId : program.id === dataSourceId
    );
    const isProgramSelected = filteredPrograms.length > 0;

    const filteredProjects = mockData.projects.filter(project =>
      isProgramSelected 
        ? filteredPrograms.some(program => program.id === project.programId)
        : project.id === dataSourceId
    );

    const filteredContributors = mockData.contributors.filter(contributor =>
      filteredProjects.some(project => project.id === contributor.projectId)
    );

    setFilteredData({
      sponsors: isSponsorSelected ? filteredSponsors : mockData.sponsors,
      programs: filteredPrograms,
      projects: filteredProjects, 
      contributors: filteredContributors,
    });
  }

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  const { options } = useSankeyChartOptions({
    series: [{ nodes, data }],
    onAction: handleOnChartAction,
  });

  return (
    <Paper border={"primary"} classNames={{ base: "w-full" }}>
      <div className="flex flex-1 flex-col gap-lg">
        <div className="flex items-center justify-between gap-lg">
          <Typo
            weight={"medium"}
            size={"md"}
            color={"primary"}
            translate={{ token: "financials:details.financial.budgetInTime.title" }}
          />

          <Menu
            items={rangeMenu}
            selectedIds={[rangeType]}
            onAction={onChangeRangeType}
            isPopOver
            placement={"bottom-end"}
          >
            <Button
              variant={"secondary"}
              size={"sm"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
              translate={{ token: `common:dateRangeType.${rangeType}` }}
            />
          </Menu>
        </div>

        <HighchartsDefault options={options} />

        <div className={"flex items-center gap-xl"}>
          <ChartLegend color="areaspline-primary">
            <Translate token={"financials:details.financial.budgetInTime.legend.allocated"} />
          </ChartLegend>

          <ChartLegend color="areaspline-secondary">
            <Translate token={"financials:details.financial.budgetInTime.legend.granted"} />
          </ChartLegend>

          <ChartLegend color="areaspline-tertiary">
            <Translate token={"financials:details.financial.budgetInTime.legend.rewarded"} />
          </ChartLegend>
        </div>
      </div>
    </Paper>
  );
}
