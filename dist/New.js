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
import Left from "./Left";
import Right from "./Right";
import classNames from "classnames";
import { defaultProps } from "./defaults";
import { CheckContextProvider } from "./context";
import RowHeader from "./RowHeader";
import moment from "moment";
import ColumnDate from "./ColumnDate";
import { getArrayDates, getMomentFromNumber, isInInterval } from "./helpers";
import Checkbox from "./CheckBox";
var New = /** @class */ (function (_super) {
    __extends(New, _super);
    function New() {
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
                });
            }, 400);
        };
        _this._handleNext = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                _this.setState({
                    loading: false,
                    currentDate: _this.state.currentDate.clone().add(7, 'days')
                });
            }, 400);
        };
        _this._handleChange = function (value, props) {
            var checkedRanges = _this.state.checkedRanges;
            var interval = props.interval;
            var onChange = _this.props.onChange;
            var newChecked;
            if (value) {
                newChecked = __spreadArrays(checkedRanges, [interval]);
            }
            else {
                var foundIndex = checkedRanges.findIndex(function (c) { return isInInterval(c, interval.start) || isInInterval(c, interval.end); });
                if (foundIndex > -1) {
                    newChecked = checkedRanges.slice(foundIndex + 1);
                }
            }
            newChecked = newChecked || checkedRanges;
            _this.setState({ checkedRanges: newChecked });
            if (onChange) {
                onChange({
                    dates: newChecked.map(function (i) { return ({ start: i.start.toDate(), end: i.end.toDate() }); }),
                    moments: newChecked || checkedRanges
                });
            }
        };
        return _this;
    }
    New.prototype.render = function () {
        var _this = this;
        var _a = this.props, hoursIntervals = _a.hoursIntervals, hideDays = _a.hideDays, max = _a.max, min = _a.min;
        var _b = this.state, loading = _b.loading, currentDate = _b.currentDate, checkedRanges = _b.checkedRanges;
        var dates = getArrayDates(currentDate, 7);
        return (React.createElement(CheckContextProvider, { value: { props: this.props } },
            React.createElement("div", { className: "check-calendar" },
                React.createElement("button", { className: "check-calendar__button check-calendar__prev", disabled: !!min && dates[0].clone().subtract(1, 'day').isBefore(moment(min)), onClick: this._handlePrevious },
                    React.createElement(Left, null)),
                React.createElement("button", { className: "check-calendar__button check-calendar__next", disabled: !!max && dates[dates.length - 1].clone().add(1, 'day').isAfter(moment(max)), onClick: this._handleNext },
                    React.createElement(Right, null)),
                React.createElement("div", { className: classNames('check-calendar__container', { 'check-calendar__container--hide': loading }), ref: "calendar" },
                    React.createElement("table", { className: "check-calendar__table" },
                        React.createElement("thead", null),
                        React.createElement("tbody", null,
                            React.createElement("tr", { className: "check-calendar__header" },
                                React.createElement("td", { className: "check-calendar__header" }),
                                dates.map(function (current) {
                                    return (React.createElement("td", { key: current.format('YYYY_MM_DD'), className: classNames({ 'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(current.day()) }) },
                                        React.createElement(ColumnDate, { date: current })));
                                })),
                            hoursIntervals && hoursIntervals.map(function (row) { return (React.createElement("tr", { key: row.start + "_" + row.end },
                                React.createElement(RowHeader, { item: row }),
                                dates.map(function (day) {
                                    var interval = { start: getMomentFromNumber(day, row.start), end: getMomentFromNumber(day, row.end) };
                                    return (React.createElement("td", { key: day.format('YYYY_MM_DD') + "_" + row.start + "_" + row.end, className: classNames({ 'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(day.day()) }) },
                                        React.createElement(Checkbox, { interval: interval, onChange: _this._handleChange, checked: checkedRanges.find(function (c) { return isInInterval(c, interval.start) || isInInterval(c, interval.end); }), className: "biggerCheckbox", value: "off" })));
                                }))); })))))));
    };
    New.defaultProps = defaultProps;
    return New;
}(React.Component));
export { New as default, };
//# sourceMappingURL=New.js.map