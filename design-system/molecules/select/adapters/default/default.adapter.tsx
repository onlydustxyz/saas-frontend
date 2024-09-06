import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { ChevronDown, Search } from "lucide-react";
import { ElementType, useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/design-system/atoms/input";
import { Menu } from "@/design-system/molecules/menu";

import { cn } from "@/shared/helpers/cn";

import { SelectPort } from "../../select.types";
import { SelectDefaultVariants } from "./default.variants";

export function SelectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  selectedIds,
  onSelect,
  items,
  closeOnSelect,
  autoComplete,
  onNextPage,
  hasNextPage,
  isDisabled,
  isAutoComplete = false,
  ...inputProps
}: SelectPort<C>) {
  const Component = as || "div";
  const slots = SelectDefaultVariants();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 0 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([role, dismiss, listNav]);

  const selectedValues = useMemo(() => {
    if (selectedIds?.length) {
      return selectedIds
        .map(id => {
          const findInItems = items.find(item => item.id === id);
          if (findInItems) {
            return findInItems.label;
          }

          return id;
        })
        .join(", ");
    }
  }, [selectedIds, items]);

  function handleSelect(...args: Parameters<NonNullable<SelectPort<C>["onSelect"]>>) {
    if (closeOnSelect) {
      setOpen(false);
    }
    onSelect?.(args[0]);
  }

  function onSearchChange(value: string) {
    if (autoComplete?.onChange) {
      autoComplete.onChange(value);
    } else {
      setInputValue(value);
    }
  }

  const formatedInputValue = useMemo(() => {
    if (!isAutoComplete) {
      return selectedValues;
    }

    if (open && isAutoComplete) {
      if (autoComplete) {
        return autoComplete.value;
      }

      return inputValue;
    }

    return selectedValues;
  }, [isAutoComplete, autoComplete, selectedValues, open, inputValue]);

  const formatedItems = useMemo(() => {
    if (isAutoComplete && !autoComplete?.onChange) {
      return items.filter(item => {
        return (
          item.id.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.searchValue?.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
    }
    return items;
  }, [isAutoComplete, autoComplete, inputValue, items]);

  useEffect(() => {
    setInputValue("");
  }, [open]);

  if (isDisabled) {
    return (
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
        <Input
          value={selectedValues}
          isDisabled={isDisabled}
          endIcon={{ component: ChevronDown }}
          canInteract={isAutoComplete}
          {...inputProps}
        />
      </Component>
    );
  }

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div ref={refs.setReference} {...getReferenceProps()} onClick={() => setOpen(true)} className={"cursor-pointer"}>
        <Input
          value={formatedInputValue}
          endIcon={!isAutoComplete ? { component: ChevronDown } : undefined}
          startIcon={isAutoComplete ? { component: Search } : undefined}
          canInteract={isAutoComplete}
          onChange={e => onSearchChange(e.target.value)}
          {...inputProps}
        />
      </div>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <Menu
                items={formatedItems}
                onSelect={handleSelect}
                selectedIds={selectedIds}
                onNextPage={onNextPage}
                hasNextPage={hasNextPage}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </Component>
  );
}
