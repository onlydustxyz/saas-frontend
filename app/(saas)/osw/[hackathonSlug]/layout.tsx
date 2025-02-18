import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { HackathonEvents } from "@/app/(saas)/osw/[hackathonSlug]/_features/hackathon-events/hackathon-events";
import { HackathonNavigation } from "@/app/(saas)/osw/[hackathonSlug]/_features/hackathon-navigation/hackathon-navigation";
import { HackathonSummary } from "@/app/(saas)/osw/[hackathonSlug]/_features/hackathon-summary/hackathon-summary";
import { AuthenticatedRegisterHackathon } from "@/app/(saas)/osw/_features/register-hackathon/register-hackathon";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";

import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";

export async function generateMetadata({ params }: { params: { hackathonSlug: string } }): Promise<Metadata> {
  const hackathonSlug = params.hackathonSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/hackathons/${hackathonSlug}/opengraph-image`],
    },
  };
}

export default function HackathonsLayout({
  params,
  children,
}: PropsWithChildren<{
  params: { hackathonSlug: string };
}>) {
  return (
    <PageContainer size="medium" className={"flex-1"}>
      <div className="flex flex-col items-start justify-start gap-4 pt-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <HackathonSummary hackathonSlug={params.hackathonSlug} />
          <HackathonEvents hackathonSlug={params.hackathonSlug} />
        </div>

        <Paper
          background="primary"
          border="primary"
          classNames={{ base: "desktop:col-span-2 overflow-hidden tablet:h-full flex flex-col pb-xl" }}
          size="none"
        >
          <div
            className={
              "flex w-full flex-col-reverse items-center justify-between border-b border-border-primary tablet:flex-row"
            }
          >
            <HackathonNavigation params={params} />

            <div className={"w-1/3 p-xl"}>
              <AuthenticatedRegisterHackathon hackathonSlug={params.hackathonSlug} />
            </div>
          </div>

          {children}
          <ApplyIssueSidepanel />
        </Paper>
      </div>
    </PageContainer>
  );
}
