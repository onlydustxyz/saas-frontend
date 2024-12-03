"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryMenu } from "@/shared/features/navigation/menu/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/menu/secondary-menu/secondary-menu";
import { PrimaryBanner } from "@/shared/features/navigation/primary-banner/primary-banner";
import { Header } from "@/shared/features/navigation/primary-navigation/_components/header/header";
import { cn } from "@/shared/helpers/cn";
import { useIsDesktop } from "@/shared/hooks/ui/use-media-query";

function MenuContainer({ children }: PropsWithChildren) {
  return <div className={"flex w-full flex-col gap-xs"}>{children}</div>;
}

export const PrimaryNavigationDesktopSize = {
  closed: 0,
  opened: 14,
};

export function PrimaryNavigationDesktop({ children }: PropsWithChildren) {
  const mounted = useRef(false);
  const isLowerThanDesktop = useIsDesktop("lower");
  const isLargerThanDesktop = useIsDesktop("greater");
  const [opened, setIsOpened] = useState(true);

  function onToggle() {
    setIsOpened(!opened);
  }

  useEffect(() => {
    if (isLowerThanDesktop) {
      mounted.current = true;
      setIsOpened(false);
    }
  }, [isLowerThanDesktop]);

  useEffect(() => {
    if (isLargerThanDesktop && !mounted.current) {
      mounted.current = true;
      setIsOpened(true);
    }
  }, [isLargerThanDesktop]);

  const navSize = opened ? PrimaryNavigationDesktopSize.opened : PrimaryNavigationDesktopSize.closed;

  return (
    <>
      <Header onToggle={onToggle} isOpen={opened} />
      <AnimatedColumnGroup className="gap-md pr-md">
        <AnimatedColumn
          width={navSize}
          initialWidth={PrimaryNavigationDesktopSize.opened}
          className={cn("flex h-full flex-col overflow-hidden", {
            "border-r-1 border-border-primary": opened,
          })}
        >
          <div
            className={"flex h-full flex-col justify-between gap-lg overflow-hidden px-sm py-3"}
            style={{
              width: `${PrimaryNavigationDesktopSize.opened}rem`,
            }}
          >
            <MenuContainer>
              <PrimaryMenu />
            </MenuContainer>
            <div className={"flex-1"} />
            <MenuContainer>
              <SecondaryMenu />
            </MenuContainer>
            <PrimaryBanner />
          </div>
        </AnimatedColumn>
        <AnimatedColumn className="size-full overflow-hidden">{children}</AnimatedColumn>
      </AnimatedColumnGroup>
    </>
  );
}
