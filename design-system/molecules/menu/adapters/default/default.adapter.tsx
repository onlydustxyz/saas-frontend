import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { MenuItem } from "@/design-system/molecules/menu-item";
import { MenuDefaultVariants } from "@/design-system/molecules/menu/adapters/default/default.variants";

import { ShowMore } from "@/shared/components/show-more/show-more";
import { cn } from "@/shared/helpers/cn";

import { ListMenuPort } from "../../menu.types";

export function MenuDefaultAdapter({
  classNames,
  items,
  selectedIds,
  onSelect,
  onNextPage,
  hasNextPage,
  isLoading,
}: ListMenuPort) {
  const slots = MenuDefaultVariants();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<null | number>(null);

  function onSelectItem(value: string) {
    const valuesArray = [...(selectedIds || [])];

    if (selectedIds?.includes(value)) {
      valuesArray.splice(valuesArray.indexOf(value), 1);
    } else {
      valuesArray.push(value);
    }

    onSelect?.(
      valuesArray,
      items.filter(item => valuesArray.includes(item.id))
    );
  }

  useLayoutEffect(() => {
    if (triggerRef?.current) {
      setMinWidth(triggerRef?.current?.offsetWidth);
    }
  }, [triggerRef]);

  const itemsWithSelection = useMemo(() => {
    return items.map(item => ({
      ...item,
      isSelected: selectedIds?.includes(item.id),
    }));
  }, [items, selectedIds]);

  const showMore = hasNextPage && !!onNextPage && !isLoading;

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)} style={minWidth ? { minWidth } : {}}>
        {itemsWithSelection.map(item => (
          <MenuItem key={item.id} {...item} onClick={onSelectItem} />
        ))}
        {showMore ? (
          <ShowMore className={"py-2"} onNext={() => onNextPage?.()} loading={isLoading || false} skip={!hasNextPage} />
        ) : undefined}
      </div>
    </div>
  );
}
