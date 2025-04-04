import { ChevronDown, ChevronRight, ChevronUp, Copy, Github } from "lucide-react";
import { toast } from "sonner";

import { bootstrap } from "@/core/bootstrap";
import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { SheetHeader } from "@/shared/ui/sheet";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function Header({
  issueNumber,
  issueStatus,
  issueTitle,
  onClose,
  githubUrl,
  createdAt,
  author,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: {
  issueNumber: number;
  issueStatus: ContributionGithubStatusUnion;
  issueTitle: string;
  onClose: () => void;
  githubUrl: string;
  createdAt: string;
  author: { login: string };
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
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
    <SheetHeader>
      <div className="flex flex-col gap-3 pb-4">
        <div className="flex items-center gap-2 border-b pb-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 shrink-0">
            <div className="flex -space-x-2">
              <ChevronRight className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </div>
            <span className="sr-only">Close panel</span>
          </Button>

          <Button type="button" variant="outline" onClick={handleCopyUrl} className="gap-2">
            <Copy className="size-4" />
            Copy link
          </Button>

          <Button type="button" variant="outline" asChild className="gap-2">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              Github issue
            </a>
          </Button>

          <div className="flex-1" />

          <Button variant="ghost" size="icon" onClick={onPrevious} disabled={!hasPrevious} className="h-8 w-8 shrink-0">
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Previous issue</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={onNext} disabled={!hasNext} className="h-8 w-8 shrink-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Next issue</span>
          </Button>
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
