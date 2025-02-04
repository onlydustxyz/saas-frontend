import CheckLine from "@/legacy/src/icons/CheckLine";
import { FC, FocusEventHandler } from "react";

import { cn } from "@/shared/utils";

import { Field, FieldProps } from "./Field";

export interface FieldCheckboxProps extends Omit<FieldProps, "children"> {
  switchLabel?: string;
  className?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const FieldCheckbox: FC<FieldCheckboxProps> = ({ onBlur, onFocus, onChange, className, value, ...rest }) => {
  function handleChange() {
    onChange(!value);
  }

  return (
    <Field {...rest}>
      <div className="relative h-4 w-4">
        <input
          onBlur={onBlur}
          onFocus={onFocus}
          id={rest.name}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          className={cn(
            "checked:text-red border-white/8 accent-spacePurple-500 checked:bg-spacePurple-500 peer absolute left-0 top-0 h-full w-full cursor-pointer appearance-none rounded-[3px] border",
            className
          )}
        />
        <CheckLine className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-xs leading-3 text-white peer-checked:block" />
      </div>
    </Field>
  );
};
