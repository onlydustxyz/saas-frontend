import { bootstrap } from "@/core/bootstrap";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { HighchartsSerieData, PieDataType } from "@/shared/components/charts/highcharts/highcharts.types";

export function isPieDataType(data: HighchartsSerieData[0]): data is PieDataType {
  return (data as PieDataType).y !== undefined;
}

function getPlotPeriodRange(currentDate: Date, timeGroupingType: TimeGroupingType) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  switch (timeGroupingType) {
    case "DAY":
      return {
        from: currentDate,
        to: currentDate,
      };
    case "WEEK":
      return dateKernelPort.getWeekRange(currentDate);
    case "MONTH":
    case "QUARTER":
      return dateKernelPort.getMonthRange(currentDate);
    case "YEAR":
      return dateKernelPort.getYearRange(currentDate);
    default:
      return {
        from: undefined,
        to: undefined,
      };
  }
}

export function getPlotPeriod(
  currentDate: Date,
  timeGroupingType?: TimeGroupingType
): { plotPeriodFrom?: string; plotPeriodTo?: string } {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const isDateValid = dateKernelPort.isValid(currentDate) && timeGroupingType;

  if (!isDateValid) {
    return { plotPeriodFrom: undefined, plotPeriodTo: undefined };
  }

  const { from, to } = getPlotPeriodRange(currentDate, timeGroupingType);

  return {
    plotPeriodFrom: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
    plotPeriodTo: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
  };
}
