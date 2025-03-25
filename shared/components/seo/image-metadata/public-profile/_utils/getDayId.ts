import { bootstrap } from "@/core/bootstrap";

export function getDayId(date: Date) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  return dateKernelPort.format(date, "yyyy-MM-dd");
}
