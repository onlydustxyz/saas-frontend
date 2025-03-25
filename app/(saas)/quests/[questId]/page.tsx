"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { QuestListData } from "../_data/quest-list.data";
import PageHeader from "./_features/page-header/page-header";
import { QuestContent } from "./_features/quest-content/quest-content";

function QuestPage({ params }: { params: { questId: string } }) {
  const quest = QuestListData.find(quest => quest.id === params.questId);
  return (
    <PageContainer>
      <div className="flex flex-col gap-4xl pt-10">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Quests",
              href: NEXT_ROUTER.quests.root,
            },
            {
              id: "quest",
              label: quest?.name ?? "",
            },
          ]}
        />

        <PageHeader questId={params.questId} />
        <QuestContent questId={params.questId} />
        <ContributorSidepanel />
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(QuestPage));
