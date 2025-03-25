export interface OpenProps {
  initialState?: {
    selectedRewardsIds: string[];
    selectedBillingProfileId: string;
  };
}

export interface SelectedState {
  rewardIds: string[];
  billingProfileId?: string;
}

export interface RequestPaymentFlowContextInterface {
  rewardIds: string[];
  billingProfileId?: string;
  open: (props?: OpenProps) => void;
  selectBillingProfile: (billingProfileId: string) => void;
  selectRewards: (billingProfileId: string, rewardsIds: string[]) => void;
}
