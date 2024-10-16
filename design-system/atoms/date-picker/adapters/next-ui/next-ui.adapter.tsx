"use client";

import { parseAbsolute } from "@internationalized/date";
import { DatePicker, DateValue } from "@nextui-org/react";
import { Calendar, CircleAlert } from "lucide-react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";

import { Icon } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { DatePickerPort } from "../../date-picker.types";
import { DatePickerNextUiVariants } from "./next-ui.variants";

const DEFAULT_TZ = "Europe/Paris";

export const DatePickerNextUiAdapter = forwardRef(function InputNextUiAdapter(
  { classNames, isError, isDisabled, value, onChange, label, minValue, maxValue }: DatePickerPort,
  ref: ForwardedRef<HTMLDivElement>
) {
  const slots = DatePickerNextUiVariants({ isDisabled, isError });

  const [formattedValue, setFormattedValue] = useState<DateValue>();

  useEffect(() => {
    if (!value) return;

    setFormattedValue(parseAbsolute(value?.toISOString(), DEFAULT_TZ));
  }, [value]);

  function handleChange(value: DateValue) {
    if (!onChange) return;

    onChange(value.toDate(DEFAULT_TZ));
  }

  return (
    <>
      <DatePicker
        ref={ref}
        classNames={{
          base: cn(slots.base(), classNames?.base, "bg-red-500"),
          popoverContent: slots.popoverContent(),
          inputWrapper: cn(slots.inputWrapper(), classNames?.input),
          innerWrapper: slots.innerWrapper(),
          input: slots.input(),
          label: cn(slots.label(), classNames?.label),
          segment: slots.segment(),
          // separator: slots.separator(),
          selectorButton: slots.selectorButton(),
          errorMessage: slots.errorMessage(),
        }}
        calendarProps={{
          classNames: {
            base: "rounded-lg bg-background-primary border border-border-primary overflow-hidden",
            headerWrapper: "bg-background-primary px-3 pt-3 pb-2",
            prevButton:
              "h-6 w-6 min-w-6 text-components-buttons-button-tertiary-fg rounded-md bg-components-buttons-button-tertiary-bg data-[hover=true]:bg-components-buttons-button-tertiary-bg-hover data-[focus-visible=true]:effect-ring-brand-spaced data-[disabled=true]:text-foreground-disabled !outline-none",
            nextButton:
              "h-6 w-6 min-w-6 text-components-buttons-button-tertiary-fg rounded-md bg-components-buttons-button-tertiary-bg data-[hover=true]:bg-components-buttons-button-tertiary-bg-hover data-[focus-visible=true]:effect-ring-brand-spaced data-[disabled=true]:text-foreground-disabled !outline-none",
            title: "text-typography-primary font-medium text-[1rem] leading-[1.5rem]",
            gridHeader: "bg-background-primary",
            gridHeaderRow: "px-2 pb-1",
            gridHeaderCell: "text-typography-primary font-medium text-[0.75rem] leading-[1rem] w-12 px-1",
            gridBody: "bg-background-primary px-2",
            gridBodyRow: "first:mt-0",
            cell: "py-1 px-1",
            cellButton:
              "h-10 w-10 text-typography-secondary font-medium text-[0.875rem] leading-[1.25rem] data-[today=true]:underline data-[hover=true]:bg-background-primary-alt-hover data-[hover=true]:data-[selected=true]:bg-transparent data-[disabled=true]:text-typography-quaternary data-[disabled=true]:font-normal data-[unavailable=true]:text-typography-quaternary data-[unavailable=true]:font-normal data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-typography-quaternary data-[selected=true]:data-[range-selection=true]:before:bg-background-brand-primary-alt data-[selected=true]:data-[range-selection=true]:text-typography-brand-primary data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-background-brand-primary-solid data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-typography-primary-on-brand data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:font-bold data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-background-brand-primary-solid data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-typography-primary-on-brand data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:font-bold before:!rounded-full",
          },
          weekdayStyle: "short",
        }}
        calendarWidth={352}
        label={label}
        selectorButtonProps={{ disableRipple: true, disableAnimation: true }}
        variant="bordered"
        labelPlacement="outside-left"
        granularity="day"
        selectorIcon={
          <>
            <Icon component={Calendar} />
          </>
        }
        isDisabled={isDisabled}
        isInvalid={isError}
        onChange={handleChange}
        value={formattedValue}
        minValue={minValue ? parseAbsolute(minValue.toISOString(), DEFAULT_TZ) : undefined}
        maxValue={maxValue ? parseAbsolute(maxValue.toISOString(), DEFAULT_TZ) : undefined}
        errorMessage={() => (
          <div className="flex items-center gap-1.5">
            <Icon component={CircleAlert} classNames={{ base: "text-foreground-error" }} />
            {/*{getErrorMessage({ validation, minValue, maxValue })}*/}
          </div>
        )}
      />
    </>
  );
});
