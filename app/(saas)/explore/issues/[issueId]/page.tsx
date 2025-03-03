import {
  BookOpenIcon,
  CalendarIcon,
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

interface PageProps {
  params: {
    issueId: string;
  };
}

export default function IssuePage({ params }: PageProps) {
  // This would typically come from an API
  const issue = {
    id: params.issueId,
    title: "Implement dark mode support",
    repository: "vercel/next.js",
    description: `We need to implement a comprehensive dark mode support for the documentation website. This includes:

## Requirements

1. Add a theme toggle button in the navigation
2. Create dark mode color palette
3. Implement system preference detection
4. Add persistent theme selection
5. Style code blocks for dark mode
6. Update all components to support dark mode

## Technical Details

- Use next-themes for theme management
- Update Tailwind configuration
- Add CSS variables for theme colors
- Implement smooth theme transitions

## Additional Context

This is a good first issue for someone familiar with CSS and React. The implementation should follow our existing design system and maintain accessibility standards.`,
    author: {
      name: "johndoe",
      avatar: "https://github.com/johndoe.png",
    },
    assignee: null,
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
    updatedAt: "2024-03-15T15:30:00Z",
    difficulty: "easy" as const,
    status: "open",
    relatedPRs: [
      {
        id: "123",
        title: "Add dark mode toggle component",
        author: "janedoe",
        status: "open",
      },
    ],
    contributors: [
      {
        name: "janedoe",
        avatar: "https://github.com/janedoe.png",
        role: "Assignee",
      },
      {
        name: "techguru",
        avatar: "https://github.com/techguru.png",
        role: "Reviewer",
      },
    ],
    timeline: [
      {
        type: "created",
        date: "2024-03-14T10:00:00Z",
        actor: "johndoe",
      },
      {
        type: "labeled",
        date: "2024-03-14T10:05:00Z",
        actor: "johndoe",
        label: "feature",
      },
      {
        type: "commented",
        date: "2024-03-15T09:30:00Z",
        actor: "janedoe",
        comment: "I'd like to work on this issue. I have experience with next-themes and dark mode implementation.",
      },
    ],
  };

  // This would typically come from an API
  const projectOverview = {
    stats: {
      stars: 115000,
      forks: 24000,
      contributors: 2800,
      openIssues: 150,
    },
    techStack: [
      { name: "TypeScript", color: "#3178C6" },
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
    ],
    documentation: "https://nextjs.org/docs",
    difficulty: {
      timeEstimate: "2-3 days",
      expertise: ["React", "CSS", "TypeScript"],
      scope: "Medium",
    },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Project Overview Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpenIcon className="h-5 w-5 text-blue-500" />
              Project Overview
            </CardTitle>
            <CardDescription>Key information about the project and issue scope</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <StarIcon className="h-4 w-4" />
                    Stars
                  </div>
                  <p className="text-xl font-semibold">{projectOverview.stats.stars.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <GitBranchIcon className="h-4 w-4" />
                    Forks
                  </div>
                  <p className="text-xl font-semibold">{projectOverview.stats.forks.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    Contributors
                  </div>
                  <p className="text-xl font-semibold">{projectOverview.stats.contributors.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <GitPullRequestIcon className="h-4 w-4" />
                    Open Issues
                  </div>
                  <p className="text-xl font-semibold">{projectOverview.stats.openIssues.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              {/* Tech Stack & Resources */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectOverview.techStack.map(tech => (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        style={{
                          backgroundColor: `${tech.color}15`,
                          color: tech.color,
                          borderColor: `${tech.color}30`,
                        }}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Resources</h3>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href={projectOverview.documentation}>
                      <BookOpenIcon className="h-4 w-4" />
                      View Documentation
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Issue Scope */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Time Estimate</h3>
                  <p className="text-sm text-muted-foreground">{projectOverview.difficulty.timeEstimate}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Required Expertise</h3>
                  <div className="flex flex-wrap gap-1">
                    {projectOverview.difficulty.expertise.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Scope</h3>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                    {projectOverview.difficulty.scope}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description Card */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
            <CardDescription>Issue details and requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{issue.description}</div>
            </div>
          </CardContent>
        </Card>

        {/* Related PRs */}
        {issue.relatedPRs.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GitPullRequestIcon className="h-5 w-5 text-green-500" />
                Related Pull Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issue.relatedPRs.map(pr => (
                  <div
                    key={pr.id}
                    className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-muted/50"
                  >
                    <GitPullRequestIcon className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium group-hover:text-primary">{pr.title}</div>
                      <div className="text-sm text-muted-foreground">
                        #{pr.id} opened by {pr.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity Timeline */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareIcon className="h-5 w-5 text-blue-500" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="relative space-y-6">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 h-full w-px bg-border" />

                {issue.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-2">
                    <div className="z-20 mt-1 rounded-full bg-background p-1">
                      {event.type === "created" && <GitCommitIcon className="h-4 w-4 text-blue-500" />}
                      {event.type === "labeled" && <GitBranchIcon className="h-4 w-4 text-purple-500" />}
                      {event.type === "commented" && <MessageSquareIcon className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={`https://github.com/${event.actor}.png`} />
                          <AvatarFallback>{event.actor[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hover:text-primary hover:underline">{event.actor}</span>
                        <span className="text-sm text-muted-foreground">
                          {event.type === "created" && "created this issue"}
                          {event.type === "labeled" && `added the ${event.label} label`}
                          {event.type === "commented" && "commented"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      {event.type === "commented" && (
                        <div className="mt-2 rounded-lg border bg-muted/40 p-3 text-sm">{event.comment}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="sticky top-[120px] space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Open
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  {new Date(issue.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Updated</span>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  {new Date(issue.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributors Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <UsersIcon className="h-5 w-5 text-blue-500" />
                Contributors
              </CardTitle>
              <CardDescription>People involved in this issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.contributors.map(contributor => (
                <div
                  key={contributor.name}
                  className="group flex cursor-pointer items-center justify-between rounded-lg p-1.5 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>{contributor.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">{contributor.role}</div>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <Button variant="outline" className="w-full gap-2">
                <UsersIcon className="h-4 w-4" />
                View All Contributors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
