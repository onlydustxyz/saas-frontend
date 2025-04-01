import { ChevronLeft, Copy, Github } from "lucide-react";
import { useState } from "react";

import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { SheetHeader } from "@/shared/ui/sheet";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";
import { toast } from "sonner";

export function Header({
  issueNumber,
  issueStatus,
  issueTitle,
  onBack,
  githubUrl,
  createdAt,
  author,
}: {
  issueNumber: number;
  issueStatus: ContributionGithubStatusUnion;
  issueTitle: string;
  onBack?: () => void;
  githubUrl: string;
  createdAt: string;
  author: { login: string };
}) {
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(githubUrl);
      toast.success("URL copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <SheetHeader className="pr-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {onBack ? (
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onBack}>
              <ChevronLeft />
            </Button>
          ) : (
            <div /> // Empty div for spacing when no back button
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleCopyUrl} className="gap-2">
              <Copy className="size-4" />
              Copy URL
            </Button>
            <Button type="button" variant="outline" asChild className="gap-2">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="size-4" />
                Github issue
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TypographyH4 className="line-clamp-1">{issueTitle}</TypographyH4>
          <div className="flex items-center gap-2">
            <ContributionBadge type="ISSUE" number={issueNumber} githubStatus={issueStatus} />
            <TypographyMuted>
              Opened {bootstrap.getDateKernelPort().formatDistanceToNow(new Date(createdAt))} ago by {author.login}
            </TypographyMuted>
          </div>
        </div>
      </div>
    </SheetHeader>
  );
}
