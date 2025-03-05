import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, SendHorizonal, Sparkle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { useIntercom } from "@/shared/intercom/intercom.context";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

import Message from "./_features/message/message";
import useChat from "./chat.hooks";
import { ChatFormData, ChatProps, formSchema } from "./chat.types";

export default function Chat({ initialMessage }: ChatProps) {
  const { startNewConversation, sendMessage, messages, isThinking, chatId, startNewConversationWithMessage } =
    useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { hideIntercomLauncher } = useIntercom();

  const { open: openIssue } = useApplyIssueSidePanel();
  const { open: openProject } = useProjectSidePanel();

  function onOpenIssue(contributionUuid: string) {
    openIssue({ contributionUuid });
  }

  function onOpenProject(id: string) {
    openProject({ projectId: id });
  }

  const form = useForm<ChatFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    hideIntercomLauncher();
  });

  const { handleSubmit } = form;

  useEffect(() => {
    form.setFocus("message");
  }, [form]);

  const onSubmit = ({ message }: ChatFormData) => {
    if (!isThinking) {
      sendMessage(message);
      form.reset({
        message: "",
      });
    }
  };

  useEffectOnce(() => {
    if (initialMessage) {
      console.log("initialMessage", initialMessage);
      startNewConversationWithMessage(initialMessage);
    } else if (!chatId) {
      startNewConversation();
    }
  });

  return (
    <section className="mx-auto flex h-full w-full flex-col py-2 lg:w-[640px]">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {messages.map(message => (
          <Message
            key={`${message.author.login}-${message.content}-${Date.now()}`}
            {...message}
            onOpenProject={onOpenProject}
            onOpenContribution={onOpenIssue}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="sticky bottom-0 z-20 flex w-full flex-col gap-2">
        {messages.length > 1 ? (
          <Button
            className="mx-auto w-fit rounded-full"
            onClick={() => startNewConversation()}
            size="sm"
            variant="outline"
            type="button"
          >
            <RefreshCcw />
            <span>Reset conversation</span>
          </Button>
        ) : null}
        <div className="bg-background pb-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-0 top-0 flex h-full items-center justify-center p-2">
                          <Sparkle className="h-4 w-4 fill-[#0037FF] text-[#0037FF]" />
                        </div>
                        <Input
                          placeholder="Share your preferences to refine results"
                          {...field}
                          className="pl-8 pr-12"
                        />
                        <Button
                          size="icon"
                          type="submit"
                          variant="ghost"
                          className={cn(
                            "absolute right-0 top-0",
                            form.formState.isValid ? "text-primary" : "text-muted-foreground"
                          )}
                          disabled={!form.formState.isValid || isThinking}
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
      </div>
    </section>
  );
}
