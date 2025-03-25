import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC } from "react";

import { Button } from "@/shared/ui/button";
import { TypographyH2, TypographyMuted } from "@/shared/ui/typography";

import { MultiStepsFormProps } from "./multiStepsForm.type";

export const MultiStepsForm: FC<MultiStepsFormProps> = ({
  step,
  stepCount,
  title,
  description,
  footerRightElement,
  prev,
  next,
  submitButton = null,
  nextDisabled,
  children,
  stickyChildren,
}) => {
  return (
    <div className="relative flex w-full max-w-full flex-col overflow-hidden rounded-2xl border max-md:min-h-full md:max-h-full md:w-[688px]">
      <div className="flex flex-col gap-4 p-4 pb-5 pt-6 md:p-12">
        <div className="text-muted-foreground">{`${step}/${stepCount}`}</div>
        <TypographyH2>{title}</TypographyH2>
        {description ? <TypographyMuted>{description}</TypographyMuted> : null}
        {stickyChildren ? stickyChildren : <div className="h-3" />}
      </div>

      <div className="flex w-full flex-1 flex-col overflow-visible px-4 md:w-auto md:overflow-auto md:px-3">
        <div className="w-full overflow-visible scrollbar-thin md:w-auto md:overflow-auto">
          <div className="px-0 pb-4 md:px-9">{children}</div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-start justify-between gap-4 border-t bg-background p-6 md:relative md:bottom-auto md:left-auto md:flex-row md:items-center xl:rounded-b-2xl">
        <div className="flex items-center justify-start">{footerRightElement ? footerRightElement : null}</div>
        <div className="flex w-full items-center justify-start gap-6 md:w-auto md:justify-end">
          {prev && (
            <Button type="button" variant="secondary" onClick={prev} className="w-full md:w-auto">
              <ArrowLeft className="-ml-2 h-5 w-5" />
              Back
            </Button>
          )}
          {next && (
            <Button type="button" disabled={nextDisabled} variant="default" onClick={next} className="w-full md:w-auto">
              Next
              <ArrowRight className="-mr-2 h-5 w-5" />
            </Button>
          )}
          {submitButton}
        </div>
      </div>
    </div>
  );
};
