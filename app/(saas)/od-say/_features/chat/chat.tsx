import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { bootstrap } from "@/core/bootstrap";

import { Markdown } from "@/shared/features/markdown/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import useChat from "./chat.hooks";
import { ChatFormData, ChatProps, MessageProps, formSchema, messageVariants } from "./chat.types";

function Message({ author, content, timestamp, variant }: MessageProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={`flex items-center gap-2 ${variant === "user" ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar>
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>{author.login}</AvatarFallback>
        </Avatar>
        <TypographySmall>{author.login}</TypographySmall>
        <TypographyMuted className={variant === "user" ? "mr-auto" : "ml-auto"}>
          {dateKernelPort.formatDistanceToNow(timestamp)}
        </TypographyMuted>
      </div>
      <div className={cn(messageVariants({ variant }))}>
        <Markdown content={content} />
      </div>
    </div>
  );
}

export default function Chat({ onSuggestionChange }: ChatProps) {
  const { startChat, sendMessage, messages, projectIds, issueIds } = useChat();

  const form = useForm<ChatFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ message }: ChatFormData) => {
    sendMessage(message);
  };

  useEffectOnce(() => {
    startChat();
  });

  useEffect(() => {
    onSuggestionChange(projectIds, issueIds);
  }, [projectIds, issueIds, onSuggestionChange]);

  return (
    <section className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-8">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <div className="mb-2 flex flex-col gap-2">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Tell me what you seek" {...field} className="pr-12" />
                      <Button
                        size="icon"
                        type="submit"
                        variant="ghost"
                        className={cn(
                          "absolute right-0 top-0",
                          form.formState.isValid ? "text-primary" : "text-muted-foreground"
                        )}
                        disabled={!form.formState.isValid}
                      >
                        <SendHorizonal className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
