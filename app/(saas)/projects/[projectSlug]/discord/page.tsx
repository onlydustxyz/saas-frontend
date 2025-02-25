"use client";

import { useEffect } from "react";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

declare global {
  interface Window {
    WidgetBot: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    widgetbot: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        server: string;
        channel: string;
        className?: string;
      },
      HTMLElement
    >;
  }
}

export default function DiscordPage() {
  useEffect(() => {
    // Load WidgetBot script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@widgetbot/html-embed";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ScrollView>
      <div className="container space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <TypographyH3>Discord Community</TypographyH3>
            <TypographyMuted>Join our Discord community to chat with other contributors</TypographyMuted>
          </div>
        </div>

        <Card className="overflow-hidden">
          <widgetbot
            server={process.env.NEXT_PUBLIC_DISCORD_SERVER_ID}
            channel={process.env.NEXT_PUBLIC_DISCORD_CHANNEL_ID}
            className="h-[600px] w-full"
          />
        </Card>
      </div>
    </ScrollView>
  );
}
