import { Options, SeriesSankeyNodesOptionsObject, SeriesSankeyPointOptionsObject } from "highcharts";

import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

interface Marker {
  enabled: boolean;
  radius: number;
}

interface Tooltip {
  valueSuffix: string;
}

interface MapDataType {
  "iso-a2": string;
  value: number;
  color: string;
}

interface YAxis {
  title: string[];
  visible?: boolean;
}

export interface PieDataType {
  y: number;
  name: string;
  color: string;
}

export type HighchartsSerieData = number[] | MapDataType[] | PieDataType[];

type DataViewTarget = "contributor" | "projects";

export interface HighchartsOptionsParams {
  dataViewTarget?: DataViewTarget;
  dateRangeType?: DateRangeType;
  timeGroupingType?: TimeGroupingType;
  selectedProgramAndEcosystem?: string[];
  title?: string;
  categories?: string[];
  series: Array<{
    name?: string;
    data: HighchartsSerieData | SeriesSankeyPointOptionsObject[] | (string | number)[][];
    nodes?: SeriesSankeyNodesOptionsObject[];
    type?: "column" | "areaspline";
    lineWidth?: number;
    marker?: Marker;
    tooltip?: Tooltip;
    yAxis?: number;
    color?: string;
  }>;

  xAxisTitle?: string;
  colors?: string[];
  legend?: Options["legend"];
  tooltip?: Options["tooltip"];
  min?: number;
  height?: number;
  yAxis?: YAxis;
  onAction?: (dataSourceId: string) => void;
}

export interface HighchartsOptionsReturn {
  options: Options;
}

export interface HighchartsProps {
  options: Options;
  constructorType?: string;
}

export interface handleChartClickParams {
  dateRangeType?: string;
  dataViewTarget?: string;
  plotPeriod: string;
  seriesName?: string;
  seriesValue?: number;
}
