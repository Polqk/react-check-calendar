import * as React from 'react';
import { CheckCalendarProps, CheckCalendarState } from "./types";
import moment from "moment";
import { CheckBoxChangeHandler } from "./CheckBox";
declare class New extends React.Component<CheckCalendarProps, CheckCalendarState> {
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
export { New as default, CheckCalendarProps, };
