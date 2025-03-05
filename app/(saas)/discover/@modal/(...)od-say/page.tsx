"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Chat from "@/app/(saas)/od-say/_features/chat/chat";
import { ChatRef } from "@/app/(saas)/od-say/_features/chat/chat.types";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { cn } from "@/shared/utils";

import { CHAT_MESSAGE_STORAGE_KEY } from "../../constant";

function ODSayModal() {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const message = localStorage.getItem(CHAT_MESSAGE_STORAGE_KEY);

  function onDismiss() {
    router.back();
  }

  // async function onLoad(ref: { startNewConversationWithMessage: (message: string) => Promise<void> }) {
  //   const message = localStorage.getItem(CHAT_MESSAGE_STORAGE_KEY);
  //   if (message) {
  //     console.log("onload message", message);
  //     await ref.startNewConversationWithMessage(message);
  //   }
  // }

  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  return (
    <Dialog
      open={true}
      onOpenChange={o => {
        if (!o) {
          onDismiss();
        } else {
          console.log("open");
        }
      }}
    >
      <DialogContent
        onInteractOutside={e => {
          e.preventDefault();
        }}
        className={cn(
          "flex h-[calc(100vh-2rem)] max-h-[900px] w-[calc(100vw-2rem)] max-w-[1400px] flex-col overflow-y-auto p-6 transition-all"
        )}
      >
        <div className="relative flex-1">
          <Chat initialMessage={message} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default withClientOnly(ODSayModal);
