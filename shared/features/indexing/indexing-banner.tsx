import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";

interface IndexingMessage {
  id: number;
  text: string;
}

const INDEXING_MESSAGES: IndexingMessage[] = [
  { id: 1, text: "Fetching your data from GitHub..." },
  { id: 2, text: "Building your personalized profile..." },
  { id: 3, text: "Analyzing your contributions..." },
  { id: 4, text: "Almost there! Creating your dashboard..." },
];

const ROTATION_INTERVAL = 3500; // 3.5 seconds between each message
const TOTAL_DURATION = ROTATION_INTERVAL * INDEXING_MESSAGES.length;

function SafeIndexingBanner() {
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const lastMessageTimeRef = useRef<number>(0);
  const currentIndexRef = useRef(0);

  const showNextMessage = useCallback((index: number) => {
    const message = INDEXING_MESSAGES[index];

    toast(message.text, {
      duration: TOTAL_DURATION - index * ROTATION_INTERVAL,
      position: "bottom-left",
      style: {
        backgroundColor: "var(--info-bg)",
        color: "var(--info-text)",
        borderColor: "var(--info-border)",
      },
      icon: (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--info-text)] border-t-transparent" />
      ),
    });
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        lastMessageTimeRef.current = timestamp;
        showNextMessage(0);
      }

      const elapsed = timestamp - lastMessageTimeRef.current;

      if (elapsed >= ROTATION_INTERVAL) {
        currentIndexRef.current += 1;
        lastMessageTimeRef.current = timestamp;

        if (currentIndexRef.current < INDEXING_MESSAGES.length) {
          showNextMessage(currentIndexRef.current);
        } else {
          localStorage.setItem("hide-indexing-banner", "true");
          return; // Stop animation when all messages are shown
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [showNextMessage]
  );

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return null;
}

export function IndexingBanner() {
  const isForcedOnboarding = useForcedOnboarding();

  if (!isForcedOnboarding || localStorage.getItem("hide-indexing-banner")) {
    return null;
  }

  return <SafeIndexingBanner />;
}
