import { PropsWithChildren } from "react";

import { NavigationProvider } from "@/shared/features/navigation/navigation.context";
import { RecommendedStateProvider } from "@/shared/providers/recommended-state";
import { SidebarProvider } from "@/shared/ui/sidebar";

export function SaasProviders({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <NavigationProvider>
        <RecommendedStateProvider>{children}</RecommendedStateProvider>
      </NavigationProvider>
    </SidebarProvider>
  );
}
