import * as React from 'react';
import { CheckCalendarProps, CheckCalendarState } from "./types";
import LeftIcon from "./Left";
import RightIcon from "./Right";
import { defaultProps } from "./defaults";
import moment from "moment";
import { CheckBoxChangeHandler } from "./CheckBox";
import './styles.css';
declare class CheckCalendar extends React.Component<CheckCalendarProps, CheckCalendarState> {
    static defaultProps: CheckCalendarProps;
    state: {
        loading: boolean;
        currentDate: moment.Moment;
        checkedRanges: never[];
    };
    render(): JSX.Element;
    _handlePrevious: () => void;
    _handleNext: () => void;
    _handleChange: CheckBoxChangeHandler;
}
export { CheckCalendar, CheckCalendarProps, defaultProps, LeftIcon, RightIcon };
