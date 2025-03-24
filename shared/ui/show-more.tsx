import { InView } from "react-intersection-observer";

import { cn } from "../utils";
import { Button, ButtonProps } from "./button";

export function ShowMore({
  onNext,
  loading,
  skip = false,
  className,
  hasNextPage,
  buttonProps,
}: {
  onNext: () => void;
  hasNextPage: boolean;
  loading: boolean;
  skip?: boolean;
  className?: string;
  buttonProps?: ButtonProps;
}) {
  function handleEnterView(inView: boolean) {
    if (inView) onNext();
  }

  if (!hasNextPage) return null;

  return (
    <InView className={cn("flex justify-center", className)} onChange={handleEnterView} skip={skip}>
      <Button {...buttonProps} variant={buttonProps?.variant ?? "link"} onClick={onNext} loading={loading}>
        Show more
      </Button>
    </InView>
  );
}
