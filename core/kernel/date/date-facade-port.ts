import { Locale } from "date-fns";

export enum DateRangeType {
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
  LAST_SEMESTER = "LAST_SEMESTER",
  LAST_YEAR = "LAST_YEAR",
  ALL_TIME = "ALL_TIME",
  CUSTOM = "CUSTOM",
}

export enum TimeGroupingType {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
}

export interface DateFacadePort {
  isToday: (date: Date) => boolean;
  isPast: (date: Date) => boolean;
  isBefore: (dateLeft: Date, dateRight: Date) => boolean;
  isAfter: (dateLeft: Date, dateRight: Date) => boolean;
  isFuture: (date: Date) => boolean;
  isWithinInterval: (date: Date, interval: { start: Date; end: Date }) => boolean;
  compareAsc: (dateLeft: Date, dateRight: Date) => number;
  compareDesc: (dateLeft: Date, dateRight: Date) => number;
  format: (date: Date, pattern: string) => string;
  formatDistanceToNow: (
    date: Date,
    options?: {
      addSuffix?: boolean;
      unit?: "second" | "minute" | "hour" | "day" | "month" | "year";
    }
  ) => string;
  isValid: (date: Date) => boolean;
  addMinutes: (date: Date, minutes: number) => Date;
  eachDayOfInterval: (start: Date, end: Date) => Date[];
  addDays: (date: Date, days: number) => Date;
  subDays: (date: Date, days: number) => Date;
  isSameDay: (dateLeft: Date, dateRight: Date) => boolean;
  subWeeks: (date: Date, weeks: number) => Date;
  startOfWeek: (date: Date) => Date;
  setWeek: (date: Date, weekNumber: number) => Date;
  eachMonthOfInterval: (start: Date, end: Date) => Date[];
  endOfMonth: (date: Date) => Date;
  startOfMonth: (date: Date) => Date;
  isSameMonth: (dateLeft: Date, dateRight: Date) => boolean;
  subMonths: (date: Date, months: number) => Date;
  startOfQuarter: (date: Date) => Date;
  endOfQuarter: (date: Date) => Date;
  addYears: (date: Date, years: number) => Date;
  subYears: (date: Date, years: number) => Date;
  startOfYear: (date: Date) => Date;
  setYear: (date: Date, year: number) => Date;
  getRangeOfDates: (range: DateRangeType) => { from: Date | null; to: Date | null };
  getYearRange: (date: Date) => { from: Date; to: Date };
  getSemesterRange: (date: Date) => { from: Date; to: Date };
  getQuarterRange: (date: Date) => { from: Date; to: Date };
  getMonthRange: (date: Date) => { from: Date; to: Date };
  getWeekRange: (date: Date) => { from: Date; to: Date };
  isDateRangeType: (value: string) => value is DateRangeType;
  isTimeGroupingType: (value: string) => value is TimeGroupingType;
  getDateFromWeekNumber: (year: number, weekNumber: number) => Date;
  getWeekNumber: (date: Date, options?: { hideMonths: boolean }) => string;
  formatInTimeZone: (date: Date, timeZone: string, pattern: string, options?: { locale: Locale }) => string;
  addHours: (date: Date, hours: number) => Date;
  subHours: (date: Date, hours: number) => Date;
}
