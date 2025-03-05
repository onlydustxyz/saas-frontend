import { PropsWithChildren, useCallback, useRef, useState } from "react";

import { ApplicantCard } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_components/applicant-card/applicant-card";
import { ApplicantDetailPanel } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/applicant-detail-panel/applicant-detail-panel";
import { IssueDetailPanel } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/issue-detail-panel/issue-detail-panel";
import { ScoringInfoPanel } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/scoring-info-panel/scoring-info-panel";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/shared/ui/sheet";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function IssueApplicantsPanel({ children, id }: PropsWithChildren<{ id: string }>) {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: id },
    options: {
      enabled: Boolean(id) && open,
    },
  });

  const {
    data: dataApplicants,
    isLoading: isLoadingApplicants,
    isError: isErrorApplicants,
  } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: id },
    queryParams: {
      isIgnored: false,
    },
    options: {
      enabled: Boolean(id) && open,
    },
  });

  const applicants = dataApplicants?.pages.flatMap(page => page.applicants) ?? [];

  const renderHeader = useCallback(() => {
    if (!contribution) return null;

    return (
      <SheetHeader className={"flex w-full flex-row items-center justify-start gap-3 space-y-0"}>
        <ContributionBadge
          type={contribution.type}
          number={contribution.githubNumber}
          githubStatus={contribution.githubStatus}
        />

        <TypographyH4 className="line-clamp-1">{contribution.githubTitle}</TypographyH4>
      </SheetHeader>
    );
  }, [contribution]);

  const renderApplications = useCallback(() => {
    if (isLoadingApplicants)
      return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-24" />);

    if (isErrorApplicants)
      return (
        <div className="py-10 text-center">
          <TypographyMuted>No applicants found</TypographyMuted>
        </div>
      );

    if (!applicants) return null;

    return applicants.map(applicant => (
      <ApplicantDetailPanel key={applicant.applicationId} applicantId={applicant.contributor.id}>
        <ApplicantCard applicant={applicant} />
      </ApplicantDetailPanel>
    ));
  }, [applicants, isLoadingApplicants, isErrorApplicants]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full">{children}</SheetTrigger>

      <SheetContent ref={sheetRef} className="flex flex-col">
        {renderHeader()}

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2">{renderApplications()}</div>
        </ScrollArea>

        <SheetFooter>
          <ScoringInfoPanel containerRef={sheetRef.current}>
            <Button variant="outline">How does scoring work?</Button>
          </ScoringInfoPanel>

          <IssueDetailPanel containerRef={sheetRef.current} contributionId={id}>
            <Button variant="outline">See issue</Button>
          </IssueDetailPanel>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
