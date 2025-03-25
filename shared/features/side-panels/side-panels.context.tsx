"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { AnyType } from "@/core/kernel/types";

import { SIDE_PANEL_GAP, SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import {
  SidePanelConfig,
  SidePanelsContextInterface,
  SidePanelsContextProps,
} from "@/shared/features/side-panels/side-panels.types";
import { cn } from "@/shared/helpers/cn";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";
import { useIntercom } from "@/shared/intercom/intercom.context";

const defaultConfig: SidePanelConfig = {
  width: SIDE_PANEL_SIZE.m,
  gap: SIDE_PANEL_GAP.m,
  closedWidth: 0,
  type: "drawer",
};

export const SIDE_PANEL_ANIMATION_DURATION = 0.25;

const SidePanelsContext = createContext<SidePanelsContextInterface>({
  isOpen: () => false,
  open: () => {},
  close: () => {},
  back: () => {},
  container: { current: null },
  getPanelIndex: () => 0,
  isOpenLast: () => false,
  config: defaultConfig,
  openedPanels: [],
  getData: () => undefined,
  getConfig: () => defaultConfig,
});

export function SidePanelsProvider({ children, classNames, absolute }: SidePanelsContextProps) {
  const { hideIntercomLauncher, showIntercomLauncher } = useIntercom();
  const [openedPanels, setOpenedPanels] = useState<string[]>([]);
  const [openedPanelsConfigs, setOpenedPanelsConfig] = useState<Record<string, SidePanelConfig>>();
  const [data, setData] = useState<[string, AnyType][]>([]);
  const container = useRef(null);
  const isTablet = useIsTablet("lower");

  function addPanelConfig(config: SidePanelConfig): SidePanelConfig {
    return {
      width: config.width ?? defaultConfig.width,
      gap: config.gap ?? defaultConfig.gap,
      closedWidth: config.closedWidth ?? defaultConfig.closedWidth,
      type: config.type ?? defaultConfig.type,
    };
  }

  function removePanelConfig(name: string) {
    setOpenedPanelsConfig(prev => {
      const newConfig = { ...prev };
      delete newConfig[name];
      return newConfig;
    });
  }

  function safeBlur() {
    (document?.activeElement as HTMLElement)?.blur?.();
  }

  function closePanel(name?: string) {
    safeBlur();
    if (name) {
      setOpenedPanels(openedPanels.filter(panel => panel !== name));
      setData(data.filter(([panel]) => panel !== name));
      removePanelConfig(name);
    } else {
      setOpenedPanels([]);
      setData([]);
      setOpenedPanelsConfig({});
    }
  }

  function onBack() {
    safeBlur();
    if (openedPanels.length === 1) {
      setOpenedPanels([]);
      setData([]);
      setOpenedPanelsConfig({});
      return;
    }

    setOpenedPanels(openedPanels.slice(0, openedPanels.length - 1));
    setData(data.filter(([panel]) => panel !== openedPanels.at(-1)));
    removePanelConfig(openedPanels.at(-1) as string);
  }

  function isOpen(name: string) {
    return openedPanels.includes(name);
  }

  function isOpenLast(name: string) {
    return openedPanels.at(-1) === name;
  }

  function openPanel<T = AnyType>(name: string, panelData?: T, config?: SidePanelConfig) {
    if (openedPanels.includes(name)) {
      const savedPanels = openedPanels.filter(panel => panel !== name);
      setOpenedPanels([]);
      setData([...data.filter(([panel]) => panel !== name), [name, panelData]]);
      setTimeout(
        () => {
          setOpenedPanels([...savedPanels, name]);
        },
        (SIDE_PANEL_ANIMATION_DURATION / 2) * 1000
      );
    } else {
      setOpenedPanels([...openedPanels, name]);
      setData([...data, [name, panelData]]);
      setOpenedPanelsConfig({ ...openedPanelsConfigs, [name]: addPanelConfig(config ?? defaultConfig) });
    }
  }

  function getPanelIndex(name: string) {
    return (openedPanels.indexOf(name) || 0) + 1;
  }

  function getData(name: string) {
    return data.find(([panel]) => panel === name)?.[1];
  }

  function getConfig(name: string) {
    const panelConfig = openedPanelsConfigs?.[name];
    return panelConfig ?? defaultConfig;
  }

  const {
    gap,
    width = 0,
    closedWidth = 0,
    type = "drawer",
  } = useMemo(() => {
    if (openedPanels.length === 0) {
      return defaultConfig;
    }

    return getConfig(openedPanels.at(-1) as string);
  }, [openedPanels]);

  useEffect(() => {
    if (openedPanels.length === 0) {
      showIntercomLauncher();
    } else {
      hideIntercomLauncher();
    }
  }, [openedPanels]);

  return (
    <SidePanelsContext.Provider
      value={{
        open: openPanel,
        close: closePanel,
        back: onBack,
        isOpen,
        config: { width, gap, closedWidth },
        container,
        getPanelIndex,
        isOpenLast,
        openedPanels,
        getData,
        getConfig,
      }}
    >
      {children}
      {!isTablet && (
        <div className={classNames?.column}>
          {!absolute && (
            <div
              className={cn("pointer-events-none fixed inset-0 z-[99] bg-background-primary opacity-0 transition-all", {
                "pointer-events-auto opacity-60": openedPanels?.length,
              })}
              onClick={() => closePanel()}
            />
          )}
          <div
            className={cn(
              { "fixed bottom-0 right-0 top-0 z-[99]": !absolute },
              {
                "overflow-hidden": type === "container",
              },
              classNames?.inner
            )}
            ref={container}
            style={{
              paddingLeft: type === "container" ? `${gap}rem` || 0 : 0,
            }}
          ></div>
        </div>
      )}
    </SidePanelsContext.Provider>
  );
}

export function useSidePanelsContext() {
  const context = useContext(SidePanelsContext);
  if (!context) {
    throw new Error("SidePanel must be used inside a SidePanelsContextProvider");
  }
  return context;
}
