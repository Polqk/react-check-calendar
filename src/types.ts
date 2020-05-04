import moment from 'moment';
import {ComponentType} from "react";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface MomentRange {
  start: moment.Moment,
  end: moment.Moment
}

export type MomentOrDateRange = DateRange | MomentRange;

export type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface CheckCalendarProps {
  start?: Date | moment.Moment | string;
  startWeekDay?: WeekDays;
  locale?: string;
  disableBefore?: Date | moment.Moment;
  disableAfter?: Date | moment.Moment;
  disabledDates?: MomentOrDateRange[];
  checkedDates?: MomentOrDateRange[];
  leftButton?: ComponentType;
  hoursIntervals?: HourInterval[];
  datesFormats?: Partial<DatesFormats>;
  max?: Date | moment.Moment | string;
  min?: Date | moment.Moment | string;
  hideDays?: number[];
  onChange?: (checkedIntervals: { moments: Partial<MomentRange>[], dates: Partial<DateRange>[] }) => void
}

export interface CheckCalendarState {
  loading: boolean;
  currentDate: moment.Moment;
  checkedRanges: MomentRange[];
}

export interface DatesFormats {
  fromHour: string;
  toHour: string;
}

export interface CheckCalendarContext {
  props: CheckCalendarProps
}

export interface HourInterval {
  start: number;
  end: number;
  break?: { start: number, end: number };
}
