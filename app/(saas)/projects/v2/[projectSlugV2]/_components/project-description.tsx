"use client";

import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const MAX_HEIGHT = 300;

export function ProjectDescription({
  description,
  projectId,
  title,
  isAiGenerated,
  isLoading,
  isError,
}: {
  description?: string;
  projectId?: string;
  title: string;
  isAiGenerated?: boolean;
  isLoading: boolean;
  isError: boolean;
}) {
  const [isVoted, setIsVoted] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(100000000);
  const [isExpanded, setIsExpanded] = useState(false);
  const { capture } = usePosthog();

  const showExpanded = descriptionHeight > MAX_HEIGHT;

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.offsetHeight);
    }
  }, [description, descriptionRef]);

  function handleClick() {
    const newValue = !isExpanded;

    if (isAiGenerated) {
      if (newValue) {
        capture("project_overview_open_generated_description", { projectId });
      } else {
        capture("project_overview_close_generated_description", { projectId });
      }
    } else {
      if (newValue) {
        capture("project_overview_open_description", { projectId });
      } else {
        capture("project_overview_close_description", { projectId });
      }
    }
    setIsExpanded(newValue);
  }

  function onThumbsUp() {
    capture("project_overview_generated_description_relevant", { projectId });
    setIsVoted(true);
  }

  function onThumbsDown() {
    capture("project_overview_generated_description_not_relevant", { projectId });
    setIsVoted(true);
  }

  if (isLoading) {
    return <Skeleton className="h-[406px] w-full" />;
  }

  if (isError || !projectId || !description) {
    return null;
  }

  return (
    <Card
      className={cn("relative flex flex-col gap-4 overflow-hidden p-4", {
        "bg-gradient-to-br from-purple-950 to-transparent to-20%": isAiGenerated,
      })}
    >
      <header className={"flex w-full items-center justify-between gap-2"}>
        <div className={"flex items-center gap-2"}>
          {isAiGenerated && <Sparkles className={"text-purple-700"} />}
          <TypographyH3>{title}</TypographyH3>
        </div>
        {isAiGenerated && !isVoted ? (
          <div className={"flex items-center justify-end gap-px"}>
            <Button variant={"ghost"} size={"icon"} onClick={onThumbsUp}>
              <ThumbsUp />
            </Button>
            <Button variant={"ghost"} size={"icon"} onClick={onThumbsDown}>
              <ThumbsDown />
            </Button>
          </div>
        ) : (
          <div />
        )}
      </header>

      <div
        className={"relative h-fit overflow-hidden transition-all"}
        style={{
          maxHeight: isExpanded ? descriptionHeight : MAX_HEIGHT,
        }}
      >
        <div ref={descriptionRef}>
          <Markdown content={description} />
        </div>
        {!isExpanded && showExpanded ? (
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        ) : null}
      </div>

      {showExpanded && (
        <div className={cn("flex justify-center", { "absolute bottom-4 left-0 right-0": !isExpanded })}>
          <Button variant={"secondary"} size={"sm"} onClick={handleClick}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </Card>
  );
}
