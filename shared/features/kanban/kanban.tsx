import { cn } from "@/shared/utils";

import { KanbanProps } from "./kanban.types";

export function Kanban({ children: _children }: KanbanProps) {
  const children = Array.isArray(_children) ? _children : [_children];

  return (
    <div className={"h-full w-full overflow-x-auto"}>
      <div
        className={cn(
          "grid h-full min-h-[500px] min-w-[1600px] gap-lg",
          children.length === 5 ? "grid-cols-5" : "grid-cols-4"
        )}
      >
        {children.map(child => child)}
      </div>
    </div>
  );
}
