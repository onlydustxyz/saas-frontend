import { ChartPie, ClipboardPaste, FolderHeart, User } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

export function ContributorGroup() {
  const { user } = useAuthUser();
  const isContributionsRoute = useMatchPath(NEXT_ROUTER.myDashboard.contributions.root, { exact: false });
  const isProjectsRoute = useMatchPath(NEXT_ROUTER.myDashboard.projects.root, { exact: false });
  const isRewardsRoute = useMatchPath(NEXT_ROUTER.myDashboard.rewards.root, { exact: false });
  const isProfileRoute = useMatchPath(NEXT_ROUTER.users.details.root(user?.login ?? ""), { exact: false });
  const isForcedOnboarding = useForcedOnboarding();

  const items = [
    {
      title: "Contributions",
      url: NEXT_ROUTER.myDashboard.contributions.root,
      icon: ClipboardPaste,
      isActive: isContributionsRoute,
    },
    {
      title: "Projects",
      url: NEXT_ROUTER.myDashboard.projects.root,
      icon: FolderHeart,
      isActive: isProjectsRoute,
    },
    {
      title: "Rewards",
      url: NEXT_ROUTER.myDashboard.rewards.root,
      icon: ChartPie,
      isActive: isRewardsRoute,
    },
  ];

  const itemsToShow = isForcedOnboarding ? items.slice(0, 1) : items;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Contributor</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {itemsToShow.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {user && !isForcedOnboarding ? (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Public Profile" isActive={isProfileRoute}>
                <Link href={NEXT_ROUTER.users.details.root(user.login)}>
                  <User />
                  <span>Public Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
