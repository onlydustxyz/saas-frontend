import { AlertCircle } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";

import { ApplicationLimitBadgeProps } from "./application-limit-badge.types";

export function ApplicationLimitBadge({ count }: ApplicationLimitBadgeProps) {
  const isOverSubmit = count > 10;
  if (!isOverSubmit) return null;

  return (
    <Badge
      size="xxs"
      color="error"
      icon={{
        component: AlertCircle,
      }}
    >
      {count} applications
    </Badge>
  );
}
