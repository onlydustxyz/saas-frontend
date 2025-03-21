"use client";

import { SquareArrowOutUpRight } from "lucide-react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { ContributorProfileExtended } from "@/shared/features/contributors/contributor-profile-extended/contributor-profile-extended";
import { Timeline } from "@/shared/features/contributors/timeline/timeline";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Activity } from "@/shared/panels/contributor-sidepanel/_components/activity/activity";
import { Ecosystems } from "@/shared/panels/contributor-sidepanel/_components/ecosystems/ecosystems";
import { Kpi } from "@/shared/panels/contributor-sidepanel/_components/kpi/kpi";
import { Languages } from "@/shared/panels/contributor-sidepanel/_components/languages/languages";
import { PublicRepo } from "@/shared/panels/contributor-sidepanel/_components/public-repo/public-repo";
import { RewardsGraph } from "@/shared/panels/contributor-sidepanel/_components/rewards-graph/rewards-graph";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationComments } from "./_components/application-comments/application-comments";
import { ContributorSidepanelData, ContributorSidepanelProps } from "./contributor-sidepanel.types";

export function ContributorSidepanel({ customFooter }: ContributorSidepanelProps) {
  const { name, isOpen } = useContributorSidePanel();
  const { Panel } = useSidePanel({ name });
  const {
    githubId = 0,
    canGoBack,
    applicationId = "",
  } = useSinglePanelData<ContributorSidepanelData>(name) ?? {
    githubId: undefined,
    applicationId: undefined,
  };

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: String(githubId) },
    options: {
      enabled: Boolean(githubId && isOpen),
    },
  });

  function renderContent() {
    if (isLoading) {
      return (
        <div className={"flex w-full flex-col gap-lg"}>
          <Skeleton className={"h-[170px] w-full"} />
          <Skeleton className={"h-[170px] w-full"} />
        </div>
      );
    }

    if (!data) {
      return <EmptyStateLite />;
    }

    return (
      <div className={"flex w-full flex-col gap-lg"}>
        <ContributorProfileExtended user={data} />
        {data?.contributor.githubUserId ? (
          <>
            <Languages languages={data?.languages} />
            <Ecosystems ecosystems={data?.ecosystems} />
            <Kpi user={data} />
            {applicationId ? <ApplicationComments applicationId={applicationId} /> : null}
            <RewardsGraph githubId={data?.contributor.githubUserId} />
            <PublicRepo repos={data?.repos} />
            <Activity user={data} />
            <Timeline user={data} />
          </>
        ) : null}
      </div>
    );
  }

  function renderFooter() {
    if (!data) return null;

    if (customFooter) {
      return customFooter({ data, applicationId });
    }

    return (
      <div className={"flex w-full flex-row items-center justify-end gap-1"}>
        <Button
          variant={"secondary"}
          endContent={<SquareArrowOutUpRight size={16} />}
          size={"md"}
          as={BaseLink}
          htmlProps={{
            href: NEXT_ROUTER.users.details.root(data.contributor.login),
          }}
        >
          <Translate token={"panels:contributor.seeContributor"} />
        </Button>
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: data?.contributor.login ?? "",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>{renderContent()}</SidePanelBody>
      {data ? <SidePanelFooter>{renderFooter()}</SidePanelFooter> : null}
    </Panel>
  );
}
