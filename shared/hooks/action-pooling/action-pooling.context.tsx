"use client";

import { PropsWithChildren, createContext, useContext, useRef, useState } from "react";

interface ActionPoolingContextProps {
  limit?: number;
  interval?: number;
}

interface ActionPoolingContextInterface {
  startPooling: () => void;
  shouldRefetch: false | number;
}

const ActionPoolingContext = createContext<ActionPoolingContextInterface>({
  startPooling: () => {},
  shouldRefetch: false,
});

export function ActionPoolingProvider({
  interval,
  limit,
  children,
}: Partial<ActionPoolingContextProps> & PropsWithChildren) {
  const _interval = interval || 5000;
  const _limit = limit || undefined;
  const [shouldRefetch, setShouldRefetch] = useState<false | number>(false);

  const requestAnimation = useRef<number | undefined>(0);
  const limitCount = useRef<number>(0);
  const start = useRef(Date.now());

  function canPool() {
    return Date.now() - start.current >= _interval;
  }

  function shouldPoolNextFrame() {
    return !_limit || limitCount.current < _limit;
  }

  function doPooling() {
    if (canPool()) {
      start.current += _interval;
      setShouldRefetch(start.current);
      limitCount.current = limitCount.current + 1;
    }

    if (shouldPoolNextFrame()) {
      requestAnimation.current = window.requestAnimationFrame(doPooling);
    } else {
      if (requestAnimation.current) cancelAnimationFrame(requestAnimation.current);
      requestAnimation.current = undefined;
      limitCount.current = 0;
      setShouldRefetch(false);
    }
  }

  function startPooling() {
    if (shouldPoolNextFrame()) {
      limitCount.current = 0;
      start.current = Date.now();
      setShouldRefetch(start.current);
      requestAnimation.current = window.requestAnimationFrame(doPooling);
    }
  }

  return (
    <ActionPoolingContext.Provider value={{ startPooling, shouldRefetch }}>{children}</ActionPoolingContext.Provider>
  );
}

export function useActionPooling() {
  return useContext(ActionPoolingContext);
}
