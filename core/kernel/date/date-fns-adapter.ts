import * as DateFns from "date-fns";
import { FormatDistanceStrictUnit, Locale } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { DateFacadePort, DateRangeType, TimeGroupingType } from "./date-facade-port";

export class DateFnsAdapter implements DateFacadePort {
  isToday(date: Date): boolean {
    return DateFns.isToday(date);
  }

  isPast(date: Date): boolean {
    return DateFns.isPast(date);
  }

  isFuture(date: Date): boolean {
    return DateFns.isFuture(date);
  }

  isWithinInterval(date: Date, interval: { start: Date; end: Date }): boolean {
    return DateFns.isWithinInterval(date, interval);
  }

  compareAsc(dateLeft: Date, dateRight: Date): number {
    return DateFns.compareAsc(dateLeft, dateRight);
  }

  compareDesc(dateLeft: Date, dateRight: Date): number {
    return DateFns.compareDesc(dateLeft, dateRight);
  }

  format(date: Date, pattern: string): string {
    return DateFns.format(date, pattern);
  }

  addMinutes(date: Date, minutes: number): Date {
    return DateFns.addMinutes(date, minutes);
  }

  addDays(date: Date, days: number): Date {
    return DateFns.addDays(date, days);
  }

  subDays(date: Date, days: number): Date {
    return DateFns.subDays(date, days);
  }

  eachDayOfInterval(start: Date, end: Date): Date[] {
    return DateFns.eachDayOfInterval({ start, end });
  }

  isSameDay(dateLeft: Date, dateRight: Date): boolean {
    return DateFns.isSameDay(dateLeft, dateRight);
  }

  subWeeks(date: Date, weeks: number): Date {
    return DateFns.subWeeks(date, weeks);
  }

  startOfWeek(date: Date): Date {
    return DateFns.startOfWeek(date, { weekStartsOn: 1 });
  }

  setWeek(date: Date, weekNumber: number): Date {
    return DateFns.setWeek(date, weekNumber);
  }

  eachMonthOfInterval(start: Date, end: Date): Date[] {
    return DateFns.eachMonthOfInterval({ start, end });
  }

  endOfMonth(date: Date): Date {
    return DateFns.endOfMonth(date);
  }

  isSameMonth(dateLeft: Date, dateRight: Date): boolean {
    return DateFns.isSameMonth(dateLeft, dateRight);
  }

  startOfMonth(date: Date): Date {
    return DateFns.startOfMonth(date);
  }

  subMonths(date: Date, months: number): Date {
    return DateFns.subMonths(date, months);
  }

  startOfQuarter(date: Date): Date {
    return DateFns.startOfQuarter(date);
  }

  endOfQuarter(date: Date): Date {
    return DateFns.endOfQuarter(date);
  }

  addYears(date: Date, years: number): Date {
    return DateFns.addYears(date, years);
  }

  addWeeks(date: Date, weeks: number): Date {
    return DateFns.addWeeks(date, weeks);
  }

  subYears(date: Date, years: number): Date {
    return DateFns.subYears(date, years);
  }

  startOfYear(date: Date): Date {
    return DateFns.startOfYear(date);
  }

  setYear(date: Date, year: number): Date {
    return DateFns.setYear(date, year);
  }

  formatDistanceToNow(
    date: Date,
    {
      addSuffix = true,
      ...options
    }: {
      addSuffix?: boolean;
      unit?: FormatDistanceStrictUnit;
    } = {}
  ): string {
    return DateFns.formatDistanceToNowStrict(date, { addSuffix, ...options });
  }

  isValid(date: Date) {
    return DateFns.isValid(date);
  }

  getRangeOfDates(range: DateRangeType): { from: Date | null; to: Date | null } {
    switch (range) {
      case DateRangeType.LAST_WEEK: {
        const today = new Date();
        const lastWeek = this.subWeeks(today, 1);
        return { from: lastWeek, to: today };
      }
      case DateRangeType.LAST_MONTH: {
        const today = new Date();
        const lastMonth = this.subMonths(today, 1);
        return { from: lastMonth, to: today };
      }
      case DateRangeType.LAST_YEAR: {
        const today = new Date();
        const lastYears = this.subYears(today, 1);
        return { from: lastYears, to: today };
      }
      case DateRangeType.LAST_SEMESTER: {
        const today = new Date();
        const lastSemester = this.subMonths(today, 6);
        return { from: lastSemester, to: today };
      }
      case DateRangeType.ALL_TIME: {
        const today = new Date();
        const allTime = new Date("2007-10-20T05:24:19Z");
        return { from: allTime, to: today };
      }
      default: {
        return { from: null, to: null };
      }
    }
  }

  getMonthRange(date: Date): { from: Date; to: Date } {
    const firstDay = this.startOfMonth(date);
    const lastDay = this.endOfMonth(date);
    return { from: firstDay, to: lastDay };
  }

  getYearRange(date: Date): { from: Date; to: Date } {
    const firstDay = this.startOfYear(date);
    const lastDay = this.addYears(firstDay, 1);
    return { from: firstDay, to: lastDay };
  }

  getSemesterRange(date: Date): { from: Date; to: Date } {
    const lastSemester = this.subMonths(date, 6);
    return { from: lastSemester, to: date };
  }

  getQuarterRange(date: Date): { from: Date; to: Date } {
    const firstDay = this.startOfQuarter(date);
    const lastDay = this.endOfQuarter(date);
    return { from: firstDay, to: lastDay };
  }

  getWeekRange(date: Date): { from: Date; to: Date } {
    const firstDay = this.startOfWeek(date);
    const lastDay = this.addDays(firstDay, 6);
    return { from: firstDay, to: lastDay };
  }

  isDateRangeType(value: string): value is DateRangeType {
    return Object.values(DateRangeType).includes(value as DateRangeType);
  }

  isTimeGroupingType(value: string): value is TimeGroupingType {
    return Object.values(TimeGroupingType).includes(value as TimeGroupingType);
  }

  getDateFromWeekNumber(year: number, weekNumber: number) {
    return this.startOfWeek(this.setWeek(this.startOfYear(this.setYear(new Date(), year)), weekNumber));
  }

  getWeekNumber(date: Date, options?: { hideMonths: boolean }): string {
    if (options?.hideMonths) {
      return this.format(date, "w yyyy");
    }
    return this.format(date, "w, MMM yyyy");
  }

  formatInTimeZone(date: Date, timeZone: string, pattern: string, options?: { locale: Locale }): string {
    return formatInTimeZone(date, timeZone, pattern, options);
  }

  isBefore(dateLeft: Date, dateRight: Date): boolean {
    return DateFns.isBefore(dateLeft, dateRight);
  }

  isAfter(dateLeft: Date, dateRight: Date): boolean {
    return DateFns.isAfter(dateLeft, dateRight);
  }

  addHours(date: Date, hours: number): Date {
    return DateFns.addHours(date, hours);
  }

  subHours(date: Date, hours: number): Date {
    return DateFns.subHours(date, hours);
  }

  eachWeekOfInterval(start: Date, end: Date): Date[] {
    return DateFns.eachWeekOfInterval({ start, end });
  }

  endOfWeek(date: Date): Date {
    return DateFns.endOfWeek(date, { weekStartsOn: 1 });
  }
}
