import { QuestList } from "../../_features/quest-list/quest-list.types";

export interface QuestCardProps extends QuestList {
  onClick?: () => void;
}
