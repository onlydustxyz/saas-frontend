import { PropsWithChildren } from "react";

export interface ProgramsSectionProps extends PropsWithChildren {
  onAllocateClick: (programId: string) => void;
}
