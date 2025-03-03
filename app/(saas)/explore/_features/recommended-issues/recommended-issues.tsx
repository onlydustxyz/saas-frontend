import { SparklesIcon } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

interface Issue {
  id: string;
  title: string;
  repository: string;
  author: {
    name: string;
    avatar: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
  reactions: {
    thumbsUp: number;
    heart: number;
  };
  createdAt: string;
  difficulty: "easy" | "medium" | "hard";
}

const getDifficultyColor = (difficulty: Issue["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "hard":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
  }
};

export function RecommendedIssues() {
  // This would typically come from an API based on user preferences and history
  const recommendedIssues: Issue[] = [
    {
      id: "rec1",
      title: "Implement server-side rendering for data visualization components",
      repository: "vercel/next.js",
      author: {
        name: "techexpert",
        avatar: "https://github.com/techexpert.png",
      },
      labels: [
        { name: "enhancement", color: "#84cc16" },
        { name: "performance", color: "#f59e0b" },
      ],
      comments: 12,
      reactions: {
        thumbsUp: 25,
        heart: 10,
      },
      createdAt: "2024-03-15T08:00:00Z",
      difficulty: "medium",
    },
    {
      id: "rec2",
      title: "Add support for custom theme variables",
      repository: "tailwindlabs/tailwindcss",
      author: {
        name: "designwiz",
        avatar: "https://github.com/designwiz.png",
      },
      labels: [
        { name: "feature", color: "#3b82f6" },
        { name: "theming", color: "#8b5cf6" },
      ],
      comments: 8,
      reactions: {
        thumbsUp: 15,
        heart: 7,
      },
      createdAt: "2024-03-14T15:30:00Z",
      difficulty: "easy",
    },
    {
      id: "rec3",
      title: "Optimize database query performance for large datasets",
      repository: "prisma/prisma",
      author: {
        name: "dbmaster",
        avatar: "https://github.com/dbmaster.png",
      },
      labels: [
        { name: "performance", color: "#f59e0b" },
        { name: "database", color: "#06b6d4" },
      ],
      comments: 15,
      reactions: {
        thumbsUp: 30,
        heart: 12,
      },
      createdAt: "2024-03-15T09:20:00Z",
      difficulty: "hard",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Recommended Issues</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {recommendedIssues.map(issue => (
            <Card
              key={issue.id}
              className="group relative min-w-[350px] cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <img src={issue.author.avatar} alt={issue.author.name} className="h-6 w-6 rounded-full" />
                    <span className="text-sm font-medium hover:text-primary">{issue.repository}</span>
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
                <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">{issue.title}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>{issue.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{issue.reactions.thumbsUp + issue.reactions.heart} reactions</span>
                      </div>
                    </div>
                    <time className="text-muted-foreground" dateTime={issue.createdAt}>
                      {new Intl.RelativeTimeFormat("en", {
                        numeric: "auto",
                      }).format(
                        -Math.round((Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
                        "day"
                      )}
                    </time>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
