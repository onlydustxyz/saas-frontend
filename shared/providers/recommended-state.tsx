import { ReactNode, createContext, useContext, useState } from "react";

type RecommendedData = { for: string; data: Record<string, any> };

interface RecommendedStateContextType {
  recommendedData: RecommendedData | undefined;
  setRecommendedData: (data: RecommendedData) => void;
  getForProject: (projectSlug?: string) => RecommendedData | undefined;
}

const RecommendedStateContext = createContext<RecommendedStateContextType | undefined>(undefined);

interface RecommendedStateProviderProps {
  children: ReactNode;
  initialData?: RecommendedData | undefined;
}

export function RecommendedStateProvider({ children, initialData = undefined }: RecommendedStateProviderProps) {
  const [recommendedData, setRecommendedData] = useState<RecommendedData | undefined>(initialData);

  function getForProject(projectSlug?: string) {
    if (!projectSlug) {
      setRecommendedData(undefined);
      return undefined;
    }

    if (recommendedData?.for !== projectSlug) {
      setRecommendedData(undefined);
      return undefined;
    }

    return recommendedData;
  }

  return (
    <RecommendedStateContext.Provider value={{ recommendedData, setRecommendedData, getForProject }}>
      {children}
    </RecommendedStateContext.Provider>
  );
}

export function useRecommendedState() {
  const context = useContext(RecommendedStateContext);
  if (context === undefined) {
    throw new Error("useRecommendedState must be used within a RecommendedStateProvider");
  }
  return context;
}
