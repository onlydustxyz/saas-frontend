import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { isSplineType } from "@/app/data/_components/histograms/histograms.utils";
import { SplineTypeMenu } from "@/app/data/_components/histograms/menus/spline-type-menu/spline-type-menu";
import { SplineType } from "@/app/data/_components/histograms/menus/spline-type-menu/spline-type-menu.types";
import { TimeGroupingMenu } from "@/app/data/_components/histograms/menus/time-grouping-menu/time-grouping-menu";
import { useContributorHistogramChart } from "@/app/data/overview/_features/contributor-histogram-chart/contributor-histogram-chart.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useStackedColumnAreaSplineChartOptions } from "@/shared/components/charts/highcharts/stacked-column-area-spline-chart/stacked-column-area-spline-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorHistogramChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = useRangeSelectOptions();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_SEMESTER);
  const [timeGroupingType, setTimeGroupingType] = useState<TimeGroupingType>(TimeGroupingType.MONTH);
  const [splineType, setSplineType] = useState<SplineType>(SplineType.PR);
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorsStats({
    queryParams: {
      fromDate,
      toDate,
      timeGrouping: timeGroupingType,
      ...(selectedProgramAndEcosystem.length && { dataSourceIds: selectedProgramAndEcosystem }),
    },
  });

  const { stats } = data ?? {};

  const {
    categories,
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
    minChurnedContributor,
  } = useContributorHistogramChart(stats, timeGroupingType);

  const splineSeries = useMemo(() => {
    switch (splineType) {
      case SplineType.GRANTED:
        return {
          name: t("data:histograms.legends.granted"),
          data: grantedSeries,
        };
      case SplineType.REWARDED:
        return {
          name: t("data:histograms.legends.rewarded"),
          data: rewardedSeries,
        };
      case SplineType.PR:
      default:
        return {
          name: t("data:histograms.legends.prMerged"),
          data: mergedPrSeries,
        };
    }
  }, [splineType, grantedSeries, rewardedSeries, mergedPrSeries]);

  const { options } = useStackedColumnAreaSplineChartOptions({
    dataViewTarget: "contributor",
    dateRangeType: rangeType,
    timeGroupingType,
    selectedProgramAndEcosystem,
    yAxis: { title: [t("data:histograms.data.contributors"), splineSeries.name] },
    categories,
    min: minChurnedContributor,
    series: [
      { name: t("data:histograms.legends.new"), data: newContributorSeries },
      { name: t("data:histograms.legends.reactivated"), data: reactivatedContributorSeries },
      { name: t("data:histograms.legends.active"), data: activeContributorSeries },
      { name: t("data:histograms.legends.churned"), data: churnedContributorSeries },
      {
        ...splineSeries,
        type: "areaspline",
      },
    ],
  });

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setRangeType(value);
  }

  function onChangeTimeGroupingType(value: string) {
    if (dateKernelPort.isTimeGroupingType(value)) setTimeGroupingType(value);
  }

  function onChangeSplineType(value: string) {
    if (isSplineType(value)) setSplineType(value);
  }

  function onProgramEcosystemChange(ids: string[]) {
    setSelectedProgramAndEcosystem(ids);
  }

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[300px]",
        }}
      />
    );
  }

  if (
    !newContributorSeries.length &&
    !reactivatedContributorSeries.length &&
    !activeContributorSeries.length &&
    !churnedContributorSeries.length &&
    !mergedPrSeries.length
  ) {
    return (
      <EmptyState
        titleTranslate={{ token: "data:histograms.emptyState.title" }}
        descriptionTranslate={{ token: "data:histograms.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 tablet:flex-nowrap">
        <div className="flex flex-wrap gap-2 tablet:flex-nowrap">
          <ProgramEcosystemPopover
            name={"programAndEcosystem"}
            placeholder={t("data:details.allDataFilter.placeholder")}
            onSelect={onProgramEcosystemChange}
            selectedProgramsEcosystems={selectedProgramAndEcosystem}
            searchParams={"programAndEcosystemIds"}
          />
          <Menu items={rangeMenu} selectedIds={[rangeType]} onAction={onChangeRangeType} isPopOver>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
            >
              <Translate token={`common:dateRangeType.${rangeType}`} />
            </Button>
          </Menu>
          <TimeGroupingMenu
            selectedTimeGrouping={timeGroupingType}
            onAction={onChangeTimeGroupingType}
            relatedDateRangeType={rangeType}
          />
        </div>
      </div>
      <HighchartsDefault options={options} />
      <Paper size={"lg"} classNames={{ base: "flex gap-lg items-center" }} background={"secondary"}>
        <ChartLegend color="primary">
          <Translate token={"data:histograms.legends.new"} />
        </ChartLegend>

        <ChartLegend color="secondary">
          <Translate token={"data:histograms.legends.reactivated"} />
        </ChartLegend>

        <ChartLegend color="septenary">
          <Translate token={"data:histograms.legends.active"} />
        </ChartLegend>

        <ChartLegend color="quaternary">
          <Translate token={"data:histograms.legends.churned"} />
        </ChartLegend>

        <SplineTypeMenu selectedSplineType={splineType} onAction={onChangeSplineType} />
      </Paper>
    </div>
  );
}