import { z } from "zod";

export const formSchema = z.object({
  message: z.string().min(1),
});

export type ChatFormData = z.infer<typeof formSchema>;

export interface ChatProps {
  initialMessage?: string | null;
}

export interface ChatRef {
  sendMessage: (message: string) => void;
  startNewConversation: () => void;
}
