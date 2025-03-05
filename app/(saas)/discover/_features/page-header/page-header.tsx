import background from "@/public/images/backgrounds/discover-header.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

import { CHAT_MESSAGE_STORAGE_KEY } from "../../constant";

function NoEnoughtRecommendations() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  function onStartChat() {
    localStorage.setItem(CHAT_MESSAGE_STORAGE_KEY, message);
    router.push(NEXT_ROUTER.odSay.root);
  }

  return (
    <div className="relative w-full">
      <Textarea
        placeholder="Try ‘Show me React issues about state management’"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="h-[100px] bg-background"
      />
      <Button size="icon" variant="outline" className="absolute bottom-4 right-4" onClick={onStartChat}>
        <ArrowRight />
      </Button>
    </div>
  );
}

function EnoughtRecommendations() {
  return (
    <Button asChild>
      <Link href={NEXT_ROUTER.odSay.root}>
        You don’t find your perfect fit ?
        <ArrowRight />
      </Link>
    </Button>
  );
}

export function PageHeader({ enoughtRecommendations = true }: { enoughtRecommendations?: boolean }) {
  const Content = useMemo(() => {
    if (enoughtRecommendations) return <EnoughtRecommendations />;
    return <NoEnoughtRecommendations />;
  }, [enoughtRecommendations]);

  return (
    <header className="relative z-[1] w-full py-16">
      <Image
        src={background}
        alt=""
        className={"pointer-events-none absolute inset-0 -z-[1] h-auto w-full opacity-50"}
        loading="eager"
      />
      <div className="relative z-[1] mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <TypographyH2 className="text-center">Match your next</TypographyH2>
            <TypographyH2 className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-center text-transparent">
              Open source contributions
            </TypographyH2>
          </div>
          <TypographyP className="text-center">
            Get recommendations based on your profile and past contributions
          </TypographyP>
        </div>
        {Content}
      </div>
    </header>
  );
}
