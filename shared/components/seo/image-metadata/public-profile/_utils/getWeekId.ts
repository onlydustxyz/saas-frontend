import { bootstrap } from "@/core/bootstrap";

export function getWeekId(date: Date) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  return dateKernelPort.format(dateKernelPort.startOfWeek(date), "yyyy-MM-dd");
}
