import { Github } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useCallback, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Markdown } from "@/shared/features/markdown/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function IssueDetailPanel({
  children,
  containerRef,
  contributionId,
}: PropsWithChildren<{ containerRef: Element | null; contributionId: string }>) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: contributionId },
    options: { enabled: Boolean(contributionId) && open },
  });

  const renderMetrics = useCallback(() => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[74px]" />
          ))}
        </div>
      );
    }

    if (!data || isError) return null;

    const openedSince = parseInt(dateKernelPort.formatDistanceToNow(new Date(data.createdAt), { unit: "day" }));

    return (
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3">
          <TypographyMuted>Applicants</TypographyMuted>
          <TypographyH4>{data.applicants.length}</TypographyH4>
        </Card>

        <Card className="p-3">
          <TypographyMuted>Comments</TypographyMuted>
          <TypographyH4>{data.githubCommentCount}</TypographyH4>
        </Card>

        <Card className="p-3">
          <TypographyMuted>Opened since</TypographyMuted>
          <TypographyH4>{openedSince === 1 ? "1 day" : `${openedSince} days`}</TypographyH4>
        </Card>
      </div>
    );
  }, [data, isLoading, isError]);

  const renderSummary = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-40" />;
    }

    if (!data || isError) return null;

    const createdSince = dateKernelPort.formatDistanceToNow(new Date(data.createdAt));

    return (
      <Card className="flex flex-col gap-3 p-3">
        <header className={"flex w-full flex-row items-center justify-start gap-3"}>
          <ContributionBadge type={data.type} number={data.githubNumber} githubStatus={data.githubStatus} />
          <TypographyH4 className="line-clamp-1">{data.githubTitle}</TypographyH4>
        </header>

        {data.githubBody ? <Markdown content={data.githubBody} /> : null}

        <TypographyMuted>{createdSince}</TypographyMuted>

        <footer className="flex items-end justify-between gap-3">
          <ul className="flex flex-row flex-wrap gap-2">
            {data.githubLabels?.map(label => (
              <li key={label.name}>
                <Badge variant="outline">{label.name}</Badge>
              </li>
            ))}
          </ul>

          <Link href={NEXT_ROUTER.users.details.root(data.githubAuthor.login)}>
            <Avatar className="size-5">
              <AvatarImage src={data.githubAuthor.avatarUrl} alt={data.githubAuthor.login} />
              <AvatarFallback className="size-5">{data.githubAuthor.login.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </footer>
      </Card>
    );
  }, [data, isLoading, isError]);

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-9" />;
    }

    if (!data || isError) return null;

    return (
      <SheetFooter>
        <Button variant="secondary" className="w-full" asChild>
          <a href={data.githubHtmlUrl} target="_blank" rel="noreferrer noopener">
            <Github />
            Edit on Github
          </a>
        </Button>
      </SheetFooter>
    );
  }, [data, isLoading, isError]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        portalProps={{ container: containerRef }}
        overlayProps={{ className: "absolute" }}
        className="absolute flex flex-col gap-6"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>Issue</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3">
          {renderMetrics()}

          {renderSummary()}
        </div>

        {renderFooter()}
      </SheetContent>
    </Sheet>
  );
}
