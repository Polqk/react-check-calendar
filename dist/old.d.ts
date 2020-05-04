import * as React from 'react';
import moment from 'moment';
import './styles.css';
import { CheckCalendarProps, HourInterval, MomentOrDateRange } from "./types";
export declare class Old extends React.Component<CheckCalendarProps, any> {
    static defaultProps: CheckCalendarProps;
    checkBoxes: Map<string, any>;
    constructor(props: any);
    componentDidMount(): void;
    _initDates(startDate: moment.Moment | string, week?: number): void;
    handleNextWeek: () => void;
    handlePreviousWeek: () => void;
    handleCheckBoxChange: (e: any) => void;
    static _addAvailabilities(dispo: any, start: moment.Moment, end: moment.Moment): any;
    static _removeAvailabilities(dispo: any, start: moment.Moment, end: moment.Moment): any;
    getDates(): any[];
    getMoments(): any[];
    handleRowMouseEnter: (e: any) => void;
    handleRowMouseLeave: (e: any) => void;
    handleRowClick: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => void;
    handleCheckBoxCreate: (cb: any) => void;
    render(): JSX.Element | null;
}
export { Old as default, CheckCalendarProps, HourInterval, MomentOrDateRange };
