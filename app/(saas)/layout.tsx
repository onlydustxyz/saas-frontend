"use client";

import "keen-slider/keen-slider.min.css";
import { PropsWithChildren } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { SaasProviders } from "@/app/(saas)/saas-providers";

import { AppHeader } from "@/shared/features/app/app-header/app-header";
import { AppSidebar } from "@/shared/features/app/app-sidebar/app-sidebar";
import { ImpersonationBanner } from "@/shared/features/impersonation/impersonation-banner";
import { IndexingBanner } from "@/shared/features/indexing/indexing-banner";
import { SidebarInset } from "@/shared/ui/sidebar";

export default function SaasLayout({ children }: PropsWithChildren) {
  return (
    <SaasProviders>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
        <ImpersonationBanner />
        <IndexingBanner />
      </SidebarInset>
    </SaasProviders>
  );
}
