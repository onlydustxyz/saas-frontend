import { CircleIcon, CodeIcon, FlameIcon, GitForkIcon, MessageSquareIcon, TagIcon } from "lucide-react";

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

interface IssueCategoryProps {
  title: string;
  type: "language" | "topic" | "difficulty" | "activity";
  items: Issue[];
}

const getTypeIcon = (type: IssueCategoryProps["type"]) => {
  switch (type) {
    case "language":
      return <CodeIcon className="h-5 w-5 text-blue-500" />;
    case "topic":
      return <TagIcon className="h-5 w-5 text-purple-500" />;
    case "difficulty":
      return <GitForkIcon className="h-5 w-5 text-green-500" />;
    case "activity":
      return <FlameIcon className="h-5 w-5 text-orange-500" />;
  }
};

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

export function IssueCategory({ title, type, items }: IssueCategoryProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getTypeIcon(type)}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-6 pb-4">
          {items.map(issue => (
            <Card
              key={issue.id}
              className="group relative min-w-[400px] cursor-pointer overflow-hidden transition-all hover:shadow-lg"
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
                        <MessageSquareIcon className="h-4 w-4" />
                        <span>{issue.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CircleIcon className="h-4 w-4 fill-current" />
                        <span>{issue.reactions.thumbsUp + issue.reactions.heart}</span>
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
