import { createEndDate } from "@/shared/components/seo/image-metadata/public-profile/_utils/createEndDate";
import { createStartDate } from "@/shared/components/seo/image-metadata/public-profile/_utils/createStartDate";
import { createWeeks } from "@/shared/components/seo/image-metadata/public-profile/_utils/createWeeks";
import { splitWeeksIntoSubArray } from "@/shared/components/seo/image-metadata/public-profile/_utils/splitWeeks";
import { ActivityGraphLevel } from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

import { ActivityHighlight } from "./activity-highlight";
import { ActivityTitle } from "./activity-title";
import { ActivityWeek } from "./activity-week";

interface Props {
  contribution: number;
  rewards: number;
  data: {
    [key: string]: {
      level: ActivityGraphLevel;
      reward?: boolean;
    };
  };
}
export function OGActivityGraph({ data, contribution, rewards }: Props) {
  const dates = {
    start: createStartDate(),
    end: createEndDate(),
  };
  const weeks = createWeeks({ ...dates });
  const splitWeeks = splitWeeksIntoSubArray({ weeks });
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          height: "100%",
          border: "1px solid #F3F0EE33",
          background: "#0E0D2E",
          padding: "32px 40px",
          borderRadius: 24,
        }}
      >
        <ActivityTitle />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "4px",
          }}
        >
          {splitWeeks.map((weeks, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "4px",
              }}
              key={`${index}`}
            >
              {weeks.map(week => {
                const _data = data?.[week.id];
                return <ActivityWeek level={_data?.level || 1} reward={_data?.reward} key={week.id} />;
              })}
            </div>
          ))}
        </div>
        <ActivityHighlight contribution={contribution} rewards={rewards} />
      </div>
    </div>
  );
}
