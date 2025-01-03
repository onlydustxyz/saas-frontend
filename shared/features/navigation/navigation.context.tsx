"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { BreadcrumbLevel, BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";

interface NavigationContextInterface {
  setBreadcrumb: (breadcrumb: BreadcrumbsPort["items"] | undefined) => void;
  setHistory: (history: BreadcrumbsPort["items"] | undefined) => void;
  breadcrumb: BreadcrumbsPort["items"] | undefined;
  history: BreadcrumbsPort["items"] | undefined;
}

export const NavigationContext = createContext<NavigationContextInterface>({
  setBreadcrumb: () => {},
  breadcrumb: [],
  setHistory: () => {},
  history: [],
});

export function NavigationProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<BreadcrumbsPort["items"] | undefined>();
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbsPort["items"] | undefined>();
  const pathname = usePathname();

  function getLevel(b: BreadcrumbsPort["items"], h: BreadcrumbsPort["items"], level: BreadcrumbLevel) {
    const breadcrumbLevel: Record<BreadcrumbLevel, boolean> = {
      "1": !!b?.find(b => b.level === "1"),
      "2": !!b?.find(b => b.level === "2"),
      "3": !!b?.find(b => b.level === "3"),
      "4": !!b?.find(b => b.level === "4"),
      "5": !!b?.find(b => b.level === "5"),
    };

    const levelToInt = parseInt(level);
    const levelToArray = Object.values(breadcrumbLevel);

    const inB = b.find(b => b.level === level);

    if (inB) {
      return inB;
    }

    if (levelToInt === 1 || levelToArray[levelToInt - 1]) {
      return h.find(h => h.level === level);
    }

    return undefined;
  }

  function handleSetBreadcrumb(breadcrumb: BreadcrumbsPort["items"] | undefined) {
    if (!history?.length || !breadcrumb?.length) {
      return setBreadcrumb(breadcrumb);
    }

    const level1 = getLevel(breadcrumb, history, "1");
    const level2 = getLevel(breadcrumb, history, "2");
    const level3 = getLevel(breadcrumb, history, "3");
    const level4 = getLevel(breadcrumb, history, "4");
    const level5 = getLevel(breadcrumb, history, "5");

    const newBreadcrumb: BreadcrumbsPort["items"] = [];

    if (level1) {
      newBreadcrumb.push(level1);
    }

    if (level2) {
      newBreadcrumb.push(level2);
    }
    if (level3) {
      newBreadcrumb.push(level3);
    }

    if (level4) {
      newBreadcrumb.push(level4);
    }

    if (level5) {
      newBreadcrumb.push(level5);
    }

    setBreadcrumb(newBreadcrumb);
  }

  function handleSetHistory(history: BreadcrumbsPort["items"] | undefined) {
    setHistory(history);
  }

  useEffect(() => {
    return () => {
      handleSetBreadcrumb(undefined);
    };
  }, [pathname]);

  return (
    <NavigationContext.Provider
      value={{ breadcrumb, setBreadcrumb: handleSetBreadcrumb, history, setHistory: handleSetHistory }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationBreadcrumb({ breadcrumb }: { breadcrumb: BreadcrumbsPort["items"] | undefined }) {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb]);

  return null;
}
