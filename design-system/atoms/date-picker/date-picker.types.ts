import { ReactNode } from "react";

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  base: string;
  input: string;
  label: string;
}

export interface DatePickerPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onChange?: (value: Date) => void;
  value?: Date;
  label?: ReactNode;
  minValue?: Date;
  maxValue?: Date;
}
