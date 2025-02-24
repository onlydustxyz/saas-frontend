"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { ThreadCard } from "../_features/thread-card/thread-card";
import { CommentCard } from "./_features/comment-card/comment-card";

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
});

type CommentFormData = z.infer<typeof commentSchema>;

// Mock data for demonstration
const MOCK_THREAD = {
  id: "1",
  title: "Welcome to the Project Discussion",
  content: "Let's start collaborating and sharing ideas about this project!",
  author: {
    name: "John Doe",
    avatarUrl: "https://github.com/shadcn.png",
  },
  createdAt: "2 hours ago",
  upvotes: 5,
  downvotes: 1,
  replies: 2,
  tags: ["Discussion", "Welcome"],
  category: "General",
};

const MOCK_COMMENTS = [
  {
    id: "1",
    content: "This is a great initiative! Looking forward to contributing.",
    author: {
      name: "Alice Johnson",
      avatarUrl: "https://github.com/shadcn.png",
    },
    createdAt: "1 hour ago",
    upvotes: 3,
    downvotes: 0,
    replies: [
      {
        id: "1-1",
        content: "Totally agree! The project has a lot of potential.",
        author: {
          name: "Bob Smith",
          avatarUrl: "https://github.com/shadcn.png",
        },
        createdAt: "30 minutes ago",
        upvotes: 2,
        downvotes: 0,
        onUpvote: () => {},
        onDownvote: () => {},
        onReply: () => {},
      },
    ],
  },
  {
    id: "2",
    content: "I have some ideas I'd like to share about the architecture.",
    author: {
      name: "Charlie Brown",
      avatarUrl: "https://github.com/shadcn.png",
    },
    createdAt: "45 minutes ago",
    upvotes: 4,
    downvotes: 1,
    replies: [],
  },
];

type SortOption = "best" | "top" | "new" | "old" | "controversial";

function ThreadDetailsPage({ params }: { params: { threadId: string; projectSlug: string } }) {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [sortBy, setSortBy] = useState<SortOption>("best");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const sortComments = useCallback(
    (commentsToSort: typeof MOCK_COMMENTS) => {
      return [...commentsToSort].sort((a, b) => {
        switch (sortBy) {
          case "top":
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
          case "new":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "old":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case "controversial":
            return (b.downvotes / b.upvotes || 0) - (a.downvotes / a.upvotes || 0);
          default: // "best"
            return b.upvotes - a.upvotes;
        }
      });
    },
    [sortBy]
  );

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setComments(prevComments => sortComments(prevComments));
  }, [sortBy, sortComments]);

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    try {
      const newComment = {
        id: String(comments.length + 1),
        content: data.content,
        author: {
          name: "Current User",
          avatarUrl: "https://github.com/shadcn.png",
        },
        createdAt: "Just now",
        upvotes: 0,
        downvotes: 0,
        replies: [],
      };

      if (replyingTo) {
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === replyingTo
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), newComment],
                }
              : comment
          )
        );
        setReplyingTo(null);
      } else {
        setComments(prevComments => sortComments([newComment, ...prevComments]));
      }

      form.reset();
    } catch (error) {
      toast.error("Error posting comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { ...comment, upvotes: comment.upvotes + 1 }
          : {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === commentId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
              ),
            }
      )
    );
  };

  const handleDownvote = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { ...comment, downvotes: comment.downvotes + 1 }
          : {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === commentId ? { ...reply, downvotes: reply.downvotes + 1 } : reply
              ),
            }
      )
    );
  };

  return (
    <ScrollView>
      <div className="container space-y-6 py-6">
        {isLoading ? (
          <Card className="p-6">
            <div className="flex animate-pulse flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-muted"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 w-3/4 rounded bg-muted"></div>
                  <div className="h-3 w-1/4 rounded bg-muted"></div>
                </div>
              </div>
              <div className="h-32 rounded bg-muted"></div>
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-muted"></div>
                <div className="h-6 w-20 rounded-full bg-muted"></div>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="space-y-6 p-6">
              <ThreadCard {...MOCK_THREAD} projectSlug={params.projectSlug} onUpvote={() => {}} isPreview />

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{comments.length} comments</span>
                  <Separator orientation="vertical" className="h-4" />
                  <Select value={sortBy} onValueChange={value => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best">Best</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="old">Old</SelectItem>
                      <SelectItem value="controversial">Controversial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={
                              replyingTo ? "Write your reply..." : "What are your thoughts on this discussion?"
                            }
                            className="min-h-[100px] resize-y"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    {replyingTo && (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        disabled={isSubmitting}
                      >
                        Cancel Reply
                      </Button>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                      {replyingTo ? "Reply" : "Comment"}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="space-y-4">
                {comments.map(comment => (
                  <CommentCard
                    key={comment.id}
                    {...comment}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                    onReply={() => setReplyingTo(comment.id)}
                  />
                ))}
                {comments.length === 0 && (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <MessageSquare className="size-12 text-muted-foreground" />
                    <div className="space-y-2">
                      <TypographyH3>No comments yet</TypographyH3>
                      <TypographyMuted>Be the first to share your thoughts!</TypographyMuted>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </ScrollView>
  );
}

export default ThreadDetailsPage;
