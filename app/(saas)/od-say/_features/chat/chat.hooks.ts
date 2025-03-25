import odSayAvatar from "@/public/images/avatars/od_say.webp";
import { useMemo } from "react";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { ContinueChatResponse, StartChatResponse } from "@/core/domain/me/me-contract.types";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

import { Author, ChatMessage } from "./_features/message/message.types";

const assistant = {
  login: "OD-Say",
  avatarUrl: odSayAvatar.src,
};

function messageFromAssistant({
  assistantMessage,
  suggestedProjects,
  suggestedIssues,
  assistantFollowUpMessage,
}: Partial<ContinueChatResponse & StartChatResponse>): ChatMessage {
  return {
    author: assistant,
    content: assistantMessage,
    variant: "assistant",
    projectIds: suggestedProjects,
    issueIds: suggestedIssues,
    followUpMessage: assistantFollowUpMessage,
  };
}

function messageFromUser(author: Author, content: string): ChatMessage {
  return {
    author,
    content,
    variant: "user",
  };
}

export default function useChat() {
  const [messages, setMessages] = useLocalStorage<Array<ChatMessage>>("odsay-chat-messages", []);
  const [chatId, setChatId] = useLocalStorage<string>("odsay-chat-id");
  const { capture } = usePosthog();

  const { user } = useAuthUser();

  const { mutate: startChat, isPending: isStartChatPending } = MeReactQueryAdapter.client.useStartRecoChat({
    options: {
      onSuccess: data => {
        setMessages([messageFromAssistant(data)]);
        setChatId(data.chatId);
      },
      onError: error => toast.error(error.message),
      retry: 3,
    },
  });

  const { mutate: continueChat, isPending: isContinueChatPending } = MeReactQueryAdapter.client.useContinueRecoChat({
    pathParams: { chatId: chatId || "" },
    options: {
      onSuccess: data => setMessages([...(messages || []), messageFromAssistant(data)]),
      onError: error => toast.error(error.message),
      retry: 3,
    },
  });

  const thinkingMessage: ChatMessage = {
    author: assistant,
    variant: "assistant",
  };

  const isThinking = isStartChatPending || isContinueChatPending;

  const allMessages = useMemo(
    () => (isThinking ? [...(messages || []), thinkingMessage] : messages || []),
    [isThinking, messages]
  );

  const sendMessage = (message: string) => {
    if (!user) return;
    setMessages([...(messages || []), messageFromUser(user, message)]);
    continueChat({ userMessage: message });

    capture("project_recommendation_chat_send_message", { chatId });
  };

  const startNewConversation = () => {
    setMessages([]);
    setChatId(undefined);
    startChat({});
  };

  return {
    chatId,
    messages: allMessages,
    startNewConversation,
    sendMessage,
    isThinking,
  };
}
