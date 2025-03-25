import { LucideIcon } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";

interface StatProps {
  label: string;
  value: string | number;
  iconProps?: {
    component: LucideIcon;
    classNames?: {
      base?: string;
    };
  };
  badgeProps?: {
    children: React.ReactNode;
    variant?: "default" | "destructive" | "success";
    classNames?: {
      base?: string;
    };
  };
  className?: string;
}

export function Stat({ label, value, iconProps, badgeProps, className }: StatProps) {
  const Icon = iconProps?.component;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex items-center">
        <div className="flex w-full items-center gap-4">
          {Icon && <Icon className={cn("h-5 w-5", iconProps?.classNames?.base)} />}

          <p className="text-sm font-medium">{value}</p>
        </div>

        {badgeProps && (
          <Badge variant={badgeProps.variant} className={cn("rounded-sm text-xs", badgeProps.classNames?.base)}>
            {badgeProps.children}
          </Badge>
        )}
      </div>
    </div>
  );
}
