"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Loader2, MessageSquare, PlusCircle, Search, Send, Settings, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

// Mock data for channels
const MOCK_CHANNELS = [
  { id: "1", name: "general", description: "General discussion", unreadCount: 2 },
  { id: "2", name: "introductions", description: "Introduce yourself", unreadCount: 0 },
  { id: "3", name: "help", description: "Get help with the project", unreadCount: 5 },
];

// Mock data for messages
const MOCK_MESSAGES = [
  {
    id: "1",
    content: "Hey everyone! Welcome to the general channel 👋",
    author: {
      name: "John Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "2",
    content: "Thanks! Excited to be here and contribute to the project!",
    author: {
      name: "Jane Smith",
      avatarUrl: "https://github.com/shadcn.png",
    },
    createdAt: "2024-02-20T10:05:00Z",
  },
];

const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface Message {
  id: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
}

const channelSchema = z.object({
  name: z
    .string()
    .min(2, "Channel name must be at least 2 characters")
    .max(32, "Channel name must be less than 32 characters")
    .regex(/^[a-z0-9-]+$/, "Channel name can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(1, "Description is required").max(100, "Description must be less than 100 characters"),
});

type ChannelFormData = z.infer<typeof channelSchema>;

export default function ChannelsPage({ params }: { params: { projectSlug: string } }) {
  const [selectedChannel, setSelectedChannel] = useState(MOCK_CHANNELS[0]);
  const [channels, setChannels] = useState(MOCK_CHANNELS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channelForm = useForm<ChannelFormData>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data: MessageFormData) => {
    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newMessage: Message = {
        id: String(messages.length + 1),
        content: data.content,
        author: {
          name: "Current User",
          avatarUrl: "https://github.com/shadcn.png",
        },
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMessage]);
      form.reset();
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const onCreateChannel = async (data: ChannelFormData) => {
    setIsCreatingChannel(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newChannel = {
        id: String(channels.length + 1),
        name: data.name,
        description: data.description,
        unreadCount: 0,
      };

      setChannels(prev => [...prev, newChannel]);
      setSelectedChannel(newChannel);
      setIsCreateDialogOpen(false);
      channelForm.reset();

      toast.success("Channel Created", {
        description: `#${data.name} has been created successfully.`,
      });
    } catch (error) {
      toast.error("Failed to create channel");
    } finally {
      setIsCreatingChannel(false);
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      {/* Channels Sidebar */}
      <Card className="hidden w-64 flex-shrink-0 md:block">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <TypographyH3 className="text-lg">Channels</TypographyH3>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Channel</DialogTitle>
                <DialogDescription>Create a new channel for specific discussions.</DialogDescription>
              </DialogHeader>
              <Form {...channelForm}>
                <form onSubmit={channelForm.handleSubmit(onCreateChannel)} className="space-y-4">
                  <FormField
                    control={channelForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              value={field.value.toLowerCase()}
                              className="border-0 p-0 focus-visible:ring-0"
                              placeholder="channel-name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={channelForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} placeholder="What's this channel about?" className="resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreatingChannel}>
                      {isCreatingChannel && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Channel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[calc(100%-3.5rem)]">
          <div className="space-y-2 p-2">
            {channels.map(channel => (
              <Button
                key={channel.id}
                variant={channel.id === selectedChannel.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedChannel(channel)}
              >
                <Hash className="mr-2 h-4 w-4" />
                <span className="flex-1 truncate text-left">{channel.name}</span>
                {channel.unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {channel.unreadCount}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex flex-1 flex-col">
        {/* Channel Header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <div>
              <TypographySmall className="font-medium">{selectedChannel.name}</TypographySmall>
              <TypographyMuted className="text-xs">{selectedChannel.description}</TypographyMuted>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Channel Members</SheetTitle>
                  <SheetDescription>Members in #{selectedChannel.name}</SheetDescription>
                </SheetHeader>
                {/* Add member list here */}
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex animate-pulse items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-4 w-64 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map(message => (
                <div key={message.id} className="group flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={message.author.avatarUrl} />
                    <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.author.name}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
                    </div>
                    <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">{message.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
              <TypographyH3>Welcome to #{selectedChannel.name}!</TypographyH3>
              <TypographyMuted>This is the start of the channel.</TypographyMuted>
            </div>
          )}
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder={`Message #${selectedChannel.name}`}
                        className="max-h-32 min-h-[2.5rem] resize-none py-2"
                        onKeyDown={e => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" disabled={isSending}>
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
