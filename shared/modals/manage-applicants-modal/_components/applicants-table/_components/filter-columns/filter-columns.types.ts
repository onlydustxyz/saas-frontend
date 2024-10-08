export interface FilterColumnsProps {
  selectedIds?: Array<TableColumns>;
  setSelectedIds: (ids: Array<TableColumns>) => void;
}

export type TableColumns =
  | "contributor"
  | "label"
  | "languages"
  | "ecosystems"
  | "country"
  | "rewardedAmount"
  | "actions";
