var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import LeftIcon from "./Left";
import RightIcon from "./Right";
import classNames from "classnames";
import { defaultProps } from "./defaults";
import { CheckContextProvider } from "./context";
import RowHeader from "./RowHeader";
import moment from "moment";
import ColumnDate from "./ColumnDate";
import { getArrayDates, getMomentFromNumber, getMomentsFromRange, isInInterval } from "./helpers";
import Checkbox from "./CheckBox";
import './styles.css';
var CheckCalendar = /** @class */ (function (_super) {
    __extends(CheckCalendar, _super);
    function CheckCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false,
            currentDate: moment(_this.props.start).set('day', _this.props.startWeekDay || 1),
            checkedRanges: []
        };
        _this._handlePrevious = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                _this.setState({
                    loading: false,
                    currentDate: _this.state.currentDate.clone().subtract(7, 'days')
                }, _this.props.onPreviousClick);
            }, 400);
        };
        _this._handleNext = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                _this.setState({
                    loading: false,
                    currentDate: _this.state.currentDate.clone().add(7, 'days')
                }, _this.props.onNextClick);
            }, 400);
        };
        _this._handleChange = function (value, props) {
            var checkedRanges = _this.state.checkedRanges;
            var interval = props.interval;
            var _a = _this.props, onChange = _a.onChange, checkedDates = _a.checkedDates;
            var newChecked = __spreadArrays(Array.isArray(checkedDates) ? checkedDates : checkedRanges);
            if (value) {
                newChecked.push(interval);
            }
            else {
                var foundIndex = newChecked.findIndex(function (c) { return isInInterval(c, interval); });
                if (foundIndex > -1) {
                    newChecked.splice(foundIndex, 1);
                }
            }
            newChecked = newChecked.map(function (i) { return getMomentsFromRange(i); });
            if (onChange) {
                onChange({
                    dates: newChecked.map(function (i) { return ({ start: i.start.toDate(), end: i.end.toDate() }); }),
                    moments: newChecked
                });
            }
            if (!Array.isArray(checkedDates)) {
                _this.setState({ checkedRanges: newChecked });
            }
        };
        return _this;
    }
    CheckCalendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, hoursIntervals = _a.hoursIntervals, hideDays = _a.hideDays, max = _a.max, min = _a.min, checkedDates = _a.checkedDates, leftButton = _a.leftButton, rightButton = _a.rightButton, containerClassName = _a.containerClassName, tableClassName = _a.tableClassName, headerClassName = _a.headerClassName, contentClassName = _a.contentClassName;
        var _b = this.state, loading = _b.loading, currentDate = _b.currentDate, checkedRanges = _b.checkedRanges;
        var dates = getArrayDates(currentDate, 7);
        var checked = Array.isArray(checkedDates) ? checkedDates : checkedRanges;
        return (React.createElement(CheckContextProvider, { value: { props: this.props } },
            React.createElement("div", { className: classNames('check-calendar', containerClassName) },
                React.createElement("button", { className: classNames('check-calendar__button check-calendar__prev', leftButton === null || leftButton === void 0 ? void 0 : leftButton.className), disabled: !!min && dates[0].clone().subtract(1, 'day').isBefore(moment(min)), onClick: this._handlePrevious }, (leftButton === null || leftButton === void 0 ? void 0 : leftButton.content) || React.createElement(LeftIcon, null)),
                React.createElement("button", { className: classNames('check-calendar__button check-calendar__next', rightButton === null || rightButton === void 0 ? void 0 : rightButton.className), disabled: !!max && dates[dates.length - 1].clone().add(1, 'day').isAfter(moment(max)), onClick: this._handleNext }, (rightButton === null || rightButton === void 0 ? void 0 : rightButton.content) || React.createElement(RightIcon, null)),
                React.createElement("div", { className: classNames('check-calendar__container', { 'check-calendar__container--hide': loading }), ref: "calendar" },
                    React.createElement("table", { className: classNames('check-calendar__table', tableClassName) },
                        React.createElement("thead", null),
                        React.createElement("tbody", null,
                            React.createElement("tr", { className: "check-calendar__header" },
                                React.createElement("td", { className: classNames(headerClassName) }),
                                dates.map(function (current) {
                                    return (React.createElement("td", { key: current.format('YYYY_MM_DD'), className: classNames(headerClassName, { 'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(current.day()) }) },
                                        React.createElement(ColumnDate, { date: current })));
                                })),
                            hoursIntervals && hoursIntervals.map(function (row) { return (React.createElement("tr", { key: row.start + "_" + row.end },
                                React.createElement(RowHeader, { interval: row }),
                                dates.map(function (day) {
                                    var interval = {
                                        start: getMomentFromNumber(day, row.start),
                                        end: getMomentFromNumber(day, row.end)
                                    };
                                    return (React.createElement("td", { key: day.format('YYYY_MM_DD') + "_" + row.start + "_" + row.end, className: classNames(contentClassName, { 'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(day.day()) }) },
                                        React.createElement(Checkbox, { interval: interval, onChange: _this._handleChange, checked: !!(checked).find(function (c) { return isInInterval(c, interval); }), value: "off" })));
                                }))); })))))));
    };
    CheckCalendar.defaultProps = defaultProps;
    return CheckCalendar;
}(React.Component));
export { CheckCalendar, defaultProps, LeftIcon, RightIcon };
//# sourceMappingURL=index.js.map