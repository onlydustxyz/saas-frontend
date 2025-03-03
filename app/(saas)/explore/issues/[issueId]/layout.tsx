import { Metadata } from "next";
import { ReactNode } from "react";

import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";

import { IssueHeader } from "./_features/issue-header/issue-header";

export async function generateMetadata({ params }: { params: { issueId: string } }): Promise<Metadata> {
  const issueId = params.issueId;

  return {
    title: `Issue #${issueId} - OnlyDust`,
    openGraph: {
      images: [`https://previous.onlydust.com/issues/${issueId}/opengraph-image`],
    },
  };
}

export default function IssueLayout({ params, children }: { params: { issueId: string }; children: ReactNode }) {
  return (
    <PageContainer size="large">
      <div className="flex min-h-screen flex-col">
        {/* Header Area */}
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <IssueHeader issueId={params.issueId} />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 py-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </div>

        {/* Sidepanel */}
        <ApplyIssueSidepanel />
      </div>
    </PageContainer>
  );
}
