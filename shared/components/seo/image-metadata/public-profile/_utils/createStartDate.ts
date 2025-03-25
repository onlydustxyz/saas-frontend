import { bootstrap } from "@/core/bootstrap";

import { ACTIVITY_WEEK_NUMBER } from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

export function createStartDate(endDate?: Date) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  if (endDate) {
    return dateKernelPort.subWeeks(endDate, ACTIVITY_WEEK_NUMBER);
  }
  return dateKernelPort.subWeeks(new Date(), ACTIVITY_WEEK_NUMBER);
}
