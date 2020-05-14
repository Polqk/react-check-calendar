import moment from 'moment';
import { ReactElement, ReactNode } from "react";
export interface DateRange {
    start: Date;
    end: Date;
}
export interface MomentRange {
    start: moment.Moment;
    end: moment.Moment;
}
export declare type MomentOrDateRange = DateRange | MomentRange;
export declare type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface CheckCalendarProps {
    start?: Date | moment.Moment | string;
    startWeekDay?: WeekDays;
    locale?: string;
    disableBefore?: Date | moment.Moment | string;
    disableAfter?: Date | moment.Moment | string;
    disabledDates?: (moment.Moment | Date | string)[];
    checkedDates?: MomentOrDateRange[];
    hoursIntervals?: HourInterval[];
    datesFormats?: Partial<DatesFormats>;
    max?: Date | moment.Moment | string;
    min?: Date | moment.Moment | string;
    hideDays?: number[];
    onChange?: (checkedIntervals: {
        moments: Partial<MomentRange>[];
        dates: Partial<DateRange>[];
    }) => void;
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    leftButton?: {
        content?: ReactNode;
        className?: string;
    };
    rightButton?: {
        content?: ReactNode;
        className?: string;
    };
    containerClassName?: string;
    tableClassName?: string;
    headerClassName?: string;
    contentClassName?: string;
    headerRowClassName?: string;
    renderColumnHeader?: (date: moment.Moment) => ReactElement;
    renderRowHeader?: (interval: HourInterval) => ReactElement;
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
    props: CheckCalendarProps;
}
export interface HourInterval {
    start: number;
    end: number;
    break?: {
        start: number;
        end: number;
    };
}
