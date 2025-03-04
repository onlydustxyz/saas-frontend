import { CircleDot } from "lucide-react";
import dynamic from "next/dynamic";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function AppUserIssues() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <CircleDot />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My issues</SheetTitle>
          <SheetDescription>Issues that you are currently working on.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-auto">
          <Card className="flex flex-col gap-3 p-3">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage
                    src={"https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6209736716945476626.png"}
                    alt={"Project name"}
                  />
                  {/* <AvatarFallback className="size-4 rounded-md"></AvatarFallback> */}
                </Avatar>

                <TypographyH4 className="line-clamp-1">Juno</TypographyH4>
              </div>

              <Button size="sm">Submit</Button>
            </header>
            <div className={"flex items-center justify-between gap-3"}>
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge type={"ISSUE"} number={42} githubStatus={"OPEN"} />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>{"🐛 Fix the scrolling bug"}</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>24th Mar.</TypographyMuted>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-3">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage
                    src={"https://onlydust-app-images.s3.eu-west-1.amazonaws.com/eaf784a3782019b771fe239f4ef0a233.jpeg"}
                    alt={"Project name"}
                  />
                  {/* <AvatarFallback className="size-4 rounded-md"></AvatarFallback> */}
                </Avatar>

                <TypographyH4 className="line-clamp-1">SpotNet</TypographyH4>
              </div>

              <Badge variant={"secondary"}>Pending</Badge>
            </header>
            <div className={"flex items-center justify-between gap-3"}>
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge type={"ISSUE"} number={156} githubStatus={"OPEN"} />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>Bad formatting</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>25th Mar.</TypographyMuted>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-3">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage
                    src={"https://onlydust-app-images.s3.eu-west-1.amazonaws.com/566368398222658517.png"}
                    alt={"Project name"}
                  />
                  {/* <AvatarFallback className="size-4 rounded-md"></AvatarFallback> */}
                </Avatar>

                <TypographyH4 className="line-clamp-1">Dojo</TypographyH4>
              </div>

              <Badge variant={"success"}>Accepted</Badge>
            </header>
            <div className={"flex items-center justify-between gap-3"}>
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge type={"ISSUE"} number={666} githubStatus={"OPEN"} />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>Fix mobile responsiveness</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>26th Mar.</TypographyMuted>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-3">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage
                    src={"https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6c16a3ab8574e3f64c0ceee03f581c8b.png"}
                    alt={"Project name"}
                  />
                  {/* <AvatarFallback className="size-4 rounded-md"></AvatarFallback> */}
                </Avatar>

                <TypographyH4 className="line-clamp-1">Kakarot</TypographyH4>
              </div>

              <Badge variant={"destructive"}>Rejected</Badge>
            </header>
            <div className={"flex items-center justify-between gap-3"}>
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge type={"ISSUE"} number={404} githubStatus={"OPEN"} />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>DB queries are too slow</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>27th Mar.</TypographyMuted>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
