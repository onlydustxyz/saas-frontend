import { bootstrap } from "@/core/bootstrap";

import { ActivityGraphWeek } from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

import { getWeekId } from "./getWeekId";

export function createWeeks({ start, end }: { start: Date; end: Date }): ActivityGraphWeek[] {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const eachWeek = dateKernelPort.eachWeekOfInterval(start, end);

  return eachWeek.map(week => {
    const startWeek = dateKernelPort.startOfWeek(week);
    const endWeek = dateKernelPort.endOfWeek(week);

    return {
      id: getWeekId(week),
      startDate: startWeek,
      endDate: endWeek,
    };
  });
}
