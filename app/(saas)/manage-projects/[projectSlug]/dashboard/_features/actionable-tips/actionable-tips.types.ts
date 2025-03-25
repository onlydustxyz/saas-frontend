import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export interface ActionableTipsProps {
  projectId: string;
}

export type AcquisitionTipIdentifier = components["schemas"]["ProjectAcquisitionTipResponse"]["identifier"];

type ActionHandler = (projectId: string) => void;

export interface TipAction {
  actionLabel: string;
  title: string;
  justification: string;
  action: ActionHandler;
}
