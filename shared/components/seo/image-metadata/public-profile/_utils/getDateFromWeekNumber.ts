import { bootstrap } from "@/core/bootstrap";

export function getDateFromWeekNumber(year: number, weekNumber: number) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  return dateKernelPort.startOfWeek(
    dateKernelPort.setWeek(dateKernelPort.startOfYear(dateKernelPort.setYear(new Date(), year)), weekNumber)
  );
}
