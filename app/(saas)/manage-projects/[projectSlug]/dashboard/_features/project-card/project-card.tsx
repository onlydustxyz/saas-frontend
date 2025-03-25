import Link from "next/link";
import { useCallback } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge, badgeVariants } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

type ProjectCardProps = {
  name: string;
  description: string;
  slug: string;
  logoUrl: string;
  categories: string[];
  languages: { name: string; logoUrl: string; percentage: number }[];
  onClick?: () => void;
  rank?: number;
  className?: string;
};

export function ProjectCard({
  name,
  description,
  slug,
  logoUrl,
  categories,
  languages,
  rank,
  onClick,
  className,
}: ProjectCardProps) {
  const renderCategories = useCallback(() => {
    if (categories.length === 0) return <div />;

    const hasExtraCategories = categories.length > 1;

    if (hasExtraCategories) {
      return (
        <div className="flex items-center gap-1">
          <Badge variant="outline">{categories[0]}</Badge>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className={badgeVariants({ variant: "outline" })}>+{categories.length - 1}</button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <ul className="flex flex-col gap-2">
                {categories.map(category => (
                  <li key={category}>
                    <TypographySmall>{category}</TypographySmall>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    return (
      <div className="flex gap-1">
        {categories.map(category => (
          <Badge variant="outline" key={category}>
            {category}
          </Badge>
        ))}
      </div>
    );
  }, [categories]);

  const renderLanguages = useCallback(() => {
    if (languages.length === 0) return null;

    const hasExtraLanguages = languages.length > 1;

    if (hasExtraLanguages) {
      return (
        <div className="flex items-center gap-1">
          <Avatar className="size-5" key={languages[0].name}>
            <AvatarImage src={languages[0].logoUrl} />
            <AvatarFallback className="rounded-xl">{languages[0].name.charAt(0)}</AvatarFallback>
          </Avatar>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className={badgeVariants({ variant: "outline" })}>+{languages.length - 1}</button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <ul className="flex flex-col gap-2">
                {languages.map(language => (
                  <li key={language.name} className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-1">
                      <Avatar className="size-5" key={language.name}>
                        <AvatarImage src={language.logoUrl} />
                        <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <TypographySmall>{language.name}</TypographySmall>
                    </div>

                    <TypographySmall>{language.percentage}%</TypographySmall>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    return (
      <div className="flex gap-1">
        {languages.map(language => (
          <Avatar className="size-5" key={language.name}>
            <AvatarImage src={language.logoUrl} />
            <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  }, [languages]);

  const hasLanguagesOrCategories = languages.length > 0 || categories.length > 0;

  return (
    <Link
      href={NEXT_ROUTER.projects.details.root(slug)}
      className="transition-opacity hover:opacity-80"
      onClick={onClick}
    >
      <Card className={cn("flex flex-col items-start gap-4 bg-stack p-4", className)}>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex items-center gap-4">
            <Avatar className="size-10 rounded-xl border">
              <AvatarImage src={logoUrl} />
              <AvatarFallback className="rounded-xl border">{name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-1.5">
              <TypographyH4 className="line-clamp-1 leading-none">{name}</TypographyH4>
              <TypographyMuted className="line-clamp-2">
                {description?.length > 60 ? description.slice(0, 60) + "..." : description}
              </TypographyMuted>
            </div>
          </div>
          {rank ? <TypographyH4>#{rank}</TypographyH4> : <div />}
        </div>

        {hasLanguagesOrCategories && (
          <div className="flex w-full items-center justify-between">
            {renderCategories()}
            {renderLanguages()}
          </div>
        )}
      </Card>
    </Link>
  );
}
