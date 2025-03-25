import { bootstrap } from "@/core/bootstrap";

export function getWeekNumber(date: Date, options?: { hideMonths: boolean }): string {
  const dateKernelPort = bootstrap.getDateKernelPort();
  if (options?.hideMonths) {
    return dateKernelPort.format(date, "w yyyy");
  }
  return dateKernelPort.format(date, "w, MMM yyyy");
}
