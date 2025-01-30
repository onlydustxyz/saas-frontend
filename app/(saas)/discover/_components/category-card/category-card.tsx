import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import type { CategoryCardProps } from "./category-card.types";

export function CategoryCard({ title, description, icon, projectCount, color }: CategoryCardProps) {
  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Category Icon */}
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: color }}
          >
            <RemixIcon name={icon} size="lg" />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            {/* Title */}
            <TypographyH4 className="truncate">{title}</TypographyH4>

            {/* Description */}
            <TypographyMuted>{description}</TypographyMuted>

            {/* Counter */}
            <div className="mt-1 inline-flex h-4 items-center">
              <Badge variant="outline">{projectCount.toLocaleString()} Projects</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
