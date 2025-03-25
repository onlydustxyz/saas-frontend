"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { useDefaultPeriod } from "@/shared/features/filters/period-filter/period-filter.hooks";
import { PeriodValue } from "@/shared/features/filters/period-filter/period-filter.types";
import { useDeleteMultipleSearchParams } from "@/shared/hooks/router/use-delete-search-params";
import { useUpdateMultipleSearchParams } from "@/shared/hooks/router/use-update-search-params";

interface GlobalDataFilterContextInterface {
  selectedProgramAndEcosystem: string[];
  setSelectedProgramAndEcosystem: (selectedProgramAndEcosystem: string[]) => void;
  period: PeriodValue;
  setPeriod: (period: PeriodValue) => void;
  periodSearchParams: PeriodValue;
  params: string;
}

const GlobalDataFilterContext = createContext<GlobalDataFilterContextInterface>({
  selectedProgramAndEcosystem: [],
  setSelectedProgramAndEcosystem: () => {},
  period: { from: "", to: "", rangeType: DateRangeType.LAST_SEMESTER },
  setPeriod: () => {},
  periodSearchParams: { from: "", to: "", rangeType: DateRangeType.LAST_SEMESTER },
  params: "",
});

export function GlobalDataFilterProvider({ children }: PropsWithChildren) {
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);
  const defaultPeriod = useDefaultPeriod();
  const searchParams = useSearchParams();
  const [period, setPeriod] = useState<PeriodValue>({
    from: searchParams.get("period.from") ?? defaultPeriod.from,
    to: searchParams.get("period.to") ?? defaultPeriod.to,
    rangeType: (searchParams.get("period.range") as DateRangeType) ?? defaultPeriod.rangeType,
  });

  const { updateMultipleSearchParams } = useUpdateMultipleSearchParams();
  const { deleteMultipleSearchParams } = useDeleteMultipleSearchParams();

  const periodSearchParams: PeriodValue = useMemo(() => {
    return {
      from: searchParams.get("period.from") ?? defaultPeriod.from,
      to: searchParams.get("period.to") ?? defaultPeriod.to,
      rangeType: (searchParams.get("period.range") as DateRangeType) ?? defaultPeriod.rangeType,
    };
  }, [searchParams, defaultPeriod]);

  function onPeriodChange(period: PeriodValue) {
    setPeriod(period);

    if (period.from && period.to) {
      updateMultipleSearchParams({
        "period.from": period.from,
        "period.to": period.to,
        "period.range": period.rangeType,
      });
    } else {
      deleteMultipleSearchParams(["period.from", "period.to", "period.range"]);
    }
  }

  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString()).toString();
  }, [searchParams]);

  return (
    <GlobalDataFilterContext.Provider
      value={{
        selectedProgramAndEcosystem,
        setSelectedProgramAndEcosystem,
        period,
        setPeriod: onPeriodChange,
        periodSearchParams,
        params,
      }}
    >
      {children}
    </GlobalDataFilterContext.Provider>
  );
}

export function useGlobalDataFilter() {
  return useContext(GlobalDataFilterContext);
}
