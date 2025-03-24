import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  const projectSlug = params.projectSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/p/${projectSlug}/opengraph-image`],
    },
  };
}

export default function ProjectDetailLayout({
  params,
  children,
}: PropsWithChildren<{ params: { projectSlugV2: string } }>) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlugV2}>
      <PageContainer size="small">
        {children}

        <ContributionsSidepanel />
        <ContributorSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
