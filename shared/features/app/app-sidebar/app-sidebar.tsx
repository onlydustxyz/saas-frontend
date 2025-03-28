import logoWordmark from "@/public/images/logos/logo-color.svg";
import logo from "@/public/images/logos/logo-white.svg";
import Image from "next/image";

import { ContributorGroup } from "@/shared/features/app/app-sidebar/groups/contributor-group";
import { DataGroup } from "@/shared/features/app/app-sidebar/groups/data-group";
import { ExploreGroup } from "@/shared/features/app/app-sidebar/groups/explore-group";
import { MaintainerGroup } from "@/shared/features/app/app-sidebar/groups/maintainer-group";
import { ProgramGroup } from "@/shared/features/app/app-sidebar/groups/program-group";
import { SponsorGroup } from "@/shared/features/app/app-sidebar/groups/sponsor-group";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar } from "@/shared/ui/sidebar";

import { RenderComponent } from "../../render-component/render-component";
import { BookmarksGroup } from "./groups/bookmarks-group";

export function AppSidebar() {
  const { state } = useSidebar();
  const { isLoading } = useAuthUser();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="z-[40]">
      <SidebarHeader className="flex h-16 justify-center">
        {isCollapsed ? (
          <Image src={logo} alt={"OnlyDust"} width={24} height={24} className="self-center" />
        ) : (
          <Image src={logoWordmark} alt={"OnlyDust"} width={98} height={24} className="ml-2" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <ExploreGroup />

        <RenderComponent isLoading={isLoading}>
          <RenderComponent.Default>
            <ContributorGroup />

            <DataGroup />

            <MaintainerGroup />

            <ProgramGroup />

            <SponsorGroup />

            <BookmarksGroup />
          </RenderComponent.Default>
        </RenderComponent>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
