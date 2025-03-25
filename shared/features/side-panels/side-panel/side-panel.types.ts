import { PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";

interface classNames {
  container: string;
  content: string;
}

export interface SidePanelProps {
  name: string;
  children: ReactNode;
  classNames?: Partial<classNames>;
}

export interface UseSidePanel<T extends AnyType> {
  name: string;
  isOpen: boolean;
  open: (data?: T) => void;
  close: (current?: boolean) => void;
  back: () => void;
  Panel: (p: PropsWithChildren) => JSX.Element;
  getConfig: () => SidePanelConfig;
}

export interface SidePanelRef<T = AnyType> {
  open: (panelData?: T, config?: SidePanelConfig) => void;
  close: (current?: boolean) => void;
  back: () => void;
  isOpen: boolean;
  name: string;
  getData: () => T | undefined;
  getConfig: () => SidePanelConfig;
}
