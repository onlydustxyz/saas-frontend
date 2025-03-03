import { CircleIcon, ClockIcon, MessageSquareIcon } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

interface NewIssue {
  id: string;
  title: string;
  repository: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
  reactions: {
    thumbsUp: number;
    heart: number;
  };
  difficulty: "easy" | "medium" | "hard";
}

const getDifficultyColor = (difficulty: NewIssue["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "hard":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
  }
};

export function NewIssues() {
  // This would typically come from an API
  const newIssues: NewIssue[] = [
    {
      id: "1",
      title: "Add dark mode support to documentation",
      repository: "shadcn/ui",
      author: {
        name: "johndoe",
        avatar: "https://github.com/johndoe.png",
      },
      createdAt: "2024-03-15T09:00:00Z",
      labels: [
        { name: "enhancement", color: "#84cc16" },
        { name: "documentation", color: "#3b82f6" },
      ],
      comments: 3,
      reactions: {
        thumbsUp: 8,
        heart: 5,
      },
      difficulty: "easy",
    },
    {
      id: "2",
      title: "Fix mobile navigation menu",
      repository: "tailwindlabs/tailwindcss",
      author: {
        name: "janedoe",
        avatar: "https://github.com/janedoe.png",
      },
      createdAt: "2024-03-15T08:30:00Z",
      labels: [
        { name: "bug", color: "#ef4444" },
        { name: "mobile", color: "#8b5cf6" },
      ],
      comments: 2,
      reactions: {
        thumbsUp: 4,
        heart: 2,
      },
      difficulty: "medium",
    },
    // Add more issues here
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">New Issues</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Opened</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {newIssues.map((issue, index) => (
            <div key={issue.id}>
              <div className="group flex items-start gap-4 py-4">
                <img src={issue.author.avatar} alt={issue.author.name} className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium hover:text-primary">{issue.repository}</span>
                        <span className="text-sm text-muted-foreground">by {issue.author.name}</span>
                      </div>
                      <h3 className="line-clamp-2 font-medium group-hover:text-primary">{issue.title}</h3>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="secondary" className={getDifficultyColor(issue.difficulty)}>
                            {issue.difficulty}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Difficulty level</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquareIcon className="h-4 w-4" />
                      <span>{issue.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CircleIcon className="h-4 w-4 fill-current" />
                      <span>{issue.reactions.thumbsUp + issue.reactions.heart}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <time dateTime={issue.createdAt}>
                        {new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
                          -Math.round((Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
                          "day"
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
              {index < newIssues.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
