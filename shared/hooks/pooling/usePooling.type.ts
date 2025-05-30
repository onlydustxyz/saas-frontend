import { ReactElement } from "react";

export interface UsePoolingFeedbackProps {
  isRefetching: boolean;
  isLoading: boolean;
  fetch: () => void;
  onForcePooling: () => void;
  ui: {
    label: string;
    customComponents?: (props: { isSyncing: boolean }) => ReactElement;
  };
}
export interface UsePoolingProps {
  delays: number;
  limit: number;
  enabled?: boolean;
}

export interface UsePoolingReturn {
  refetchOnWindowFocus: () => boolean;
  refetchInterval: () => number;
  onRefetching: (isRefetching: boolean) => void;
  onForcePooling: () => void;
  resetPooling: () => void;
  count: number;
}

export type UsePoolingFeedbackReturn = ReactElement;
