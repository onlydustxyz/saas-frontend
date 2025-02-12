"use client";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

import Chat from "./_features/chat/chat";

export default function ODSay() {
  return (
    <PageContainer size="large" className="flex-1">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "OD-Say",
          },
        ]}
      />
      <PageContent classNames={{ base: "flex h-full overflow-auto w-full flex flex-col items-center" }}>
        <Chat />
      </PageContent>
    </PageContainer>
  );
}
