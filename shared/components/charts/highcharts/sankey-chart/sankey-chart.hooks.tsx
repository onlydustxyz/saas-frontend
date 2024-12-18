import { Options, SeriesClickEventObject, SeriesSankeyPointOptionsObject } from "highcharts";
import Highcharts from "highcharts";
import SankeyModule from "highcharts/modules/sankey";
import { useMemo } from "react";

import { tooltipInnerStyle, tooltipWrapperStyle } from "@/shared/components/charts/highcharts/highcharts.styles";
import {
  HighchartsOptionsParams,
  HighchartsOptionsReturn,
} from "@/shared/components/charts/highcharts/highcharts.types";

// Initialise le module Sankey
SankeyModule(Highcharts);

export function useSankeyChartOptions({
  title,
  series,
  xAxisTitle,
  colors = ["#460066", "#7A0EBB", "#A03AE9", "#F04438"],
  legend,
  tooltip,
  min,
  yAxis,
  onAction,
}: HighchartsOptionsParams): HighchartsOptionsReturn {
  const { nodes, data } = series[0];
  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: "transparent",
        plotBackgroundColor: "rgba(255, 255, 255, 0)",
      },
      credits: {
        enabled: false, // Disable the credits
      },
      title: undefined,
      tooltip: {
        ...tooltipWrapperStyle,
        style: tooltipInnerStyle,
        useHTML: true, // Allow HTML formatting
        pointFormat: "{point.fromNode.name} → {point.toNode.name}: {point.weight}€",
        outside: true,
        ...tooltip,
      },
      plotOptions: {
        sankey: {
          cursor: "pointer",
          events: {
            click(e: SeriesClickEventObject) {
              if (e.point.options.from) {
                onAction?.(e.point.options.from);
              }
            },
          },
        },
      },
      series: [
        {
          type: "sankey",
          keys: ["from", "to", "weight"],
          nodes,
          data: data as SeriesSankeyPointOptionsObject[],
          name: "Cash Flow",
        },
      ],
    }),
    [title, min, nodes, data, yAxis, xAxisTitle, colors, legend, tooltip]
  );

  return { options };
}
