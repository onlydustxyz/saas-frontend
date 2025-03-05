import { Pyramid } from "lucide-react";
import { PropsWithChildren } from "react";

import { Card, CardTitle } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const scoringCards = [
  {
    iconColor: "text-purple-500",
    title: "Global score",
    description:
      "The Global Score is a powerful tool that distills complex, multi-faceted performance data into a single, actionable number, enabling maintainers to make informed decisions quickly and confidently.",
  },
  {
    iconColor: "text-red-500",
    title: "Commitment score",
    description:
      "A high Commitment Score indicates that the contributor is engaged, will follow through on their assignments, and is less likely to abandon tasks midway.",
  },
  {
    iconColor: "text-yellow-500",
    title: "Technical expertise",
    description:
      "This score helps determine if the contributor has the necessary technical background to tackle the issue efficiently and effectively.",
  },
  {
    iconColor: "text-blue-500",
    title: "Project familiarity",
    description:
      "Contributors with a high Project Familiarity Score are likely to contribute more quickly and effectively due to their existing knowledge and context about the project.",
  },
  {
    iconColor: "text-green-500",
    title: "Issue matching",
    description:
      "A high Matching Score shows that the contributor has a proven track record with comparable challenges, suggesting a higher likelihood of success on the current issue.",
  },
];

export function ScoringInfoPanel({ children, containerRef }: PropsWithChildren<{ containerRef: Element | null }>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        portalProps={{ container: containerRef }}
        overlayProps={{ className: "absolute" }}
        className="absolute flex flex-col gap-3"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>How does scoring work?</SheetTitle>
        </SheetHeader>

        {scoringCards.map(card => (
          <Card key={card.title} className="flex flex-col gap-3 p-3">
            <header className="flex flex-col gap-2">
              <Pyramid className={cn(card.iconColor)} />
              <CardTitle>{card.title}</CardTitle>
            </header>
            <TypographyMuted>{card.description}</TypographyMuted>
          </Card>
        ))}
      </SheetContent>
    </Sheet>
  );
}
