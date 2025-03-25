import { PropsWithChildren } from "react";

type PageInnerSize = "small" | "medium" | "large" | "full";

export interface PageInnerProps extends PropsWithChildren {
  size?: PageInnerSize;
  className?: string;
  type?: "page" | "inner";
}
