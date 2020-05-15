import moment from 'moment';
import { CheckCalendarProps, MomentOrDateRange, MomentRange } from "./types";
export declare const getMomentFromNumber: (date: moment.Moment, value: number) => moment.Moment;
export declare const getDatesFormats: (props: CheckCalendarProps) => {
    fromHour: string;
    toHour: string;
} | {
    fromHour: string;
    toHour: string;
};
export declare const getArrayDates: (start: moment.Moment, count: number) => moment.Moment[];
export declare const isInInterval: (interval1: MomentOrDateRange, interval2: MomentOrDateRange) => boolean;
export declare const getMomentsFromRange: (interval: MomentOrDateRange) => MomentRange;
export declare const getMomentFromDate: (date: Date | moment.Moment | string) => moment.Moment;
