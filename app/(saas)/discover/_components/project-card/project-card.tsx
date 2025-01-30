import Link from "next/link";
import { useCallback } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { ProjectCardProps } from "./project-card.types";

export function ProjectCard({ name, description, slug, logoUrl, categories, languages }: ProjectCardProps) {
  const renderCategories = useCallback(() => {
    if (categories.length === 0) return <div />;

    const hasExtraCategories = categories.length > 1;

    if (hasExtraCategories) {
      return (
        <div className="flex gap-1">
          <Badge variant="outline">{categories[0]}</Badge>
          <Badge variant="outline">+{categories.length - 1}</Badge>
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
        <div className="flex gap-1">
          <Avatar className="size-5" key={languages[0].name}>
            <AvatarImage src={languages[0].logoUrl} />
            <AvatarFallback className="rounded-xl">{languages[0].name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge variant="outline">+{languages.length - 1}</Badge>
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

  return (
    <Link href={NEXT_ROUTER.projects.details.root(slug)}>
      <Card className="flex items-center gap-4 p-3">
        <Avatar className="size-24 rounded-xl">
          <AvatarImage src={logoUrl} />
          <AvatarFallback className="rounded-xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-col gap-1.5">
          <TypographyH4>{name}</TypographyH4>
          <TypographyMuted className="line-clamp-2">{description}</TypographyMuted>
          <div className="flex w-full items-center justify-between">
            {renderCategories()}
            {renderLanguages()}
          </div>
        </div>
      </Card>
    </Link>
  );
}
