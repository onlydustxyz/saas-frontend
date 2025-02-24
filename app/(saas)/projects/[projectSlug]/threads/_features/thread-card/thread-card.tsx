import { zodResolver } from "@hookform/resolvers/zod";
import { GitPullRequest, MessageSquare, MoreHorizontal, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["bug", "feature", "improvement", "documentation", "other"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
});

type IssueFormData = z.infer<typeof issueSchema>;

interface ThreadCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes?: number;
  replies: number;
  tags?: string[];
  category?: string;
  projectSlug?: string;
  isPreview?: boolean;
  onUpvote: (id: string) => void;
  onDownvote?: (id: string) => void;
  onShare?: (id: string) => void;
  onCreateIssue?: (threadId: string, issueData: IssueFormData) => void;
}

export function ThreadCard({
  id,
  title,
  content,
  author,
  createdAt,
  upvotes,
  downvotes = 0,
  replies,
  tags = [],
  category,
  projectSlug,
  isPreview,
  onUpvote,
  onDownvote,
  onShare,
  onCreateIssue,
}: ThreadCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const issueForm = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: title,
      description: content,
      type: "other",
      priority: "medium",
    },
  });

  const handleUpvote = () => {
    if (isDownvoted) {
      setIsDownvoted(false);
    }
    setIsUpvoted(!isUpvoted);
    onUpvote(id);
  };

  const handleDownvote = () => {
    if (isUpvoted) {
      setIsUpvoted(false);
    }
    setIsDownvoted(!isDownvoted);
    onDownvote?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
    // Fallback to native share if available
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
        url: window.location.href,
      });
    }
  };

  const handleCreateIssue = (data: IssueFormData) => {
    onCreateIssue?.(id, data);
    setIsIssueDialogOpen(false);
    issueForm.reset();
  };

  const score = upvotes - downvotes;
  const scoreColor = score > 0 ? "text-green-500" : score < 0 ? "text-red-500" : "text-muted-foreground";

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const cardContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-10 rounded-xl border shadow-sm transition-transform group-hover:scale-105">
            <AvatarImage src={author.avatarUrl} />
            <AvatarFallback className="rounded-xl">{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <TypographyH4 className="line-clamp-1 group-hover:text-primary">{title}</TypographyH4>
              {category && (
                <Badge variant="outline" className="hidden border-primary/20 bg-primary/10 text-primary sm:inline-flex">
                  {category}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <TypographySmall>Posted by {author.name}</TypographySmall>
              <span>•</span>
              <TypographySmall>{createdAt}</TypographySmall>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 transition-opacity group-hover:opacity-100"
              onClick={e => e.preventDefault()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={e => e.preventDefault()}>
            <DropdownMenuItem onClick={e => handleAction(e, handleShare)}>
              <Share2 className="mr-2 size-4" />
              Share Thread
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={e => handleAction(e, () => setIsIssueDialogOpen(true))}>
              <GitPullRequest className="mr-2 size-4" />
              Convert to Issue
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <AlertTriangle className="mr-2 size-4" />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TypographyMuted className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed">{content}</TypographyMuted>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary/40 text-xs transition-colors hover:bg-secondary/60"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full border bg-background px-2 py-1 shadow-sm transition-colors hover:border-primary/50">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("transition-colors", isUpvoted ? "text-primary" : "")}
                onClick={e => handleAction(e, handleUpvote)}
              >
                <ThumbsUp className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upvote</TooltipContent>
          </Tooltip>

          <span className={cn("min-w-8 text-center text-sm font-medium transition-colors", scoreColor)}>{score}</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("transition-colors", isDownvoted ? "text-destructive" : "")}
                onClick={e => handleAction(e, handleDownvote)}
              >
                <ThumbsDown className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Downvote</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" className="gap-2 transition-colors hover:bg-secondary/80">
          <MessageSquare className="size-4" />
          <span className="text-sm">{replies} replies</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2 transition-colors hover:bg-secondary/80 md:ml-auto"
          onClick={e => handleAction(e, handleShare)}
        >
          <Share2 className="size-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );

  const card = (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/20 p-6 shadow-md transition-all hover:shadow-lg hover:ring-1 hover:ring-primary/10">
      {cardContent}
    </Card>
  );

  if (isPreview) {
    return card;
  }

  return (
    <>
      <Link href={`/projects/${projectSlug}/threads/${id}`} className="block">
        {card}
      </Link>

      <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Convert Thread to Issue</DialogTitle>
            <DialogDescription>
              Create a new issue based on this thread. The issue will be linked to the project and can be tracked
              separately.
            </DialogDescription>
          </DialogHeader>
          <Form {...issueForm}>
            <form onSubmit={issueForm.handleSubmit(handleCreateIssue)} className="space-y-4">
              <FormField
                control={issueForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={issueForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={issueForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">Bug</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="improvement">Improvement</SelectItem>
                          <SelectItem value="documentation">Documentation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={issueForm.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setIsIssueDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Issue</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
