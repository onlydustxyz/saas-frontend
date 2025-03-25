import { CloudDownload } from "lucide-react";
import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { RewardedCard } from "@/shared/features/rewards/rewarded-card/rewarded-card";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { ContributionsAccordion } from "@/shared/panels/reward-detail-sidepanel/_features/contributions-accordion/contributions-accordion";
import { RewardTimeline } from "@/shared/panels/reward-detail-sidepanel/_features/reward-timeline/reward-timeline";
import { useRewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.hooks";
import { RewardDetailSidepanelData } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.types";

function Content() {
  const { name } = useRewardDetailSidepanel();
  const { rewardId } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {};

  const {
    data: reward,
    isError,
    isLoading,
  } = RewardReactQueryAdapter.client.useGetRewardId({
    pathParams: { rewardId: rewardId ?? "" },
    options: {
      enabled: Boolean(rewardId),
    },
  });

  if (isLoading) {
    return (
      <SidePanelBody>
        <Skeleton className={"h-30"} />
        <Skeleton className={"h-full"} />
      </SidePanelBody>
    );
  }

  if (isError) {
    return (
      <SidePanelBody>
        <ErrorState />
      </SidePanelBody>
    );
  }

  if (!reward) {
    return (
      <SidePanelBody>
        <EmptyStateLite />
      </SidePanelBody>
    );
  }

  return (
    <SidePanelBody>
      <RewardedCard reward={reward.amount} processedAt={reward.processedAt} requestedAt={reward.requestedAt} />
      {reward.items?.length ? <ContributionsAccordion ids={reward.items} /> : null}
      <RewardTimeline reward={reward} />
    </SidePanelBody>
  );
}

function Header() {
  const { name } = useRewardDetailSidepanel();
  const idKernelPort = bootstrap.getIdKernelPort();
  const { rewardId } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {
    rewardId: "",
  };

  const { data: reward } = RewardReactQueryAdapter.client.useGetRewardId({
    pathParams: { rewardId },
    options: {
      enabled: Boolean(rewardId),
    },
  });

  const billingProfileId = reward?.billingProfileId ?? "";
  const invoiceId = reward?.invoiceId ?? "";

  const { data: downloadedInvoice } = BillingProfileReactQueryAdapter.client.useDownloadBillingProfileInvoiceById({
    pathParams: {
      billingProfileId,
      invoiceId,
    },
    options: { enabled: Boolean(billingProfileId && invoiceId) },
  });

  const downloadButton = useMemo(() => {
    if (!downloadedInvoice || !rewardId) {
      return null;
    }

    return (
      <Button
        size={"sm"}
        variant={"secondary"}
        startIcon={{ component: CloudDownload }}
        translate={{
          token: "panels:rewardDetail.download",
        }}
        as={"a"}
        htmlProps={{
          href: window.URL.createObjectURL(downloadedInvoice),
          download: reward?.invoiceNumber ?? "invoice.pdf",
        }}
      />
    );
  }, [reward, downloadedInvoice]);

  return (
    <SidePanelHeader
      canGoBack={false}
      canClose={true}
      title={{ children: rewardId ? `#${idKernelPort.prettyId(rewardId)}` : "" }}
      titleEndContent={downloadButton}
    />
  );
}

export function RewardDetailSidepanel() {
  const { name } = useRewardDetailSidepanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Header />
      <Content />
    </Panel>
  );
}
