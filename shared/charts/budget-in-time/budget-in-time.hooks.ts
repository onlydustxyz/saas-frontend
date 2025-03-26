import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetBiStatsFinancialsModel } from "@/core/domain/bi/bi-contract.types";
import { BiStatsFinancialsResponse } from "@/core/domain/bi/models/bi-stats-financials-model";

export function useBudgetInTimeChart(stats?: GetBiStatsFinancialsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(`${stat.date}T00:00:00`), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof BiStatsFinancialsResponse) => {
    return stats?.map(stat => stat?.getStatTotalUsdEquivalent(key)) ?? [];
  };

  const allocatedSeries = calculateSeries("totalAllocated");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  const minAllocated = Math.min(...allocatedSeries.map(value => value));
  const minGranted = Math.min(...grantedSeries.map(value => value));
  const minRewarded = Math.min(...rewardedSeries.map(value => value));
  const minTotal = Math.min(minAllocated, minGranted, minRewarded);

  const allocatedTotal = useMemo(() => allocatedSeries.reduce((acc, value) => acc + value, 0), [allocatedSeries]);
  const grantedTotal = useMemo(() => grantedSeries.reduce((acc, value) => acc + value, 0), [grantedSeries]);
  const rewardedTotal = useMemo(() => rewardedSeries.reduce((acc, value) => acc + value, 0), [rewardedSeries]);

  return {
    categories,
    allocatedSeries,
    grantedSeries,
    rewardedSeries,
    minTotal,
    allocatedTotal,
    grantedTotal,
    rewardedTotal,
  };
}
