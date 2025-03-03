import { ArrowLeftIcon, GitForkIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

interface IssueHeaderProps {
  issueId: string;
}

export function IssueHeader({ issueId }: IssueHeaderProps) {
  // This would typically come from an API
  const issue = {
    id: issueId,
    title: "Implement dark mode support",
    repository: "vercel/next.js",
    author: {
      name: "johndoe",
      avatar: "https://github.com/johndoe.png",
    },
    labels: [
      { name: "feature", color: "#84cc16" },
      { name: "good first issue", color: "#22c55e" },
    ],
    comments: 8,
    reactions: {
      thumbsUp: 15,
      heart: 7,
    },
    createdAt: "2024-03-14T10:00:00Z",
    difficulty: "easy" as const,
  };

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "hard":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    }
  };

  return (
    <div className="z-10">
      <div className="flex flex-col gap-6 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/explore">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Explore
            </Link>
          </Button>
          <Button>Apply for Issue</Button>
        </div>

        {/* Issue Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href={`https://github.com/${issue.repository}`} className="hover:text-primary hover:underline">
                  {issue.repository}
                </Link>
                <span>•</span>
                <span>#{issue.id}</span>
              </div>
              <h1 className="text-2xl font-bold">{issue.title}</h1>
            </div>
            <Badge variant="secondary" className={getDifficultyColor(issue.difficulty)}>
              {issue.difficulty}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={issue.author.avatar} alt={issue.author.name} className="h-5 w-5 rounded-full" />
              <span className="text-sm text-muted-foreground">
                Opened by{" "}
                <Link href={`https://github.com/${issue.author.name}`} className="hover:text-primary hover:underline">
                  {issue.author.name}
                </Link>
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquareIcon className="h-4 w-4" />
                <span>{issue.comments} comments</span>
              </div>
              <div className="flex items-center gap-1">
                <GitForkIcon className="h-4 w-4" />
                <span>{issue.reactions.thumbsUp + issue.reactions.heart} reactions</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {issue.labels.map(label => (
                <Badge
                  key={label.name}
                  variant="outline"
                  style={{
                    backgroundColor: `${label.color}15`,
                    color: label.color,
                    borderColor: `${label.color}30`,
                  }}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
