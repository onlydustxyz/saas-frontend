import { SplineType } from "@/app/(saas)/data/_components/histograms/menus/spline-type-menu/spline-type-menu.types";

import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsStatsModel, GetBiProjectsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export function buildCategories({
  stats,
  timeGroupingType,
}: {
  stats: GetBiContributorsStatsModel["stats"] | GetBiProjectsStatsModel["stats"];
  timeGroupingType: TimeGroupingType;
}) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  if (timeGroupingType === TimeGroupingType.DAY || timeGroupingType === TimeGroupingType.WEEK) {
    return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "yyyy-MM-dd")) ?? [];
  }

  if (timeGroupingType === TimeGroupingType.YEAR) {
    return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "yyyy")) ?? [];
  }

  return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "MMMM yyyy")) ?? [];
}

export function isSplineType(value: string): value is SplineType {
  return Object.values(SplineType).includes(value as SplineType);
}
