import { RewardIcon } from "@/shared/components/seo/image-metadata/public-profile/components/reward-icon";
import { ActivityGraphLevel } from "@/shared/features/contributors/activity-graph/activity-graph.types";

interface Props {
  reward?: boolean;
  level: ActivityGraphLevel;
}

export function ActivityWeek({ level, reward }: Props) {
  const levelColors = {
    1: "#171D44",
    2: "#460066",
    3: "#680099",
    4: "#AE00FF",
  };

  return (
    <div
      style={{
        display: "flex",
        height: 36,
        width: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F3F0EE14",
        backgroundColor: levelColors[level as keyof typeof levelColors],
      }}
    >
      {reward ? <RewardIcon /> : null}
    </div>
  );
}
