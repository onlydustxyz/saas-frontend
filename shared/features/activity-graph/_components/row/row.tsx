import { useMemo } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { getWeekNumber } from "../../utils/getWeekNumber";
import { Week } from "../week/week";
import { ActivityGraphRowProps } from "./row.types";

export function Row({ weeks, data, asLabel, isLastRow }: ActivityGraphRowProps) {
  const lastWeek = useMemo(() => weeks.at(-1), [weeks]);
  const weekNumber = useMemo(
    () => (lastWeek ? getWeekNumber(lastWeek.startDate, { hideMonths: true }) : undefined),
    [lastWeek]
  );

  const findData = (weekId: string) => {
    return data?.[weekId];
  };

  const label = useMemo(() => {
    return (
      <>
        <Translate token={"features:activityGraph.week"} /> {weekNumber}
      </>
    );
  }, [isLastRow]);

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <div className="flex w-full flex-row items-center justify-start gap-1.5">
        {weeks.map(week => (
          <Week week={week} key={week.id} data={findData(week.id)} />
        ))}
      </div>
      {asLabel ? (
        <Typo
          size={"xs"}
          as="div"
          color={"primary"}
          classNames={{
            base: cn("text-spaceBlue-300 w-full whitespace-nowrap", { "text-spacePurple-500": isLastRow }),
          }}
        >
          {label}
        </Typo>
      ) : (
        <div />
      )}
    </div>
  );
}
