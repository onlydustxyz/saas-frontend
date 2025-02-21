"use client";

import { useState } from "react";

import { HackathonEventMenu } from "@/app/(saas)/osw/[hackathonSlug]/_components/hackathon-events-menu/hackathon-events-menu";
import { HackathonEventMenuItem } from "@/app/(saas)/osw/[hackathonSlug]/_components/hackathon-events-menu/hackathon-events-menu.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Paper, PaperLoading } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { cn } from "@/shared/helpers/cn";

import { HackathonEventsProps } from "./hackathon-events.types";

export function HackathonEvents({ hackathonSlug }: HackathonEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<HackathonEventMenuItem>(HackathonEventMenuItem.ALL_EVENTS);

  const dateKernelPort = bootstrap.getDateKernelPort();

  const periods = {
    [HackathonEventMenuItem.ALL_EVENTS]: {
      fromDate: undefined,
      toDate: undefined,
    },
    [HackathonEventMenuItem.PAST_EVENTS]: {
      fromDate: undefined,
      toDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
    },
    [HackathonEventMenuItem.UPCOMING_EVENTS]: {
      fromDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
      toDate: undefined,
    },
  };

  const { data, isLoading, isError } = HackathonReactQueryAdapter.client.useGetHackathonEvents({
    pathParams: {
      hackathonSlug,
    },
    queryParams: {
      fromDate: periods[selectedEvent].fromDate,
      toDate: periods[selectedEvent].toDate,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !data) return null;

  return (
    <Paper
      background="primary"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="flex items-center justify-between p-xl">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "osw:details.events.title" }}
        />

        <HackathonEventMenu selectedEvent={selectedEvent} onAction={setSelectedEvent} />
      </div>

      {data.events.length ? (
        [...data.events].reverse().map(event => {
          const formattedDates = event.formatDisplayDates();

          return (
            <div
              key={event.name}
              className={cn("flex items-start gap-xl p-xl", {
                "opacity-50": event.isPast(),
              })}
            >
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-[#121212]">
                <div className="flex flex-col text-center">
                  <Typo size="xs">{formattedDates.startMonth}</Typo>
                  <Typo size="xs" weight="medium">
                    {formattedDates.startDay}
                  </Typo>
                </div>
              </div>

              <div className="flex flex-col gap-md">
                <div className="flex flex-col">
                  <Typo size="sm" weight="bold">
                    {event.name}
                  </Typo>
                  <Typo size="xs" color="tertiary">
                    {event.subtitle}
                  </Typo>
                </div>

                <Typo size="xs">
                  {formattedDates.startDate} - {formattedDates.startTime}
                </Typo>

                {event?.links.length ? (
                  <div className="flex gap-sm">
                    {event.links.map(({ url, value }) => (
                      <Button key={url} variant="secondary" size={"xs"} as={BaseLink} htmlProps={{ href: url }}>
                        {value}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex h-full items-center justify-center">
                <RemixIcon name={event.iconSlug as RemixIconsName} classNames={{ base: "text-foreground-tertiary" }} />
              </div>
            </div>
          );
        })
      ) : (
        <EmptyStateLite />
      )}
    </Paper>
  );
}
