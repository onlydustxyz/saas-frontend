import { bootstrap } from "@/core/bootstrap";

export function createEndDate(endDate?: Date) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  if (endDate) {
    return dateKernelPort.addWeeks(endDate, 1);
  }
  return dateKernelPort.addWeeks(new Date(), 1);
}
