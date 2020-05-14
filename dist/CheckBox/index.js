var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import './checkbox.css';
import classNames from 'classnames';
import { getMomentFromDate } from "../helpers";
import CheckContext from "../context";
var Checkbox = function (_a) {
    var interval = _a.interval, props = __rest(_a, ["interval"]);
    var _b = React.useContext(CheckContext).props, disableBefore = _b.disableBefore, disableAfter = _b.disableAfter, disabledDates = _b.disabledDates;
    var _handleChange = function (e) {
        var value = e.target.checked;
        props.onChange(value, __assign(__assign({}, props), { checked: value, value: value ? 0 : 1, interval: interval }));
    };
    var isBeforeDisabled = disableBefore ? interval.end.isBefore(getMomentFromDate(disableBefore)) : false;
    var isAfterDisabled = disableAfter ? interval.start.isAfter(getMomentFromDate(disableAfter)) : false;
    var isDisabledDate = Array.isArray(disabledDates)
        ? disabledDates.some(function (d) { return getMomentFromDate(d).isBetween(interval.start, interval.end); })
        : false;
    var disabled = props.disabled || isBeforeDisabled || isAfterDisabled || isDisabledDate;
    return (React.createElement("label", { className: classNames('check-calendar-checkbox__wrapper', { disabled: disabled }, props.className) },
        React.createElement("span", { className: "check-calendar-checkbox" },
            React.createElement("input", __assign({}, props, { onChange: _handleChange, className: classNames('check-calendar-checkbox__input'), type: "checkbox", disabled: disabled })),
            React.createElement("span", { className: "check-calendar-checkbox__inner" }))));
};
export default Checkbox;
//# sourceMappingURL=index.js.map