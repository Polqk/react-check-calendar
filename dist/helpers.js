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
import moment from 'moment';
import { defaultDatesFormats } from "./defaults";
export var getMomentFromNumber = function (date, value) {
    var trunced = Math.trunc(value);
    return date.clone()
        .set('hour', trunced)
        .set('minutes', (value - trunced) * 60)
        .set('second', 0)
        .set('millisecond', 0);
};
export var getDatesFormats = function (props) {
    return (__assign(__assign({}, defaultDatesFormats), props.datesFormats));
};
export var getArrayDates = function (start, count) {
    var dates = [];
    var clonedStart = start.clone().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    for (var i = 0; i < count; i++) {
        dates.push(clonedStart.clone().add(i, 'day'));
    }
    return dates;
};
export var isInInterval = function (interval1, interval2) {
    var _a = getMomentsFromRange(interval1), start = _a.start, end = _a.end;
    var _b = getMomentsFromRange(interval2), start2 = _b.start, end2 = _b.end;
    return start.isSame(start2, "minute") ||
        end.isSame(end2, "minute") ||
        start.isBetween(start2, end2, 'minutes', '()') ||
        end.isBetween(start2, end2, 'minutes', '()');
};
export var getMomentsFromRange = function (interval) { return ({
    start: getMomentFromDate(interval.start),
    end: getMomentFromDate(interval.end)
}); };
export var getMomentFromDate = function (date) {
    return date instanceof moment ? date : moment(date);
};
//# sourceMappingURL=helpers.js.map