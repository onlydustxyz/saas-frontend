"use client";

import Link from "next/link";
import { PropsWithChildren, useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function ProjectAsideContributorsModal({
  projectIdOrSlug,
  children,
}: PropsWithChildren<{
  projectIdOrSlug: string;
}>) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectContributorsV2({
      pathParams: {
        projectIdOrSlug,
      },
      options: {
        enabled: open,
      },
    });

  const contributors = useMemo(() => data?.pages?.flatMap(page => page.contributors) ?? [], [data]);

  function renderContributors() {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex w-full items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-7 w-1/2" />
        </li>
      ));
    }

    if (isError || !contributors || contributors.length === 0) {
      return (
        <li className="text-center">
          <TypographyMuted>No contributors found</TypographyMuted>
        </li>
      );
    }

    return (
      <>
        {contributors.map(contributor => (
          <li key={contributor.login}>
            <Link href={NEXT_ROUTER.users.details.root(contributor.login)} className="flex w-fit items-center gap-2">
              <Avatar>
                <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
                <AvatarFallback>{contributor.login.charAt(0)}</AvatarFallback>
              </Avatar>

              <TypographyP>{contributor.login}</TypographyP>
            </Link>
          </li>
        ))}

        {hasNextPage ? (
          <li className="flex justify-center">
            <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} hasNextPage={hasNextPage} />
          </li>
        ) : null}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contributors</DialogTitle>
        </DialogHeader>

        <ul className="flex max-h-[500px] flex-col gap-3 overflow-y-auto">{renderContributors()}</ul>
      </DialogContent>
    </Dialog>
  );
}
