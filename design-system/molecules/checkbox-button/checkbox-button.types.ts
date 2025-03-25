import { ButtonDefaultPort } from "../../atoms/button/button.types";
import { CheckboxPort } from "../../atoms/checkbox";

interface ClassNames {
  base: string;
  checkbox: Partial<CheckboxPort["classNames"]>;
}

type ButtonProps = Pick<ButtonDefaultPort<"div">, "variant" | "size" | "children">;
type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;
export interface CheckboxButtonPort extends ButtonProps, CheckBoxProps {
  classNames?: Partial<ClassNames>;
}
