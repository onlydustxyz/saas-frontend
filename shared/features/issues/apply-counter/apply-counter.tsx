import { useMemo } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Progress } from "@/shared/ui/progress";
import { TypographyMuted } from "@/shared/ui/typography";

import { ApplyCounterProps } from "./apply-counter.types";

export function ApplyCounter({ children }: ApplyCounterProps) {
  const { data } = MeReactQueryAdapter.client.useGetMyApplications({});

  const currentApplicationPercent = useMemo(() => {
    if (!data?.applicationCountOnLiveHackathon) {
      return 0;
    }

    if (data.applicationCountOnLiveHackathon >= 10) {
      return 100;
    }

    return data.applicationCountOnLiveHackathon * 10;
  }, [data]);

  const currentApplication = useMemo(() => {
    if (!data) return 0;

    if (data?.isMaxApplicationsOnLiveHackathonReached()) {
      return "+10";
    }

    return data.applicationCountOnLiveHackathon;
  }, [data]);

  if (!data) return null;

  return (
    <>
      {children}
      <div className="flex flex-col items-end gap-1">
        <TypographyMuted>
          {currentApplication} applications / {data.maxApplicationsOnLiveHackathon} remaining
        </TypographyMuted>
        <Progress value={currentApplicationPercent} max={data.maxApplicationsOnLiveHackathon * 10} />
      </div>
    </>
  );
}
