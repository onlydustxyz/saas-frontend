import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";
import { bootstrap } from "@/core/bootstrap";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { EcosystemEventMenu } from "../../_components/ecosystem-event-menu/ecosystem-event-menu";
import { EcosystemEventMenuItem } from "../../_components/ecosystem-event-menu/ecosystem-event-menu.types";
import { EcosystemEventsProps } from "./ecosystem-events.types";

export function EcosystemEvents({ ecosystemSlug }: EcosystemEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<EcosystemEventMenuItem>(EcosystemEventMenuItem.ALL_EVENTS);

  const dateKernelPort = bootstrap.getDateKernelPort();

  const periods = {
    [EcosystemEventMenuItem.ALL_EVENTS]: {
      fromDate: undefined,
      toDate: undefined,
    },
    [EcosystemEventMenuItem.PAST_EVENTS]: {
      fromDate: undefined,
      toDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
    },
    [EcosystemEventMenuItem.UPCOMING_EVENTS]: {
      fromDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
      toDate: undefined,
    },
  };

  const { data, isLoading, isError } = EcosystemReactQueryAdapter.client.useGetEcosystemEvents({
    pathParams: {
      slug: ecosystemSlug,
    },
    queryParams: {
      fromDate: periods[selectedEvent].fromDate,
      toDate: periods[selectedEvent].toDate,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  if (isLoading) {
    return (
      <Card className="h-[200px]">
        <Skeleton className="h-full w-full" />
      </Card>
    );
  }

  if (isError || !data) return null;

  return (
    <Card className="flex flex-col divide-y divide-border-primary">
      <div className="flex items-center justify-between p-6">
        <TypographyH4>Events</TypographyH4>

        <EcosystemEventMenu selectedEvent={selectedEvent} onAction={setSelectedEvent} />
      </div>

      {data.events.length ? (
        data.events.map(event => {
          const formattedDates = event.formatDisplayDates();

          return (
            <Link href={event.link} key={event.name}>
              <div
                className={cn("flex items-start gap-6 p-6", {
                  "opacity-50": event.isPast(),
                })}
              >
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-muted">
                  <div className="flex flex-col text-center">
                    <p className="text-sm text-foreground">{formattedDates.startMonth}</p>
                    <p className="text-sm font-medium text-foreground">{formattedDates.startDay}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>

                  <p className="text-sm text-foreground">
                    {formattedDates.startDate} - {formattedDates.startTime}
                  </p>
                </div>

                <div className="flex items-center self-center">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <EmptyStateLite />
      )}
    </Card>
  );
}
