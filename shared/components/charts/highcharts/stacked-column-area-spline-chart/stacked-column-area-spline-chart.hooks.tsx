import { Options, SeriesAreasplineOptions, SeriesColumnOptions } from "highcharts";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { bootstrap } from "@/core/bootstrap";

import {
  legendStyle,
  titleStyle,
  tooltipInnerStyle,
  tooltipWrapperStyle,
  yAxisPrimaryStyle,
  yAxisQuaternaryStyle,
} from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
  HighchartsSerieData,
  handleChartClickParams,
} from "@/shared/components/charts/highcharts/highcharts.types";
import { getPlotPeriod } from "@/shared/components/charts/highcharts/highcharts.utils";
import { NEXT_ROUTER } from "@/shared/constants/router";

interface ExtendedTooltipPositionerPointObject extends Highcharts.TooltipPositionerPointObject {
  negative: boolean;
  h: number;
}

export function useStackedColumnAreaSplineChartOptions({
  dataViewTarget,
  timeGroupingType,
  selectedProgramAndEcosystem,
  title,
  categories,
  series,
  xAxisTitle,
  colors = ["#460066", "#7A0EBB", "#A03AE9", "#F04438"],
  legend,
  tooltip,
  min,
  yAxis,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const { t } = useTranslation();
  const { title: yAxisTitle } = yAxis ?? {};
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const router = useRouter();

  function handleChartClick({ dataViewTarget, plotPeriod, seriesName }: handleChartClickParams) {
    const currentDate = dateKernelPort.isValid(new Date(plotPeriod)) ? new Date(plotPeriod) : new Date();
    const { plotPeriodFrom, plotPeriodTo } = getPlotPeriod(currentDate, timeGroupingType);

    const dateRangeType = "&dateRangeType=CUSTOM";
    const period =
      plotPeriodFrom && plotPeriodTo ? `&plotPeriodFrom=${plotPeriodFrom}&plotPeriodTo=${plotPeriodTo}` : "";
    const series = seriesName ? `&seriesName=${seriesName}` : "";
    const programAndEcosystemIds = selectedProgramAndEcosystem?.length
      ? `&programAndEcosystemIds=${selectedProgramAndEcosystem?.join(",")}`
      : "";

    const basePath =
      dataViewTarget === "contributor" ? NEXT_ROUTER.data.contributors.root : NEXT_ROUTER.data.projects.root;

    router.push(`${basePath}?${dateRangeType}${period}${series}${programAndEcosystemIds}`);
  }

  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
        spacingTop: 0,
        alignThresholds: true,
      },
      credits: {
        enabled: false, // Disable the credits
      },
      title: {
        text: title,
        style: titleStyle,
      },
      xAxis: {
        categories,
        labels: {
          style: yAxisQuaternaryStyle,
        },
        crosshair: false,
        lineWidth: 0,
      },
      yAxis: [
        {
          min: min ?? 0,
          title: {
            text: yAxisTitle?.[0],
            style: yAxisQuaternaryStyle,
          },
          labels: {
            enabled: false,
            style: yAxisQuaternaryStyle,
          },
          stackLabels: {
            enabled: false, // Disable stack labels to hide totals
          },
          gridLineColor: "var(--border-primary)",
        },
        {
          min: min ?? 0,
          title: {
            text: yAxisTitle?.[1],
            style: yAxisPrimaryStyle,
          },
          labels: {
            enabled: false,
            style: yAxisPrimaryStyle,
          },
          opposite: true,
          gridLineColor: "var(--border-primary)",
        },
      ],
      legend: {
        ...legend,
        itemStyle: legendStyle,
        itemHoverStyle: legendStyle,
        enabled: false,
      },
      tooltip: {
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        useHTML: true,
        shared: true,
        headerFormat: "<div class='font-medium mb-xs'>{point.key}</div>",
        formatter() {
          let tooltipContent = `<div class='font-medium mb-xs'>${this.x}</div>`;

          this.points?.forEach(point => {
            const value = Object.is(point.y, -0) ? 0 : point.y;
            const isMoneyValue = [t("data:histograms.legends.granted"), t("data:histograms.legends.rewarded")].includes(
              point.series.name
            );

            const formattedValue = isMoneyValue
              ? (() => {
                  const { amount, code } = moneyKernelPort.format({
                    amount: value ?? 0,
                    currency: moneyKernelPort.getCurrency("USD"),
                  });
                  return `${amount} ${code}`;
                })()
              : Intl.NumberFormat().format(value ?? 0);

            tooltipContent += `<div class='flex gap-sm items-center'>
              <div class='rounded h-3 min-h-3 w-3 min-w-3' style='background-color: ${point.color}'></div>
              <span class='text-typography-secondary'>${point.series.name}</span>
              <span class='font-medium'>${formattedValue}</span>
            </div>`;
          });

          return tooltipContent;
        },
        positioner(labelWidth, labelHeight, point) {
          const _point = point as ExtendedTooltipPositionerPointObject;
          const x = _point.plotX + this.chart.plotLeft - labelWidth / 2;
          let y = _point.plotY - labelHeight;

          if (_point.negative) {
            y = _point.plotY - _point.h - labelHeight;
          }

          return { x, y };
        },
        outside: true,
        ...tooltip,
      },
      plotOptions: {
        column: {
          stacking: "normal",
          point: {
            events: {
              click() {
                handleChartClick({
                  dataViewTarget,
                  plotPeriod: this.category.toString(),
                  seriesName: this.series.name,
                  seriesValue: this.y,
                });
              },
            },
          },
        },
        areaspline: {
          stacking: "normal",
          point: {
            events: {
              click() {
                handleChartClick({
                  dataViewTarget,
                  plotPeriod: this.category.toString(),
                  seriesValue: this.y,
                });
              },
            },
          },
        },
        series: {
          borderRadius: 6, // Set the radius for rounded corners
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: series.map<SeriesColumnOptions | SeriesAreasplineOptions>((s, index) => ({
        type: s.type ?? "column",
        name: s.name,
        data: s.data as HighchartsSerieData,
        color: s.type === "areaspline" ? "#C434FF" : colors[index % colors.length],
        yAxis: s.type === "areaspline" ? 1 : undefined,
        fillColor: "transparent",
        marker:
          s.type === "areaspline"
            ? {
                enabled: false,
                radius: 2,
                fillColor: "white", // Set the marker color to white
                lineColor: "white", // Optional: set the border color of the marker to white
              }
            : undefined,
        lineColor: s.type === "areaspline" ? "#ffffff" : undefined,
        lineWidth: 2,
      })),
    }),
    [title, min, moneyKernelPort, categories, series, yAxisTitle, xAxisTitle, colors, legend, tooltip]
  );

  return { options };
}
