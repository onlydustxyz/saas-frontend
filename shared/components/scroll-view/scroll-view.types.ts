import { CSSProperties, PropsWithChildren } from "react";

export interface ScrollViewProps extends PropsWithChildren {
  className?: string;
  direction?: "x" | "y" | "all";
  style?: CSSProperties;
}
