import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

interface ContributionItem {
  id: string;
  type: "issue" | "pull-request";
  title: string;
  repository: string;
  lastActivity: string;
  status: string;
  labels: string[];
}

export function ContinueContributing() {
  // This would typically come from an API
  const recentContributions: ContributionItem[] = [
    {
      id: "1",
      type: "issue",
      title: "Improve documentation for authentication flow",
      repository: "nextjs/next.js",
      lastActivity: "2024-03-14T15:30:00Z",
      status: "in-progress",
      labels: ["documentation", "help wanted"],
    },
    {
      id: "2",
      type: "pull-request",
      title: "Fix performance issue in data fetching",
      repository: "vercel/swr",
      lastActivity: "2024-03-13T10:20:00Z",
      status: "review-needed",
      labels: ["performance", "bug"],
    },
    // Add more items here
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Continue Contributing</h2>
        <Button variant="ghost">View History</Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-6 pb-4">
          {recentContributions.map(item => (
            <Card key={item.id} className="min-w-[350px] cursor-pointer transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={item.type === "issue" ? "secondary" : "default"}>
                      {item.type === "issue" ? "Issue" : "Pull Request"}
                    </Badge>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>

                  <div>
                    <h3 className="line-clamp-2 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.repository}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.labels.map(label => (
                      <Badge key={label} variant="outline">
                        {label}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last active: {new Date(item.lastActivity).toLocaleDateString()}
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
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
