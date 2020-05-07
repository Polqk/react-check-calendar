import moment from 'moment';
import {CheckCalendarProps, MomentOrDateRange, MomentRange} from "./types";
import { defaultDatesFormats } from "./defaults";

export const getMomentFromNumber = (date: moment.Moment, value: number) => {
  const trunced =  Math.trunc(value);
  return date.clone()
    .set('hour', trunced)
    .set('minutes', (value - trunced) * 60)
    .set('second', 0)
    .set('millisecond', 0);
};

export const getDatesFormats = (props: CheckCalendarProps) =>
  ({ ...defaultDatesFormats, ...props.datesFormats });

export const getArrayDates = (start: moment.Moment, count: number) => {
  const dates = []

  const clonedStart = start.clone().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

  for (let i = 0; i < count; i++) {
    dates.push(clonedStart.clone().add(i, 'day'));
  }

  return dates;
};

export const isInInterval = (interval1: MomentOrDateRange, interval2: MomentOrDateRange) => {
  const { start, end } = getMomentsFromRange(interval1);
  const { start: start2, end: end2 } = getMomentsFromRange(interval2);

  return start.isSame(start2, "minute") ||
    end.isSame(end2, "minute") ||
    start.isBetween(start2, end2, 'minutes', '()') ||
    end.isBetween(start2, end2, 'minutes', '()');
}

export const getMomentsFromRange = (interval: MomentOrDateRange): MomentRange => ({
  start: getMomentFromDate(interval.start),
  end: getMomentFromDate(interval.end)
})

export const getMomentFromDate = (date: Date | moment.Moment | string) =>
  date instanceof moment ? date as moment.Moment : moment(date);
