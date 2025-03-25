import {
  ACTIVITY_NUMBER_OF_ROW,
  ActivityGraphWeek,
} from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

export function splitWeeksIntoSubArray({ weeks }: { weeks: ActivityGraphWeek[] }): ActivityGraphWeek[][] {
  return weeks.reduce((acc, week, index) => {
    if (index % ACTIVITY_NUMBER_OF_ROW === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(week);
    return acc;
  }, [] as ActivityGraphWeek[][]);
}
