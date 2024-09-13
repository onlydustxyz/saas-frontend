import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiContributorsStatsResponse } from "@/core/domain/bi/models/bi-contributors-stats-model";

import { Typo } from "@/design-system/atoms/typo";

export function useContributorHistogramChart(stats?: GetBiContributorsStatsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "MMMM yyyy")) ?? [];

  function calculateSeries(key: keyof Omit<BiContributorsStatsResponse, "timestamp">) {
    return stats?.map(stat => stat[key]) ?? [];
  }

  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");
  const mergedPrSeries = calculateSeries("mergedPrCount");
  const newContributorSeries = calculateSeries("newContributorCount");
  const activeContributorSeries = calculateSeries("activeContributorCount");
  const reactivatedContributorSeries = calculateSeries("reactivatedContributorCount");
  const churnedContributorSeries = calculateSeries("churnedContributorCount");

  const renderAmount = useCallback(
    (amountSum: number) => {
      return (
        <div className="flex gap-1">
          <Typo size={"xs"} color={"primary"}>
            {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).amount}
          </Typo>
          <Typo size={"xs"} color={"primary"}>
            {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).code}
          </Typo>
        </div>
      );
    },
    [moneyKernelPort]
  );

  const renderDevsCount = useCallback((countSum: number) => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"primary"}>
          {countSum}
        </Typo>
        <Typo size={"xs"} color={"primary"} translate={{ token: "data:contributorsHistogram.legends.devs" }} />
      </div>
    );
  }, []);

  const renderPrCount = useCallback((countSum: number) => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"primary"}>
          {countSum}
        </Typo>
        <Typo size={"xs"} color={"primary"} translate={{ token: "data:contributorsHistogram.legends.pr" }} />
      </div>
    );
  }, []);

  const renderGrantedAmount = useMemo(
    () => renderAmount(grantedSeries.reduce((a, c) => a + c, 0)),
    [grantedSeries, renderAmount]
  );
  const renderRewardedAmount = useMemo(
    () => renderAmount(rewardedSeries.reduce((a, c) => a + c, 0)),
    [rewardedSeries, renderAmount]
  );
  const renderMergedPrCount = useMemo(
    () => renderPrCount(mergedPrSeries.reduce((a, c) => a + c, 0)),
    [mergedPrSeries, renderPrCount]
  );
  const renderNewContributorCount = useMemo(
    () => renderDevsCount(newContributorSeries.reduce((a, c) => a + c, 0)),
    [newContributorSeries, renderDevsCount]
  );
  const renderActiveContributorCount = useMemo(
    () => renderDevsCount(activeContributorSeries.reduce((a, c) => a + c, 0)),
    [activeContributorSeries, renderDevsCount]
  );
  const renderReactivatedContributorCount = useMemo(
    () => renderDevsCount(reactivatedContributorSeries.reduce((a, c) => a + c, 0)),
    [reactivatedContributorSeries, renderDevsCount]
  );
  const renderChurnedContributorCount = useMemo(
    () => renderDevsCount(churnedContributorSeries.reduce((a, c) => a + c, 0)),
    [churnedContributorSeries, renderDevsCount]
  );

  return {
    categories,
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
    renderGrantedAmount,
    renderRewardedAmount,
    renderMergedPrCount,
    renderNewContributorCount,
    renderActiveContributorCount,
    renderReactivatedContributorCount,
    renderChurnedContributorCount,
  };
}
