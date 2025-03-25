import { PropsWithChildren, RefObject } from "react";

type SidePanelType = "drawer" | "container";
export interface SidePanelConfig {
  width?: number;
  closedWidth?: number;
  gap?: number;
  type?: SidePanelType;
}

export interface SidePanelsContextInterface {
  isOpen: (name: string) => boolean;
  isOpenLast: (name: string) => boolean;
  open: <T>(name: string, panelData?: T, config?: SidePanelConfig) => void;
  close: (name?: string) => void;
  back: () => void;
  container: RefObject<Element>;
  getPanelIndex: (name: string) => number;
  config: SidePanelConfig;
  openedPanels: string[];
  getData: <T>(name: string) => T | undefined;
  getConfig: (name: string) => SidePanelConfig;
}

export interface SidePanelsContextProps extends PropsWithChildren {
  classNames?: Partial<classNames>;
  absolute?: boolean;
}

interface classNames {
  columnGroup: string;
  column: string;
  inner: string;
}
