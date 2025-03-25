import { bootstrap } from "@/core/bootstrap";

import { ActivityGraphConfig } from "@/shared/features/contributors/activity-graph/activity-graph.constants";
import {
  ActivityGraphData,
  ActivityGraphLevel,
  ActivityGraphLevelRange,
} from "@/shared/features/contributors/activity-graph/activity-graph.types";

const useActivityGraphRange = ({ start, end }: { start?: Date; end?: Date }) => {
  const dateKernel = bootstrap.getDateKernelPort();
  if (start) {
    return {
      from: start,
      to: dateKernel.addYears(dateKernel.subDays(start, 1), ActivityGraphConfig.number_of_years),
    };
  }

  if (end) {
    return {
      from: dateKernel.subYears(dateKernel.subDays(end, 1), ActivityGraphConfig.number_of_years),
      to: end,
    };
  }

  return {
    from: dateKernel.subYears(dateKernel.subDays(new Date(), 1), ActivityGraphConfig.number_of_years),
    to: new Date(),
  };
};

const useActivityGraphGrid = ({ from, to }: { from: Date; to: Date }): { months: { month: Date; days: Date[] }[] } => {
  const dateKernel = bootstrap.getDateKernelPort();
  const months = dateKernel.eachMonthOfInterval(from, to);

  return {
    months: months?.map(month => {
      if (dateKernel.isSameMonth(month, to)) {
        return {
          month,
          days: dateKernel.eachDayOfInterval(dateKernel.startOfMonth(month), to),
        };
      }

      if (dateKernel.isSameMonth(month, from)) {
        return {
          month,
          days: dateKernel.eachDayOfInterval(from, dateKernel.endOfMonth(month)),
        };
      }

      return {
        month,
        days: dateKernel.eachDayOfInterval(dateKernel.startOfMonth(month), dateKernel.endOfMonth(month)),
      };
    }),
  };
};

const useActivityGraph = () => {
  const { from, to } = useActivityGraphRange({});

  return useActivityGraphGrid({ from, to });
};

const useActivityColumns = (days: Date[]) => {
  return days.reduce((acc, week, index) => {
    if (index % ActivityGraphConfig.number_of_day_in_column === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(week);
    return acc;
  }, [] as Date[][]);
};

const useCreateLevel = (counts: number[]): ActivityGraphLevelRange => {
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return {
    0: 0,
    1: min,
    2: Math.round((max - min) / 3 + min),
    3: Math.round(((max - min) / 3) * 2 + min),
    4: max,
  };
};

const useGetLevel = (count: number, levels: ActivityGraphLevelRange): ActivityGraphLevel => {
  if (!count) {
    return 0;
  }

  if (count < levels[1]) {
    return 1;
  } else if (count < levels[2]) {
    return 2;
  } else if (count < levels[3]) {
    return 3;
  } else {
    return 4;
  }
};

const useGetData = (data: ActivityGraphData[], date: Date) => {
  const dateKernel = bootstrap.getDateKernelPort();
  return data?.find(d => dateKernel.isSameDay(date, new Date(d.date)));
};

const useGetMonthsSeparator = (days: Date[]) => {
  const dateKernel = bootstrap.getDateKernelPort();
  const columns = useActivityColumns(days);
  const months: { month: Date; col: number }[] = [];

  columns.forEach(column => {
    if (column[3]) {
      const findMonth = months.find(month => dateKernel.isSameMonth(month.month, column[3]));
      if (findMonth) {
        findMonth.col += 1;
      } else {
        months.push({
          month: column[3],
          col: 1,
        });
      }
    }
  });

  return months.filter(month => month.col > 1);
};

export const activityGraphHooks = {
  useActivityGraph,
  useActivityColumns,
  useCreateLevel,
  useGetLevel,
  useGetData,
  useGetMonthsSeparator,
};
