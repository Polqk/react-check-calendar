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
import * as React from 'react';
import moment from 'moment';
import './styles.css';
import ColumnDate from "./ColumnDate";
import Right from "./Right";
import Left from './Left';
import { defaultProps } from "./defaults";
import classNames from 'classnames';
import { getDatesFormats, getMomentFromNumber } from "./helpers";
import HTMLParser from 'html-react-parser';
var RowCheckBoxes = function (props) {
    var row = [];
    var index = props.row;
    var map = props.availabilities;
    var dateFormated;
    var key;
    var av;
    var checked = false;
    var disable = false;
    var startHour, endHour;
    var _a = props.interval || { start: undefined, end: undefined }, start = _a.start, end = _a.end;
    for (var i = 0; i < props.dates.length; i++) {
        var date = props.dates[i];
        if (start) {
            startHour = getMomentFromNumber(date, start);
        }
        if (end) {
            endHour = getMomentFromNumber(date, end);
        }
        dateFormated = date.format('Y_M_D');
        key = index + '-' + i + '-' + dateFormated;
        av = map ? map.get(dateFormated) : false;
        checked = false;
        disable = false;
        if (av && av.checked) {
            checked = av.checked[index];
        }
        if (date.isBefore(props.disableBefore)) {
            disable = true;
        }
        else if (Array.isArray(props.disabledDates) && (startHour || endHour)) {
            for (var i_1 = 0; !disable && i_1 < props.disabledDates.length; i_1++) {
                var disabledDate = props.disabledDates[i_1];
                if (startHour && startHour.isValid() && startHour.isBetween(disabledDate.start, disabledDate.end, undefined, '[]')) {
                    disable = true;
                }
                if (!disable) {
                    if (endHour && endHour.isValid() && endHour.isBetween(disabledDate.start, disabledDate.end, undefined, '[]')) {
                        disable = true;
                    }
                }
            }
        }
        row.push(React.createElement("td", { key: key + '-td' },
            React.createElement("input", { type: "checkbox", checked: checked })));
    }
    return React.createElement(React.Fragment, null, row);
};
var Old = /** @class */ (function (_super) {
    __extends(Old, _super);
    function Old(props) {
        var _this = _super.call(this, props) || this;
        _this.handleNextWeek = function () {
            var firstDate = _this.state.firstDate;
            var week = _this.state.week;
            week = week + 1;
            _this.setState({ loading: true });
            setTimeout(function () {
                firstDate.add(7, 'day');
                _this._initDates(firstDate, week);
                _this.setState({ loading: false });
            }, 400);
        };
        _this.handlePreviousWeek = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                var firstDate = _this.state.firstDate;
                var week = _this.state.week;
                var current = moment(new Date());
                week--;
                firstDate.subtract(7, 'day');
                if (firstDate.diff(current) < 0) {
                    week = 0;
                    firstDate = current;
                }
                _this._initDates(firstDate, week);
                _this.setState({ loading: false });
            }, 400);
        };
        _this.handleCheckBoxChange = function (e) {
            var checked = e.target.checked;
            var keys = e.target.id.split('-');
            var row = keys[0];
            //let col = keys[1];
            var map_key = keys[2];
            var hoursIntervals = _this.props.hoursIntervals;
            var datesMap = _this.state.datesMap;
            var dispo = datesMap.get(map_key);
            var startDate = dispo.date.clone();
            var endDate = dispo.date.clone();
            if (!dispo.availabilities) {
                dispo.availabilities = [];
            }
            if (!dispo.checked) {
                dispo.checked = [false, false, false, false];
            }
            startDate.set('minute', 0).set('second', 0).set('millisecond', 0);
            endDate.set('minute', 0).set('second', 0).set('millisecond', 0);
            if (hoursIntervals) {
                var index = parseInt(row, 10);
                if (hoursIntervals[index]) {
                    startDate.set('hour', hoursIntervals[index].start);
                    endDate.set('hour', hoursIntervals[index].end);
                }
            }
            var new_dispo;
            if (checked) {
                e.target.checked = true;
                dispo.checked[parseInt(row, 10)] = true;
                new_dispo = Old._addAvailabilities(dispo, startDate, endDate);
            }
            else {
                e.target.checked = false;
                dispo.checked[parseInt(row, 10)] = false;
                new_dispo = Old._removeAvailabilities(dispo, startDate, endDate);
            }
            datesMap.set(map_key, new_dispo);
            _this.setState({ datesMap: datesMap });
        };
        _this.handleRowMouseEnter = function (e) {
            var id = e.target.id;
            /*// FOCUS NOT WORKING ?
            let { dates } = this.state;
            let df, cb, cb_key;
            let i = 0;
            for ( let date of dates ) {
              cb_key = id+'-'+(i);
              cb = this.checkBoxes[cb_key];
              //console.log(cb_key, cb);
              if(cb){
                cb.focus();
              }
              i++;
            }*/
            var line = _this.refs['hoursRow-' + id];
            if (line) {
                // @ts-ignore
                line.className = 'hoverHourRow';
            }
        };
        _this.handleRowMouseLeave = function (e) {
            var line = _this.refs['hoursRow-' + e.target.id];
            if (line) {
                // @ts-ignore
                line.className = 'defaultHourRow';
            }
            else {
                for (var i = 0; i < 4; i++) {
                    // @ts-ignore
                    _this.refs['hoursRow-' + i].className = 'defaultHourRow';
                }
            }
        };
        _this.handleRowClick = function (e) {
            var row = e.target.id;
            var _a = _this.state, dates = _a.dates, rowsCheck = _a.rowsCheck;
            var hoursIntervals = _this.props.hoursIntervals;
            // let datesMap = this.state.datesMap;
            var dateFormated; //,mapItem ;
            var index = parseInt(row, 10);
            var check = rowsCheck[_this.state.week][index] = !rowsCheck[_this.state.week][index];
            var target = { id: '' };
            var checkBoxId = {};
            var now = moment();
            var hour = now.get('hour');
            now = now.format('Y_M_D');
            // @ts-ignore
            checkBoxId.target = target;
            var i = 0;
            for (var _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
                var date = dates_1[_i];
                dateFormated = moment(date).format('Y_M_D');
                //mapItem = datesMap.get(dateFormated);
                // @ts-ignore
                checkBoxId.target.id = row + '-' + i + '-' + dateFormated + '-cb';
                // @ts-ignore
                checkBoxId.target.checked = check;
                if (dateFormated === now) {
                    if (hoursIntervals && hour >= hoursIntervals[index].start) {
                        // @ts-ignore
                        checkBoxId.target.checked = false;
                    }
                }
                _this.handleCheckBoxChange(checkBoxId);
                i++;
            }
            _this.setState({ rowsCheck: rowsCheck });
        };
        _this.handleCheckBoxCreate = function (cb) {
            if (cb) {
                _this.checkBoxes.set(cb.props.id, cb);
            }
        };
        var rowsCheck = [];
        var weeks = props.maxWeeks ? props.maxWeeks : 4;
        for (var i = 0; i < weeks; i++) {
            rowsCheck.push([false, false, false, false]);
        }
        _this.checkBoxes = new Map();
        _this.state = {
            rowsCheck: rowsCheck,
            firstDate: moment(),
            dates: [],
            datesMap: new Map(),
            week: 0,
            maxWeeks: props.maxWeeks ? props.maxWeeks : 4,
            loading: false
        };
        return _this;
    }
    Old.prototype.componentDidMount = function () {
        this._initDates(this.state.firstDate);
    };
    Old.prototype._initDates = function (startDate, week) {
        if (week === void 0) { week = 0; }
        var datesMap = this.state.datesMap;
        var dates = new Array(5);
        var firstDate;
        var refFormat = 'Y_M_D';
        if (startDate instanceof moment) {
            dates[0] = firstDate = startDate;
        }
        else {
            dates[0] = firstDate = moment(startDate);
        }
        if (!datesMap.get(firstDate.format(refFormat))) {
            var d = [];
            d['date'] = firstDate;
            datesMap.set(firstDate.format(refFormat), d);
        }
        var date;
        for (var i = 1; i < dates.length; i++) {
            dates[i] = moment(dates[i - 1]).add(1, 'day');
            if (dates[i].day() === 6 || dates[i].day() === 0) {
                dates[i] = dates[i].add(1, 'week').set('day', 1);
            }
            if (!datesMap.get(dates[i].format(refFormat))) {
                date = [];
                date['date'] = dates[i];
                datesMap.set(dates[i].format(refFormat), date);
            }
        }
        this.setState({
            dates: dates,
            datesMap: datesMap,
            currentDate: firstDate,
            week: week
        });
    };
    Old._addAvailabilities = function (dispo, start, end) {
        var d_av = dispo.availabilities;
        var ava = { start: start, end: end };
        var chained = false;
        if (d_av.length === 0) {
            chained = true;
            d_av.push(ava);
        }
        else {
            for (var _i = 0, d_av_1 = d_av; _i < d_av_1.length; _i++) {
                var a = d_av_1[_i];
                if (a.start.diff(start, 'minutes') > 0) { // before already checkedRanges
                    if (a.start.diff(end, 'minutes') === 0) { // chained hours
                        a.start = start;
                        chained = true;
                    }
                }
                else if (a.start.diff(start, 'minutes') < 0) { // after already checkedRanges
                    if (a.end.diff(start, 'minutes') === 0) { // chained hours
                        a.end = end;
                        chained = true;
                    }
                }
                else {
                    chained = true;
                }
            }
        }
        if (!chained) {
            d_av.push(ava);
        }
        if (d_av.length > 1) {
            if ((d_av[0].end.isBetween(d_av[1].start, d_av[1].end)) || d_av[0].start.isBetween(d_av[1].start, d_av[1].end)
                || (d_av[1].end.isBetween(d_av[0].start, d_av[0].end)) || d_av[1].start.isBetween(d_av[0].start, d_av[0].end)) {
                if (d_av[0].start.diff(d_av[1].start, 'minutes') > 0) {
                    d_av[0].start.set('hour', d_av[1].start.get('hour'));
                }
                if (d_av[0].end.diff(d_av[1].end, 'minutes') < 0) {
                    d_av[0].end.set('hour', d_av[1].end.get('hour'));
                }
                d_av = [d_av[0]];
            }
        }
        dispo.availabilities = d_av;
        return dispo;
    };
    Old._removeAvailabilities = function (dispo, start, end) {
        var d_av = dispo.availabilities;
        if (d_av.length !== 0) {
            var del = false;
            var divider = void 0;
            var av = void 0;
            for (var i in d_av) {
                av = d_av[i];
                if (start.diff(av.start, 'minutes') === 0) {
                    if (end.diff(av.end, 'minutes') === 0) {
                        del = i;
                    }
                    else {
                        av.start.set('hour', end.get('hour'));
                    }
                }
                else if (end.diff(av.end, 'minutes') === 0) {
                    if (start.diff(av.start, 'minutes') === 0) {
                        del = i;
                    }
                    else {
                        av.end.set('hour', start.get('hour'));
                    }
                }
                else if (start.isBetween(av.start, av.end) || end.isBetween(av.start, av.end)) {
                    divider = [{ start: av.start.clone(), end: start.clone() }, { start: end.clone(), end: av.end.clone() }];
                }
            }
            if (divider) {
                dispo.availabilities = divider;
            }
            else if (del !== false) {
                dispo.availabilities.splice(del, 1);
            }
        }
        return dispo;
    };
    Old.prototype.getDates = function () {
        var map = this.state.datesMap;
        var availabilities = [];
        map.forEach(function (value) {
            if (value.availabilities) {
                for (var _i = 0, _a = value.availabilities; _i < _a.length; _i++) {
                    var a = _a[_i];
                    availabilities.push({ start: a.start.toDate(), end: a.end.toDate() });
                }
            }
        });
        return availabilities;
    };
    Old.prototype.getMoments = function () {
        var map = this.state.datesMap;
        var availabilities = [];
        map.forEach(function (value) {
            if (value.availabilities) {
                for (var _i = 0, _a = value.availabilities; _i < _a.length; _i++) {
                    var a = _a[_i];
                    availabilities.push(a);
                }
            }
        });
        return availabilities;
    };
    Old.prototype.render = function () {
        var _this = this;
        var _a, _b, _c;
        var _d = this.state, dates = _d.dates, week = _d.week, maxWeeks = _d.maxWeeks, datesMap = _d.datesMap, loading = _d.loading;
        var hoursIntervals = this.props.hoursIntervals;
        var datesRow = [];
        var checkBoxRows = [];
        for (var i = 0; i < dates.length; i++) {
            datesRow.push(React.createElement("td", { key: 'dateCol-' + i, className: "check-calendar__header" },
                React.createElement(ColumnDate, { date: dates[i] })));
        }
        var hours = [];
        var start, end;
        if (!hoursIntervals) {
            return null;
        }
        for (var i = 0; i < hoursIntervals.length; i++) {
            if (hoursIntervals[i]["break"]) {
                if (((_a = hoursIntervals[i]["break"]) === null || _a === void 0 ? void 0 : _a.start) === hoursIntervals[i].start) {
                    start = (_b = hoursIntervals[i]["break"]) === null || _b === void 0 ? void 0 : _b.end;
                    end = hoursIntervals[i].end;
                }
                else if (hoursIntervals[i]) {
                    start = hoursIntervals[i].start;
                    end = (_c = hoursIntervals[i]["break"]) === null || _c === void 0 ? void 0 : _c.start;
                }
            }
            else {
                start = hoursIntervals[i].start;
                end = hoursIntervals[i].end;
            }
            var _e = getDatesFormats(this.props), fromHour = _e.fromHour, toHour = _e.toHour;
            hours.push(React.createElement("div", { id: i.toString(), className: "check-calendar__hour" },
                start && HTMLParser("<span>" + (getMomentFromNumber(moment(), start).format(fromHour)
                    .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>"),
                end && HTMLParser("<span>" + (getMomentFromNumber(moment(), end).format(toHour)
                    .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>")));
        }
        for (var i = 0; i < hoursIntervals.length; i++) {
            checkBoxRows.push(React.createElement("tr", { className: "defaultHourRow", key: 'hoursRow-' + i, ref: 'hoursRow-' + i },
                React.createElement("td", { className: "check-calendar__row-header", id: i.toString(), onClick: this.handleRowClick, onMouseEnter: this.handleRowMouseEnter, onMouseLeave: this.handleRowMouseLeave }, hours[i]),
                React.createElement(RowCheckBoxes, { hoursIntervals: hoursIntervals, interval: hoursIntervals[i], dates: dates, disabledDates: this.props.disabledDates, checkedDates: this.props.checkedDates, disableBefore: this.props.disableBefore || moment(), availabilities: datesMap, row: i, handleChange: this.handleCheckBoxChange, cbRef: function (checkbox) { _this.handleCheckBoxCreate(checkbox); } })));
        }
        return (React.createElement("div", { className: "check-calendar" },
            React.createElement("button", { className: "check-calendar__prev", disabled: week === 0, onClick: this.handlePreviousWeek },
                React.createElement(Left, null)),
            React.createElement("button", { className: "check-calendar__next", disabled: !(week < maxWeeks - 1), onClick: this.handleNextWeek },
                React.createElement(Right, null)),
            React.createElement("div", { className: classNames('check-calendar__container', { 'check-calendar__container--hide': loading }), ref: "calendar" },
                React.createElement("table", { className: "check-calendar__table" },
                    React.createElement("thead", null),
                    React.createElement("tbody", null,
                        React.createElement("tr", { className: "check-calendar__header" },
                            React.createElement("td", { className: "check-calendar__header" }),
                            datesRow),
                        checkBoxRows)))));
    };
    Old.defaultProps = defaultProps;
    return Old;
}(React.Component));
export { Old };
export { Old as default };
//# sourceMappingURL=old.js.map