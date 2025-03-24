import { ArrowRight, Bot, Compass, FolderSearch, LayoutList, Lightbulb, Orbit, Rocket, Target } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { GlowingEffect } from "@/shared/ui/glowing-effect";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

export function ExploreGroup() {
  const { capture } = usePosthog();
  const isDiscoverRoute = useMatchPath(NEXT_ROUTER.discover.root, { exact: false });
  const isBrowseRoute = useMatchPath(NEXT_ROUTER.projects.root, { exact: false });
  const isOswRoute = useMatchPath(NEXT_ROUTER.osw.root, { exact: false });
  const isEcosystemsRoute = useMatchPath(NEXT_ROUTER.ecosystems.root, { exact: false });
  const isOdSayRoute = useMatchPath(NEXT_ROUTER.odSay.root, { exact: false });
  const isProjectRecommendationRoute = useMatchPath(NEXT_ROUTER.projectRecommendation.root, { exact: false });
  const isQuestRoute = useMatchPath(NEXT_ROUTER.quests.root, { exact: false });
  const isForcedOnboarding = useForcedOnboarding();

  const items = [
    {
      title: "Discover",
      url: NEXT_ROUTER.discover.root,
      icon: Compass,
      isActive: isDiscoverRoute,
    },
    {
      title: "Browse",
      url: NEXT_ROUTER.projects.root,
      icon: FolderSearch,
      isActive: isBrowseRoute,
    },
    {
      title: "Open-Source Week",
      url: NEXT_ROUTER.osw.root,
      icon: Rocket,
      isActive: isOswRoute,
    },
    {
      title: "ODQuests",
      url: NEXT_ROUTER.quests.root,
      icon: Target,
      isActive: isQuestRoute,
      isNew: true,
    },
    {
      title: "Ecosystems",
      url: NEXT_ROUTER.ecosystems.root,
      icon: Orbit,
      isActive: isEcosystemsRoute,
    },
  ];

  const itemsToShow = isForcedOnboarding
    ? [
        {
          title: "Discover",
          url: NEXT_ROUTER.discover.root,
          icon: Compass,
          isActive: isDiscoverRoute,
        },
        {
          title: "Open-Source Week",
          url: NEXT_ROUTER.osw.root,
          icon: Rocket,
          isActive: isOswRoute,
        },
        {
          title: "ODQuests",
          url: NEXT_ROUTER.quests.root,
          icon: Target,
          isActive: isQuestRoute,
          isNew: true,
        },
      ]
    : items;

  const showRecommendations = !isForcedOnboarding;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {itemsToShow.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  {item.isNew && (
                    <Badge variant="emphasis" className="ml-auto">
                      New
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {showRecommendations ? (
            <Dialog>
              <DialogTrigger asChild onClick={() => capture("project_recommendation_modal_opened")}>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Recommendations" isActive={isOdSayRoute || isProjectRecommendationRoute}>
                    <Lightbulb />
                    <span>Recommendations</span>

                    <Badge variant="emphasis" className="ml-auto">
                      New
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </DialogTrigger>

              <DialogContent className="w-screen max-w-screen-sm">
                <DialogHeader className="flex flex-col gap-5">
                  <DialogTitle>How would you like to find projects?</DialogTitle>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <DialogClose asChild onClick={() => capture("project_recommendation_modal_form_clicked")}>
                      <Link
                        href={NEXT_ROUTER.projectRecommendation.root}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                      >
                        <Card className="relative">
                          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

                          <CardHeader className="flex flex-col gap-2">
                            <LayoutList className="size-8 text-cyan-200" />

                            <div className="flex flex-col gap-1.5">
                              <CardTitle className="text-left text-cyan-100">Form-based</CardTitle>

                              <CardDescription className="text-left">
                                Find a project using the project recommendation form.
                              </CardDescription>
                            </div>

                            <Button variant="outline" className="w-fit">
                              Complete the form
                              <ArrowRight />
                            </Button>
                          </CardHeader>
                        </Card>
                      </Link>
                    </DialogClose>

                    <DialogClose asChild onClick={() => capture("project_recommendation_modal_chat_clicked")}>
                      <Link
                        href={NEXT_ROUTER.odSay.root}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                      >
                        <Card className="relative">
                          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

                          <CardHeader className="flex flex-col gap-2">
                            <Bot className="size-8 text-purple-200" />

                            <div className="flex flex-col gap-1.5">
                              <CardTitle className="text-left text-purple-100">Chat-based</CardTitle>

                              <CardDescription className="text-left">
                                Chat with OD-Say to find your perfect project.
                              </CardDescription>
                            </div>

                            <Button variant="outline" className="w-fit">
                              Start a conversation
                              <ArrowRight />
                            </Button>
                          </CardHeader>
                        </Card>
                      </Link>
                    </DialogClose>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : null}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
