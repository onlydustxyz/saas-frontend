"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode, createContext, useContext, useEffect, useState } from "react";

type Breadcrumb = {
  id?: string;
  label: ReactNode;
  href?: string;
};

interface NavigationContextInterface {
  setBreadcrumb: (breadcrumb: Breadcrumb[] | undefined) => void;
  breadcrumb: Breadcrumb[] | undefined;
}

const NavigationContext = createContext<NavigationContextInterface>({
  setBreadcrumb: () => {},
  breadcrumb: [],
});

export function NavigationProvider({ children }: PropsWithChildren) {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[] | undefined>();
  const pathname = usePathname();

  function handleSetBreadcrumb(breadcrumb: Breadcrumb[] | undefined) {
    setBreadcrumb(breadcrumb);
  }

  useEffect(() => {
    return () => {
      handleSetBreadcrumb(undefined);
    };
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ breadcrumb, setBreadcrumb: handleSetBreadcrumb }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationBreadcrumb({ breadcrumb }: { breadcrumb: Breadcrumb[] | undefined }) {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb]);

  return null;
}
