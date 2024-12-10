import { SectionProps } from "@/app/explore/_components/section/section.types";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

export function Section({ children, title, description, count, action, classNames }: SectionProps) {
  const hasCount = typeof count === "number";

  return (
    <section className={cn("flex flex-col", classNames?.base)}>
      <header className="flex justify-between">
        <div className="flex flex-col gap-md">
          <div>
            <Typo variant="heading" size="xs" weight="medium" {...title} />
            {hasCount ? (
              <>
                {" "}
                <Typo variant="heading" size="xs" weight="medium" color="tertiary">
                  ({count})
                </Typo>
              </>
            ) : null}
          </div>

          <Typo color="secondary" size="xs" {...description} />
        </div>

        {action}
      </header>

      {children}
    </section>
  );
}
