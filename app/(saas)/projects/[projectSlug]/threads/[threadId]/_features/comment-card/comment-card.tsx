import { MoreHorizontal, Reply, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Separator } from "@/shared/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

interface CommentCardProps {
  id: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: CommentCardProps[];
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onReply: (id: string) => void;
}

export function CommentCard({
  id,
  content,
  author,
  createdAt,
  upvotes,
  downvotes,
  replies = [],
  onUpvote,
  onDownvote,
  onReply,
}: CommentCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

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
    onDownvote(id);
  };

  const score = upvotes - downvotes;
  const scoreColor = score > 0 ? "text-green-500" : score < 0 ? "text-red-500" : "text-muted-foreground";

  return (
    <div className="flex flex-col gap-4">
      <Card className="relative overflow-hidden border-none bg-transparent p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={author.avatarUrl} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-row gap-2">
                <TypographySmall className="font-medium">{author.name}</TypographySmall>
                <TypographySmall className="text-muted-foreground">{createdAt}</TypographySmall>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TypographyMuted className="whitespace-pre-wrap pl-11">{content}</TypographyMuted>

          <div className="flex items-center gap-2 pl-11">
            <div className="flex items-center gap-1 rounded-full border bg-background px-2 py-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`size-6 ${isUpvoted ? "text-primary" : ""}`}
                    onClick={handleUpvote}
                  >
                    <ThumbsUp className="size-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upvote</TooltipContent>
              </Tooltip>

              <span className={`min-w-6 text-center text-sm font-medium ${scoreColor}`}>{score}</span>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`size-6 ${isDownvoted ? "text-destructive" : ""}`}
                    onClick={handleDownvote}
                  >
                    <ThumbsDown className="size-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Downvote</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <Button variant="ghost" size="sm" className="h-7 gap-2" onClick={() => onReply(id)}>
              <Reply className="size-3" />
              <span className="text-xs">Reply</span>
            </Button>
          </div>
        </div>
      </Card>

      {replies.length > 0 && (
        <div className="ml-6 space-y-4 border-l pl-6">
          {replies.map(reply => (
            <CommentCard key={reply.id} {...reply} onUpvote={onUpvote} onDownvote={onDownvote} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
