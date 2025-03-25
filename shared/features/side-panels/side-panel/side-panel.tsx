"use client";

import { Variants, motion } from "framer-motion";
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useDebounce } from "react-use";

import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";

import { useClientOnly } from "@/shared/components/client-only/client-only";
import { SIDE_PANEL_ANIMATION_DURATION, useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import { cn } from "@/shared/helpers/cn";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { SidePanelProps, SidePanelRef, UseSidePanel } from "./side-panel.types";

const SidePanel = forwardRef(function SidePanel<T extends AnyType>(
  { children, name, classNames }: SidePanelProps,
  ref: ForwardedRef<SidePanelRef>
) {
  const isClient = useClientOnly();
  const { open, close, container, isOpen, isOpenLast, getPanelIndex, getConfig, back, openedPanels, getData } =
    useSidePanelsContext();

  const [showContent, setShowContent] = useState(false);
  const [debouncedShowContent, setDebouncedShowContent] = useState(false);
  const isTablet = useIsTablet("lower");
  const panelConfig = getConfig(name);

  useDebounce(
    () => {
      setDebouncedShowContent(showContent);
    },
    SIDE_PANEL_ANIMATION_DURATION * 1000,
    [showContent]
  );

  const animate: Variants = {
    isClosed: { transform: "translateX(100%)", opacity: 0 },
    isOpen: { transform: "translateX(0%)", opacity: 1 },
  };

  const animateTablet: Variants = {
    isClosed: { transform: "translateY(100%)", opacity: 0 },
    isOpen: { transform: "translateY(0%)", opacity: 1 },
  };

  useImperativeHandle(ref, () => {
    return {
      open: (data?: T, config?: SidePanelConfig) => open(name, data, config),
      isOpen: isOpen(name),
      getData: () => getData<T>(name),
      getConfig: () => getConfig(name),
      close: (current?: boolean) => close(current ? name : undefined),
      back: () => back(),
      name,
    };
  }, [open, close, isOpen, name, back, getData]);

  const animateKey = isOpenLast(name) ? "isOpen" : "isClosed";

  const panelContent = useMemo(() => {
    if (debouncedShowContent) {
      return children;
    }

    return null;
  }, [debouncedShowContent, children]);

  useEffect(() => {
    if (openedPanels.length && isOpen(name)) {
      setShowContent(true);
      setDebouncedShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [openedPanels, isOpen, name]);

  if (!isClient) return null;

  return (
    <>
      {isOpenLast(name) &&
        isTablet &&
        createPortal(
          <div className={"bg-container-backdrop fixed inset-0 z-[99] size-full"} onClick={() => close(name)} />,
          document?.body
        )}
      {createPortal(
        <motion.div
          variants={isTablet ? animateTablet : animate}
          animate={animateKey}
          transition={{ type: "ease", duration: SIDE_PANEL_ANIMATION_DURATION }}
          initial={false}
          className={cn(
            "absolute right-0 z-[100] translate-x-full overflow-hidden opacity-0",
            { "top-0 h-full translate-x-full": !isTablet },
            { "fixed bottom-0 h-[calc(100%_-_64px)] translate-y-full p-md": isTablet },
            { invisible: !isOpenLast(name) },
            classNames?.container
          )}
          style={{
            minWidth: isTablet ? "100%" : `${panelConfig.width}rem`,
            width: isTablet ? "100%" : `${panelConfig.width}rem`,
            zIndex: getPanelIndex(name) * 100,
          }}
        >
          <Paper
            border={"none"}
            background={"transparent"}
            py={"none"}
            px={"none"}
            classNames={{
              base: cn(
                "h-full w-full flex flex-col overflow-hidden",
                "tablet:border-l-border-primary tablet:border-l tablet:border-solid effect-box-shadow-sm tablet:rounded-l-none",
                { "max-h-dvh": isTablet },
                classNames?.content
              ),
            }}
          >
            {panelContent}
          </Paper>
        </motion.div>,
        !isTablet ? container.current || document?.body : document?.body
      )}
    </>
  );
});

export const useSidePanel = <T extends AnyType>(
  { name, classNames }: Omit<SidePanelProps, "children">,
  config?: SidePanelConfig
): UseSidePanel<T> => {
  const ref = useRef<SidePanelRef<T>>(null);

  const { isOpen, config: defaultConfig } = useSidePanelsContext();

  const Panel = useCallback(
    ({ children }: PropsWithChildren) => {
      return (
        <SidePanel ref={ref} name={name} classNames={classNames}>
          {children}
        </SidePanel>
      );
    },
    [name, classNames]
  );

  return useMemo(() => {
    return {
      Panel,
      open: (data?: T) => ref.current?.open(data, config),
      close: (current?: boolean) => ref.current?.close(current),
      back: () => ref.current?.back(),
      isOpen: ref.current?.name ? isOpen(ref.current?.name) : false,
      getData: ref.current?.getData,
      getConfig: () => ref.current?.getConfig() ?? defaultConfig,
      name,
    };
  }, [ref, name, classNames, config, isOpen]);
};

export function useSinglePanelContext<T extends AnyType>(name: string, config?: SidePanelConfig) {
  const { open, close, back, isOpen, getData, getConfig } = useSidePanelsContext();

  return {
    open: (data?: T) => open<T>(name, data, config),
    close: () => close(name),
    back,
    isOpen: isOpen(name),
    name,
    getData: () => getData<T>(name),
    getConfig: () => getConfig(name),
  };
}

export function useSinglePanelData<T extends AnyType>(name: string): T | undefined {
  const { isOpen, getData } = useSidePanelsContext();
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (isOpen(name)) {
      setData(getData<T>(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return data;
}
