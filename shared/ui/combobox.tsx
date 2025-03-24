"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { cn } from "../utils";
import { ShowMore } from "./show-more";

export interface ComboboxProps<T extends string> {
  options: { value: T; label: string; keywords?: string[]; startContent?: ReactNode }[];
  value: T[] | null | undefined;
  onChange: (value: T[]) => void;
  placeholder?: string;
  selectedLabel?: string;
  closeOnSelect?: boolean;
  selectionMode?: "single" | "multiple";
  fullWidth?: boolean;
  search?: {
    value: string;
    onChange: (value: string) => void;
  };
  pagination?: {
    hasNextPage: boolean;
    onNextPage: () => void;
    loading: boolean;
  };
}

export function Combobox<T extends string>({
  options,
  value,
  onChange,
  placeholder,
  selectedLabel,
  closeOnSelect,
  selectionMode = "multiple",
  search: controlledSearch,
  pagination,
  fullWidth = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleChange(v: T) {
    let newValue = value ? [...value] : [];

    if (selectionMode === "single") {
      if (newValue.includes(v)) {
        newValue = [];
      } else {
        newValue = [v];
      }
    } else {
      if (newValue.includes(v)) {
        newValue.splice(newValue.indexOf(v), 1);
      } else {
        newValue.push(v);
      }
    }

    onChange(newValue);
  }

  function isSelected(v: T) {
    return value?.includes(v) ?? false;
  }

  function getSelectedLabel() {
    if (!value?.length) return `${placeholder || "Select option"}`;

    if (value.length === 1) return options.find(option => option.value === value[0])?.label;

    return `${value.length} ${selectedLabel || "selected"}`;
  }

  function onSearchChange(v: string) {
    if (controlledSearch) {
      controlledSearch.onChange(v);
    } else {
      setSearch(v);
    }
  }

  const searchValue = useMemo(() => {
    if (controlledSearch) {
      return controlledSearch.value;
    }

    return search;
  }, [controlledSearch, search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", fullWidth && "w-full")}
        >
          {getSelectedLabel()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", fullWidth && "full-width-popover-content")}>
        <Command>
          <CommandInput placeholder={placeholder} value={searchValue} onValueChange={onSearchChange} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={option.keywords}
                  onSelect={currentValue => {
                    handleChange(currentValue as T);
                    closeOnSelect && setOpen(false);
                  }}
                >
                  <div className="flex flex-1 flex-row items-center justify-start gap-1">
                    {option.startContent}
                    {option.label}
                  </div>
                  <Check className={cn("h-4 w-4", isSelected(option.value) ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
              {pagination && (
                <ShowMore
                  onNext={pagination.onNextPage}
                  loading={pagination.loading}
                  hasNextPage={pagination.hasNextPage}
                />
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
