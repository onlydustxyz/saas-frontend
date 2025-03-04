"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { usePublicRepoScope } from "@/core/application/auth0-client-adapter/hooks/use-public-repo-scope";
import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { IssueInterface } from "@/core/domain/issue/models/issue-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ButtonPrimaryColorVariants } from "@/design-system/atoms/button/variants/button-primary-color";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { ApplyCounter } from "@/shared/features/issues/apply-counter/apply-counter";
import { ApplyIssueGuideline } from "@/shared/features/issues/apply-issue-guideline/apply-issue-guideline";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { SidePanelLoading } from "@/shared/features/side-panels/side-panel-loading/side-panel-loading";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Github } from "@/shared/icons";
import { Translate } from "@/shared/translation/components/translate/translate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Card, CardDescription } from "@/shared/ui/card";
import { TypographyH4 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { Apply } from "./_components/apply/apply";
import { Metrics } from "./_components/metrics/metrics";
import { Summary } from "./_components/summary/summary";
import { useApplyIssuePrefillLabel, useApplyIssueSidePanel } from "./apply-issue-sidepanel.hooks";
import {
  ApplyIssueSidepanelData,
  ApplyIssueSidepanelForm,
  ApplyIssueSidepanelValidation,
} from "./apply-issue-sidepanel.types";

function ApplyLimitCard() {
  return (
    <SidePanelFooter className="border-none">
      <Card className="flex w-full flex-col gap-4 p-4">
        <div className="flex flex-col items-start gap-1">
          <TypographyH4>My applications limit</TypographyH4>
          <CardDescription>You can apply to 10 issues at a time.</CardDescription>
        </div>
        <ApplyCounter />
      </Card>
    </SidePanelFooter>
  );
}

function Header({ issue, canGoBack }: { issue: IssueInterface; canGoBack: boolean }) {
  return (
    <SidePanelHeader
      title={{
        children: (
          <div className="flex w-full flex-row items-center justify-start gap-lg overflow-hidden">
            <ContributionBadge type="ISSUE" number={issue.number} githubStatus={issue.status} />
            <Typo
              size="xs"
              weight="medium"
              variant="heading"
              as="div"
              classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
            >
              {issue.title}
            </Typo>
          </div>
        ),
      }}
      canGoBack={canGoBack}
      canClose={true}
    />
  );
}

function Footer({
  hasCurrentUserApplication,
  shouldDeleteComment,
  onDeleteCommentChange,
  onCancel,
  isPending,
  issueUrl,
  isHackathon,
  maxApplicationsReached,
}: {
  hasCurrentUserApplication: boolean;
  shouldDeleteComment: boolean;
  onDeleteCommentChange: (value: boolean) => void;
  onCancel: () => void;
  isPending: boolean;
  issueUrl: string;
  isHackathon: boolean;
  maxApplicationsReached: boolean;
}) {
  return (
    <>
      {isHackathon ? <ApplyLimitCard /> : null}
      <SidePanelFooter>
        <div className="flex w-full justify-between gap-md">
          {issueUrl ? (
            <Button
              size="md"
              variant="secondary"
              as={BaseLink}
              iconOnly
              htmlProps={{ href: issueUrl, target: "_blank" }}
              startIcon={{
                component: Github,
                size: "md",
              }}
            />
          ) : null}
          <div className="flex w-full flex-1 flex-row items-center justify-between gap-1">
            {hasCurrentUserApplication ? (
              <>
                <CheckboxButton
                  value={shouldDeleteComment}
                  onChange={onDeleteCommentChange}
                  variant="secondary"
                  isDisabled={isPending}
                >
                  <Translate token="panels:applyIssue.apply.deleteComment" />
                </CheckboxButton>
                <Button
                  variant="primary"
                  translate={{ token: "panels:applyIssue.apply.cancelApplication" }}
                  onClick={onCancel}
                  isLoading={isPending}
                />
              </>
            ) : (
              <>
                <div />
                <div className="flex flex-row gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className={ButtonPrimaryColorVariants({ variant: "secondary" }).base()} type="button">
                        <Typo
                          size="sm"
                          as={"span"}
                          classNames={{ base: cn(ButtonPrimaryColorVariants({ variant: "secondary" }).label()) }}
                        >
                          Try issue
                        </Typo>
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="z-[100] max-w-screen-sm" overlayProps={{ className: "z-[100]" }}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Contribute without applying</AlertDialogTitle>
                        <AlertDialogDescription>
                          Discover the project without applying.
                          <br />
                          You can hone your skills and apply later if you&apos;re up to it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Not now</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <a href={issueUrl} target="_blank" rel="noreferrer">
                            Let&apos;s go!
                          </a>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    variant="primary"
                    translate={{ token: "panels:applyIssue.apply.sendApplication" }}
                    type="submit"
                    isLoading={isPending}
                    isDisabled={maxApplicationsReached}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </SidePanelFooter>
    </>
  );
}

function Content() {
  const [shouldDeleteComment, setShouldDeleteComment] = useState(false);
  const { name, close } = useApplyIssueSidePanel();
  const { handleVerifyPermissions, isAuthorized } = usePublicRepoScope();
  const { setIsGithubPublicScopePermissionModalOpen } = useGithubPermissionsContext();

  function handlePermissions(fn: () => void) {
    if (!isAuthorized) {
      setIsGithubPublicScopePermissionModalOpen(true);
      return;
    }

    handleVerifyPermissions(fn);
  }

  const {
    issueId = 0,
    canGoBack = false,
    projectId,
    contributionUuid = "",
  } = useSinglePanelData<ApplyIssueSidepanelData>(name) ?? {
    issueId: undefined,
    projectId: "",
    contributionUuid: undefined,
  };

  const {
    data: issueData,
    isLoading: isIssueLoading,
    isError: isIssueError,
  } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
    options: { enabled: !!issueId },
  });

  const {
    data: contribution,
    isLoading: isContributionLoading,
    isError: isContributionError,
  } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid },
    options: { enabled: !!contributionUuid },
  });

  const { data } = MeReactQueryAdapter.client.useGetMyApplications({});

  const isLoading = isIssueLoading || isContributionLoading;
  const isError = isIssueError || isContributionError;

  const issue = issueData ? issueData : contribution ? issueFromContribution(contribution) : undefined;

  const isHackathon = !!issue?.hackathon?.id || !!contribution?.isIncludedInLiveHackathon;

  const { data: user } = MeReactQueryAdapter.client.useGetMe({});

  const currentUserApplication = user?.pendingApplications?.find(application => application.issue?.id === issue?.id);

  const hasCurrentUserApplication = !!currentUserApplication;

  const { mutateAsync: createApplication, ...createApplicationState } = MeReactQueryAdapter.client.usePostMyApplication(
    {
      options: {
        onSuccess: () => {
          toast.success(<Translate token="panels:applyIssue.apply.successApply" />);
          close();
        },
        onError: () => {
          toast.error(<Translate token="panels:applyIssue.apply.errorApply" />);
        },
      },
    }
  );

  const { mutateAsync: deleteApplication, ...deleteApplicationState } =
    ApplicationReactQueryAdapter.client.useDeleteApplication({
      pathParams: {
        applicationId: currentUserApplication?.id ?? "",
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token="panels:applyIssue.apply.successCancel" />);
          close();
        },
        onError: () => {
          toast.error(<Translate token="panels:applyIssue.apply.errorCancel" />);
        },
      },
    });

  function handleCreate(values: ApplyIssueSidepanelForm) {
    if (data?.isMaxApplicationsOnLiveHackathonReached()) return;

    const applicationProjectId = issue?.project?.id ?? projectId;
    const applicationIssueId = issue?.id ?? issueId;

    if (!applicationProjectId || !applicationIssueId) return;

    createApplication({
      projectId: applicationProjectId,
      issueId: applicationIssueId,
      githubComment: values.githubComment,
    });
  }

  function handleCancel() {
    deleteApplication({
      deleteGithubComment: shouldDeleteComment,
    });
  }

  const prefillLabel = useApplyIssuePrefillLabel();

  const form = useForm<ApplyIssueSidepanelForm>({
    resolver: zodResolver(ApplyIssueSidepanelValidation),
  });

  useEffect(() => {
    form.reset({
      githubComment: currentUserApplication ? currentUserApplication?.githubComment : prefillLabel(),
    });
  }, [currentUserApplication]);

  if (isLoading) return <SidePanelLoading />;
  if (isError) return <ErrorState />;
  if (!issue) return <EmptyStateLite />;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values: ApplyIssueSidepanelForm) => handlePermissions(() => handleCreate(values)))}
        className={"flex h-full w-full flex-col gap-px"}
      >
        <Header issue={issue} canGoBack={canGoBack} />

        <SidePanelBody className="gap-4">
          <Metrics issue={issue} />
          <Summary issue={issue} />
          {isHackathon ? <ApplyIssueGuideline /> : null}
          <Apply hasCurrentUserApplication={hasCurrentUserApplication} />
        </SidePanelBody>
        <Footer
          hasCurrentUserApplication={hasCurrentUserApplication}
          shouldDeleteComment={shouldDeleteComment}
          onDeleteCommentChange={setShouldDeleteComment}
          onCancel={() => handlePermissions(handleCancel)}
          isPending={createApplicationState.isPending || deleteApplicationState.isPending}
          issueUrl={issue.htmlUrl}
          isHackathon={isHackathon}
          maxApplicationsReached={data?.isMaxApplicationsOnLiveHackathonReached() ?? false}
        />
      </form>
    </FormProvider>
  );
}

export function ApplyIssueSidepanel() {
  const { name, isOpen } = useApplyIssueSidePanel();
  const { Panel } = useSidePanel({ name });

  return <Panel>{isOpen && <Content />}</Panel>;
}

function issueFromContribution(contribution: ContributionActivityInterface): IssueInterface {
  return {
    id: parseInt(contribution.githubId),
    number: contribution.githubNumber,
    title: contribution.githubTitle,
    status: issueStatus(contribution.githubStatus),
    htmlUrl: contribution.githubHtmlUrl,
    repo: contribution.repo,
    author: {
      ...contribution.githubAuthor,
      isRegistered: false,
    },
    createdAt: contribution.createdAt,
    closedAt: contribution.completedAt,
    body: contribution.githubBody,
    commentCount: contribution.githubCommentCount || 0,
    labels: contribution.githubLabels || [],
    applicants: contribution.applicants,
    assignees: contribution.contributors,
    languages: contribution.languages || [],
    project: contribution.project,
  };
}

function issueStatus(status: string) {
  switch (status) {
    case "OPEN":
      return "OPEN";
    case "COMPLETED":
      return "COMPLETED";
    default:
      return "CANCELLED";
  }
}
