"use client";

import { ComponentType, PropsWithChildren, useEffect, useState } from "react";

export const useClientOnly = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

function ClientOnly({ children }: PropsWithChildren) {
  const isClient = useClientOnly();

  if (!isClient) return null;

  return <>{children}</>;
}

export function withClientOnly<P extends object>(Component: ComponentType<P>) {
  return function withClientOnly(props: P) {
    return (
      <ClientOnly>
        <Component {...props} />
      </ClientOnly>
    );
  };
}
