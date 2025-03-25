import logoWhite from "@/public/images/logos/logo-white.svg";
import { CircleDot, Folder, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { Typo } from "@/design-system/atoms/typo";

import { Stat } from "@/shared/components/stat/stat";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { BackgroundGradient } from "@/shared/ui/background-gradient";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

export function ProjectContributeNowHackathon({ projectId = "" }: { projectId?: string }) {
  const { capture } = usePosthog();
  const { data, isLoading, isError } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const hackathon = useMemo(
    () =>
      data?.hackathons
        .filter(hackathon => hackathon.isLive())
        .find(hackathon => hackathon.projects?.some(project => project.id === projectId)),
    [data?.hackathons, projectId]
  );

  if (isLoading) {
    return <Skeleton className="h-[275px]" />;
  }

  if (!hackathon || isError) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-3 p-3">
      <TypographyH4>Open Source Week in progress</TypographyH4>

      <TypographyP className="text-sm">
        Now is the best time to contribute to this project!
        <br />
        It&apos;s currently in an Open Source Week.
      </TypographyP>

      <BackgroundGradient gradientClassName="rounded-2xl">
        <Link href={NEXT_ROUTER.osw.details.root(hackathon.slug)}>
          <Card
            className="p-0"
            onClick={() => {
              capture("project_overview_contribute_now_click_osw", { project_id: projectId });
            }}
          >
            <div className="relative z-[1] flex flex-col divide-y divide-border-primary">
              <div className="flex items-center justify-between gap-xl px-xl py-lg">
                <div className="flex items-center gap-xl">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-utility-brand-electricroyalblue-600 outline outline-2 -outline-offset-1 outline-components-avatar-border">
                    <Image src={logoWhite} alt={hackathon.title} width={24} height={24} className={"size-6"} />
                  </div>

                  <Typo size={"xs"} variant="heading">
                    {hackathon.title}
                  </Typo>
                </div>

                <Button className="shrink-0" asChild>
                  <Link href={NEXT_ROUTER.osw.details.root(hackathon.slug)}>Join</Link>
                </Button>
              </div>

              <div className="grid w-full border-b-1 border-border-primary mobile:grid-cols-3 mobile:py-4">
                <div className="border-b-1 border-border-primary p-4 mobile:border-b-0 mobile:border-r-1 mobile:py-0">
                  <Stat
                    label={"Registered"}
                    value={Intl.NumberFormat().format(hackathon.subscriberCount)}
                    iconProps={{
                      component: User,
                      classNames: {
                        base: "text-utility-secondary-yellow-500",
                      },
                    }}
                  />
                </div>
                <div className="border-b-1 border-border-primary p-4 mobile:border-b-0 mobile:border-r-1 mobile:py-0">
                  <Stat
                    label={"Issues available"}
                    value={`${Intl.NumberFormat().format(hackathon.openIssueCount)}/${Intl.NumberFormat().format(hackathon.issueCount)}`}
                    iconProps={{
                      component: CircleDot,
                      classNames: {
                        base: "text-utility-secondary-green-500",
                      },
                    }}
                  />
                </div>
                <div className="p-4 mobile:py-0">
                  <Stat
                    label={"Projects"}
                    value={Intl.NumberFormat().format(hackathon.projects?.length ?? 0)}
                    iconProps={{
                      component: Folder,
                      classNames: {
                        base: "text-utility-secondary-blue-500",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </BackgroundGradient>
    </Card>
  );
}
