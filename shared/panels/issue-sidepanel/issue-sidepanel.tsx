import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Github } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { ApplyCounter } from "@/shared/features/issues/apply-counter/apply-counter";
import { ApplyIssueGuideline } from "@/shared/features/issues/apply-issue-guideline/apply-issue-guideline";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Form } from "@/shared/ui/form";
import { Sheet, SheetContent, SheetError, SheetLoading, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH4 } from "@/shared/ui/typography";

import { ApplyPanel } from "./_components/apply-panel/apply-panel";
import { GithubComment } from "./_components/github-comment/github-comment";
import { Header } from "./_components/header/header";
import { Metrics } from "./_components/metrics/metrics";
import { Summary } from "./_components/summary/summay";
import { issueFromContribution, prefillLabel } from "./_utils/utils";
import { IssueSidepanelFormSchema, issueSidepanelzodSchema } from "./issue-sidepanel.types";

export function IssueSidepanel({
  children,
  projectId,
  issueId,
  contributionUuid,
}: PropsWithChildren<{ projectId: string; issueId?: number; contributionUuid?: string }>) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <Content
        open={open}
        projectId={projectId}
        issueId={issueId}
        contributionUuid={contributionUuid}
        onClose={() => setOpen(false)}
      />
    </Sheet>
  );
}

function Content({
  open,
  projectId,
  issueId = 0,
  contributionUuid = "",
  onClose,
}: {
  open: boolean;
  projectId: string;
  issueId?: number;
  contributionUuid?: string;
  onClose: () => void;
}) {
  const [canApply, setCanApply] = useState(false);
  const [shouldDeleteComment, setShouldDeleteComment] = useState<CheckedState>(false);

  const {
    data: issueData,
    isLoading: isIssueLoading,
    isError: isIssueError,
  } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
    options: { enabled: Boolean(issueId) && open },
  });

  const {
    data: contribution,
    isLoading: isContributionLoading,
    isError: isContributionError,
  } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid },
    options: { enabled: Boolean(contributionUuid) && open },
  });

  const isLoading = isIssueLoading || isContributionLoading;

  const isError = isIssueError || isContributionError;

  const issue = issueData ? issueData : contribution ? issueFromContribution(contribution) : undefined;

  const isHackathon = !!issue?.hackathon?.id || !!contribution?.isIncludedInLiveHackathon;

  const { user } = useAuthUser();

  const currentUserApplication = user?.pendingApplications?.find(application => application.issue?.id === issue?.id);

  const hasCurrentUserApplication = Boolean(currentUserApplication);

  const { data: myApplications } = MeReactQueryAdapter.client.useGetMyApplications({});

  const { mutateAsync: createApplication, isPending: isCreatingApplication } =
    MeReactQueryAdapter.client.usePostMyApplication({
      options: {
        onSuccess: () => {
          toast.success("Application sent successfully");
          onClose();
        },
        onError: () => {
          toast.error("Error sending application");
        },
      },
    });

  const { mutateAsync: deleteApplication, isPending: isDeletingApplication } =
    ApplicationReactQueryAdapter.client.useDeleteApplication({
      pathParams: {
        applicationId: currentUserApplication?.id ?? "",
      },
      options: {
        onSuccess: () => {
          toast.success("Application canceled successfully");
          onClose();
        },
        onError: () => {
          toast.error("Error canceling application");
        },
      },
    });

  const form = useForm<IssueSidepanelFormSchema>({
    resolver: zodResolver(issueSidepanelzodSchema),
  });

  useEffect(() => {
    form.reset({
      githubComment: currentUserApplication ? currentUserApplication?.githubComment : prefillLabel(),
    });
  }, [currentUserApplication]);

  function handleCreate(values: IssueSidepanelFormSchema) {
    if (myApplications?.isMaxApplicationsOnLiveHackathonReached()) return;

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
      deleteGithubComment: shouldDeleteComment === "indeterminate" ? false : shouldDeleteComment,
    });
  }

  const renderCta = () => {
    if (hasCurrentUserApplication) {
      return (
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="delete"
              checked={shouldDeleteComment}
              onCheckedChange={setShouldDeleteComment}
              disabled={isDeletingApplication}
            />
            <label
              htmlFor="delete"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Delete comment
            </label>
          </div>

          <Button type="button" onClick={handleCancel} loading={isDeletingApplication}>
            Cancel application
          </Button>
        </div>
      );
    }

    if (canApply) {
      return (
        <Button type="submit" loading={isCreatingApplication}>
          Send application
        </Button>
      );
    }

    if (issue) {
      return (
        <ApplyPanel
          issueTitle={issue.title}
          issueNumber={issue.number}
          issueStatus={issue.status}
          onApply={() => setCanApply(true)}
          onBookmark={() => onClose()}
        >
          <Button type="button">Next</Button>
        </ApplyPanel>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (isLoading) return <SheetLoading />;

    if (!issue || isError) return <SheetError />;

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className="flex h-full flex-col gap-4">
          <Header issueNumber={issue.number} issueStatus={issue.status} issueTitle={issue.title} />

          <div className="flex flex-1 flex-col gap-4 overflow-auto">
            <Metrics
              applicantsCount={issue.applicants.length}
              commentsCount={issue.commentCount}
              createdAt={issue.createdAt}
            />

            <Summary body={issue.body} labels={issue.labels.map(label => label.name)} author={issue.author} />

            {canApply && isHackathon ? <ApplyIssueGuideline /> : null}
          </div>

          {canApply && isHackathon ? (
            <Card className="flex w-full flex-col gap-4 p-3">
              <div className="flex flex-col items-start gap-1">
                <TypographyH4>My applications limit</TypographyH4>
                <CardDescription>You can apply to 10 issues at a time.</CardDescription>
              </div>

              <ApplyCounter />
            </Card>
          ) : null}

          {canApply ? <GithubComment hasCurrentUserApplication={hasCurrentUserApplication} /> : null}

          <footer className="flex w-full items-center justify-between">
            <Button type="button" variant="outline" size="icon" asChild>
              <a href={issue.htmlUrl} target="_blank" rel="noopener noreferrer">
                <Github />
              </a>
            </Button>

            {renderCta()}
          </footer>
        </form>
      </Form>
    );
  };

  return <SheetContent className="h-full">{renderContent()}</SheetContent>;
}
