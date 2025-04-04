import { ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Markdown } from "@/shared/features/markdown/markdown";
import { cn } from "@/shared/helpers/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Summary({
  body,
  labels,
  author,
}: {
  body?: string;
  labels?: string[];
  author: { login: string; avatarUrl: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="flex flex-col gap-3 p-3">
      <header className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback className="size-6">{author.login.charAt(0)}</AvatarFallback>
        </Avatar>

        <TypographyP>{author.login}</TypographyP>
      </header>

      {body ? (
        <div className="relative">
          <div className={cn("overflow-hidden transition-all duration-200", !isExpanded && "max-h-[300px]")}>
            <Emoji>
              <Markdown content={body} />
            </Emoji>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
          )}

          <Button type="button" variant="ghost" className="mt-2 w-full" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <div className="flex items-center gap-2">
                Show less <ChevronUp className="size-4" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Show more <ChevronDown className="size-4" />
              </div>
            )}
          </Button>
        </div>
      ) : null}

      <footer>
        {labels ? (
          <ul className="flex flex-wrap items-center gap-2">
            {labels.map(label => (
              <li key={label}>
                <Badge variant="outline">{label}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </footer>
    </Card>
  );
}
