import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

export const useDefaultPeriod = () => {
  const START_DEFAULT_DATE = new Date();
  START_DEFAULT_DATE.setDate(new Date().getDate() - 20);

  const dateKernelPort = bootstrap.getDateKernelPort();
  const { from, to } = dateKernelPort.getRangeOfDates(DateRangeType.LAST_MONTH);

  const defaultRange = {
    start: from ?? START_DEFAULT_DATE,
    end: to ?? new Date(),
  };
  const defaultStringRange = {
    fromDate: from ? dateKernelPort.format(defaultRange.start, "yyyy-MM-dd") : undefined,
    toDate: to ? dateKernelPort.format(defaultRange.end, "yyyy-MM-dd") : undefined,
  };

  return {
    rangeType: DateRangeType.LAST_MONTH,
    range: defaultRange,
    stringRange: defaultStringRange,
  };
};
