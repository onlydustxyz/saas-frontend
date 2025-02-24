import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Loader2, MessageSquarePlus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Translate } from "@/shared/translation/components/translate/translate";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { ThreadCard } from "../thread-card/thread-card";

const THREAD_CATEGORIES = [
  { value: "general", label: "General Discussion" },
  { value: "feature", label: "Feature Request" },
  { value: "bug", label: "Bug Report" },
  { value: "help", label: "Help Wanted" },
  { value: "idea", label: "Ideas & Suggestions" },
  { value: "announcement", label: "Announcement" },
] as const;

const SUGGESTED_TAGS = [
  "UI/UX",
  "Performance",
  "Security",
  "Documentation",
  "Enhancement",
  "Discussion",
  "Question",
  "Backend",
  "Frontend",
  "API",
  "Database",
  "Testing",
] as const;

const threadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(THREAD_CATEGORIES.map(c => c.value) as [string, ...string[]]),
  tags: z.array(z.string()).min(1, "Add at least one tag").max(5, "Maximum 5 tags allowed"),
});

type ThreadFormData = z.infer<typeof threadSchema>;

// Mock data for demonstration
const MOCK_THREADS = [
  {
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
  },
  {
    id: "2",
    title: "Feature Request: Dark Mode",
    content:
      "I think it would be great to add dark mode support to the project. This would help reduce eye strain for users working at night and provide a more modern look to the application.",
    author: {
      name: "Jane Smith",
      avatarUrl: "https://github.com/shadcn.png",
    },
    createdAt: "1 day ago",
    upvotes: 10,
    downvotes: 2,
    replies: 5,
    tags: ["Feature Request", "UI/UX"],
    category: "Enhancement",
  },
];

export function ThreadsList({ params }: { params: { projectSlug: string } }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState<"edit" | "preview">("edit");
  const [tagInput, setTagInput] = useState("");

  const form = useForm<ThreadFormData>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "general",
      tags: [],
    },
  });

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem("threadDraft");
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      form.reset(parsedDraft);
    }
  }, [form]);

  // Save draft to localStorage
  const saveDraft = useCallback((data: Partial<ThreadFormData>) => {
    localStorage.setItem("threadDraft", JSON.stringify(data));
  }, []);

  // Auto-save draft when form changes
  useEffect(() => {
    const subscription = form.watch(data => {
      saveDraft(data);
    });
    return () => subscription.unsubscribe();
  }, [form, saveDraft]);

  const onSubmit = async (data: ThreadFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newThread = {
        id: String(threads.length + 1),
        title: data.title,
        content: data.content,
        author: {
          name: "Current User",
          avatarUrl: "https://github.com/shadcn.png",
        },
        createdAt: "Just now",
        upvotes: 0,
        downvotes: 0,
        replies: 0,
        tags: data.tags,
        category: data.category,
      };

      setThreads([newThread, ...threads]);
      setIsCreateDialogOpen(false);
      form.reset();
      localStorage.removeItem("threadDraft");

      toast.success("Thread Created", {
        description: "Your thread has been posted successfully.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create thread. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    if (currentTags.length >= 5) {
      toast.success("Maximum Tags Reached", {
        description: "You can only add up to 5 tags.",
      });
      return;
    }
    if (!currentTags.includes(tag)) {
      form.setValue("tags", [...currentTags, tag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter(tag => tag !== tagToRemove)
    );
  };

  const handleUpvote = (id: string) => {
    setThreads(prevThreads =>
      prevThreads.map(thread => (thread.id === id ? { ...thread, upvotes: thread.upvotes + 1 } : thread))
    );
  };

  const handleDownvote = (id: string) => {
    setThreads(prevThreads =>
      prevThreads.map(thread => (thread.id === id ? { ...thread, downvotes: thread.downvotes + 1 } : thread))
    );
  };

  const handleShare = (id: string) => {
    const thread = threads.find(t => t.id === id);
    if (thread) {
      // You could implement more sophisticated sharing logic here
      console.log(`Sharing thread: ${thread.title}`);
    }
  };

  const handleCreateIssue = (threadId: string, issueData: any) => {
    // TODO: Implement actual API call to create issue
    console.log("Creating issue from thread:", threadId, issueData);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <TypographyH3>
          <Translate token="project:details.threads.title" />
        </TypographyH3>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              <Translate token="project:details.threads.create.form.submit" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>
                <Translate token="project:details.threads.create.title" />
              </DialogTitle>
              <DialogDescription>
                Start a new discussion thread. Be clear and specific to get better responses.
              </DialogDescription>
            </DialogHeader>

            <Tabs value={currentTab} onValueChange={value => setCurrentTab(value as "edit" | "preview")}>
              <TabsList className="mb-4">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <TabsContent value="edit" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="What's your thread about?" {...field} />
                          </FormControl>
                          <FormDescription>
                            Be specific and imagine you're asking a question to another person.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {THREAD_CATEGORIES.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {field.value.map(tag => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                                      onClick={() => handleRemoveTag(tag)}
                                    >
                                      <X className="size-3" />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add tags..."
                                  value={tagInput}
                                  onChange={e => setTagInput(e.target.value)}
                                  onKeyDown={e => {
                                    if (e.key === "Enter" && tagInput) {
                                      e.preventDefault();
                                      handleAddTag(tagInput);
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => tagInput && handleAddTag(tagInput)}
                                >
                                  <Hash className="size-4" />
                                </Button>
                              </div>
                              <ScrollArea className="h-20">
                                <div className="flex flex-wrap gap-2 p-2">
                                  {SUGGESTED_TAGS.map(tag => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="cursor-pointer"
                                      onClick={() => handleAddTag(tag)}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </FormControl>
                          <FormDescription>Add up to 5 tags to help others find your thread.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your topic in detail..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide all the information others would need to understand and respond to your thread.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="preview">
                    <Card className="p-6">
                      <ThreadCard
                        id="preview"
                        title={form.getValues("title") || "Thread Title"}
                        content={form.getValues("content") || "Thread content will appear here..."}
                        author={{
                          name: "Current User",
                          avatarUrl: "https://github.com/shadcn.png",
                        }}
                        createdAt="Preview"
                        upvotes={0}
                        replies={0}
                        tags={form.getValues("tags")}
                        category={form.getValues("category")}
                        onUpvote={() => {}}
                      />
                    </Card>
                  </TabsContent>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                      Create Thread
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {threads.length > 0 ? (
          threads.map(thread => (
            <ThreadCard
              key={thread.id}
              {...thread}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
              onShare={handleShare}
              onCreateIssue={handleCreateIssue}
            />
          ))
        ) : (
          <Card className="p-6">
            <TypographyMuted>
              <Translate token="project:details.threads.empty.description" />
            </TypographyMuted>
          </Card>
        )}
      </div>
    </div>
  );
}
