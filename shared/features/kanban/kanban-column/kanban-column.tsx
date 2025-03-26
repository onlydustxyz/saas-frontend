import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";

import { ShowMore } from "@/shared/components/show-more/show-more";

import { KanbanColumnProps } from "./kanban-column.types";

export function KanbanColumn({ header, children, onNext, hasNextPage, isFetchingNextPage = false }: KanbanColumnProps) {
  return (
    <div
      className={
        "flex h-[80vh] min-w-[70vw] flex-1 flex-col items-start justify-start gap-lg rounded-md border-1 border-border-primary bg-background-primary-alt py-xl tablet:h-full tablet:min-w-[287px]"
      }
    >
      <div className={"flex h-fit w-full flex-row items-center justify-between gap-xs px-xl"}>
        {header?.startContent}
        <div className={"flex flex-row items-center justify-start gap-xs"}>
          <Typo size={"md"} weight={"medium"} as={"div"}>
            {header?.title}
          </Typo>
          {header.badge ? <Badge size={"xxs"} color={"grey"} shape={"rounded"} {...header.badge} /> : null}
        </div>
        {header?.endContent || <div />}
      </div>

      <div className={"flex w-full flex-col items-start justify-start gap-lg px-xl"}>
        {children}
        {hasNextPage && onNext ? <ShowMore onNext={onNext} loading={isFetchingNextPage} className={"w-full"} /> : null}
      </div>
    </div>
  );
}
