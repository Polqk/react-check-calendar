import { createElement, createContext, useContext, Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import HTMLParser from 'html-react-parser';
import Moment from 'react-moment';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Left = function Left() {
  return createElement("svg", {
    height: 30,
    viewBox: "0 0 320 512"
  }, createElement("path", {
    d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49\n      256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-\n      9.37-9.37-9.37-24.57 0-33.94z"
  }));
};

var Right = function Right() {
  return createElement("svg", {
    height: 30,
    viewBox: "0 0 320 512"
  }, createElement("path", {
    d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522\n      -.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373\n       33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
  }));
};

var defaultProps = {
  startWeekDay: 1,
  locale: 'en',
  hoursIntervals: [{
    start: 8,
    end: 10
  }, {
    start: 10,
    end: 12
  }, {
    start: 13,
    end: 15
  }, {
    start: 15,
    end: 17
  }],
  hideDays: [0, 6]
};
var defaultContext = {
  props: defaultProps
};
var defaultDatesFormats = {
  fromHour: '[from] [<strong>]h:mm[</strong>][<small>]a[</small>]',
  toHour: ' [to] [<strong>]h:mm[</strong>][<small>]a[</small>]'
};

var CheckContext = createContext(defaultContext);
var CheckContextProvider = CheckContext.Provider;

var getMomentFromNumber = function getMomentFromNumber(date, value) {
  var trunced = Math.trunc(value);
  return date.clone().set('hour', trunced).set('minutes', (value - trunced) * 60).set('second', 0).set('millisecond', 0);
};
var getDatesFormats = function getDatesFormats(props) {
  return _extends(_extends({}, defaultDatesFormats), props.datesFormats);
};
var getArrayDates = function getArrayDates(start, count) {
  var dates = [];
  var clonedStart = start.clone().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

  for (var i = 0; i < count; i++) {
    dates.push(clonedStart.clone().add(i, 'day'));
  }

  return dates;
};
var isInInterval = function isInInterval(interval1, interval2) {
  var _getMomentsFromRange = getMomentsFromRange(interval1),
      start = _getMomentsFromRange.start,
      end = _getMomentsFromRange.end;

  var _getMomentsFromRange2 = getMomentsFromRange(interval2),
      start2 = _getMomentsFromRange2.start,
      end2 = _getMomentsFromRange2.end;

  return start.isSame(start2, "minute") || end.isSame(end2, "minute") || start.isBetween(start2, end2, 'minutes', '()') || end.isBetween(start2, end2, 'minutes', '()');
};
var getMomentsFromRange = function getMomentsFromRange(interval) {
  return {
    start: getMomentFromDate(interval.start),
    end: getMomentFromDate(interval.end)
  };
};
var getMomentFromDate = function getMomentFromDate(date) {
  return date instanceof moment ? date : moment(date);
};

var RowHeader = function RowHeader(_ref) {
  var interval = _ref.interval;

  var _React$useContext = useContext(CheckContext),
      props = _React$useContext.props;

  var start = interval.start,
      end = interval.end;

  var _getDatesFormats = getDatesFormats(props),
      fromHour = _getDatesFormats.fromHour,
      toHour = _getDatesFormats.toHour;

  if (props.renderRowHeader) {
    return props.renderRowHeader(interval);
  }

  return createElement("td", {
    className: classNames('check-calendar__row-header', props.headerRowClassName)
  }, createElement("div", {
    className: "check-calendar__hour"
  }, start && HTMLParser("<span>" + (getMomentFromNumber(moment(), start).format(fromHour).replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>"), end && HTMLParser("<span>" + (getMomentFromNumber(moment(), end).format(toHour).replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>")));
};

var ColumnDate = function ColumnDate(_ref) {
  var date = _ref.date;

  var _React$useContext = useContext(CheckContext),
      props = _React$useContext.props;

  if (props.renderColumnHeader) {
    return props.renderColumnHeader(date);
  }

  return createElement("div", null, createElement("div", null, createElement(Moment, {
    className: "check-calendar_day",
    locale: props === null || props === void 0 ? void 0 : props.locale,
    format: "ddd"
  }, date)), createElement("div", null, createElement(Moment, {
    className: "check-calendar__day-number",
    locale: "fr",
    format: "DD"
  }, date)), createElement("div", null, createElement(Moment, {
    className: "check-calendar__month",
    locale: "fr",
    format: "MMM"
  }, date)), createElement("div", null));
};

var Checkbox = function Checkbox(_ref) {
  var interval = _ref.interval,
      props = _objectWithoutPropertiesLoose(_ref, ["interval"]);

  var _React$useContext = useContext(CheckContext),
      _React$useContext$pro = _React$useContext.props,
      disableBefore = _React$useContext$pro.disableBefore,
      disableAfter = _React$useContext$pro.disableAfter,
      disabledDates = _React$useContext$pro.disabledDates;

  var _handleChange = function _handleChange(e) {
    var value = e.target.checked;
    props.onChange(value, _extends(_extends({}, props), {}, {
      checked: value,
      value: value ? 0 : 1,
      interval: interval
    }));
  };

  var isBeforeDisabled = disableBefore ? interval.end.isBefore(getMomentFromDate(disableBefore)) : false;
  var isAfterDisabled = disableAfter ? interval.start.isAfter(getMomentFromDate(disableAfter)) : false;
  var isDisabledDate = Array.isArray(disabledDates) ? disabledDates.some(function (d) {
    return getMomentFromDate(d).isBetween(interval.start, interval.end);
  }) : false;
  var disabled = props.disabled || isBeforeDisabled || isAfterDisabled || isDisabledDate;
  return createElement("label", {
    className: classNames('check-calendar-checkbox__wrapper', {
      disabled: disabled
    }, props.className)
  }, createElement("span", {
    className: "check-calendar-checkbox"
  }, createElement("input", Object.assign({}, props, {
    onChange: _handleChange,
    className: classNames('check-calendar-checkbox__input'),
    type: "checkbox",
    disabled: disabled
  })), createElement("span", {
    className: "check-calendar-checkbox__inner"
  })));
};

var CheckCalendar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CheckCalendar, _React$Component);

  function CheckCalendar() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      loading: false,
      currentDate: moment(_this.props.start).set('day', _this.props.startWeekDay || 1),
      checkedRanges: []
    };

    _this._handlePrevious = function () {
      _this.setState({
        loading: true
      });

      setTimeout(function () {
        _this.setState({
          loading: false,
          currentDate: _this.state.currentDate.clone().subtract(7, 'days')
        }, _this.props.onPreviousClick);
      }, 400);
    };

    _this._handleNext = function () {
      _this.setState({
        loading: true
      });

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
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          checkedDates = _this$props.checkedDates;
      var newChecked = [].concat(Array.isArray(checkedDates) ? checkedDates : checkedRanges);

      if (value) {
        newChecked.push(interval);
      } else {
        var foundIndex = newChecked.findIndex(function (c) {
          return isInInterval(c, interval);
        });

        if (foundIndex > -1) {
          newChecked.splice(foundIndex, 1);
        }
      }

      newChecked = newChecked.map(function (i) {
        return getMomentsFromRange(i);
      });

      if (onChange) {
        onChange({
          dates: newChecked.map(function (i) {
            return {
              start: i.start.toDate(),
              end: i.end.toDate()
            };
          }),
          moments: newChecked
        });
      }

      if (!Array.isArray(checkedDates)) {
        _this.setState({
          checkedRanges: newChecked
        });
      }
    };

    return _this;
  }

  var _proto = CheckCalendar.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        hoursIntervals = _this$props2.hoursIntervals,
        hideDays = _this$props2.hideDays,
        max = _this$props2.max,
        min = _this$props2.min,
        checkedDates = _this$props2.checkedDates,
        leftButton = _this$props2.leftButton,
        rightButton = _this$props2.rightButton,
        containerClassName = _this$props2.containerClassName,
        tableClassName = _this$props2.tableClassName,
        headerClassName = _this$props2.headerClassName,
        contentClassName = _this$props2.contentClassName;
    var _this$state = this.state,
        loading = _this$state.loading,
        currentDate = _this$state.currentDate,
        checkedRanges = _this$state.checkedRanges;
    var dates = getArrayDates(currentDate, 7);
    var checked = Array.isArray(checkedDates) ? checkedDates : checkedRanges;
    return createElement(CheckContextProvider, {
      value: {
        props: this.props
      }
    }, createElement("div", {
      className: classNames('check-calendar', containerClassName)
    }, createElement("button", {
      className: classNames('check-calendar__button check-calendar__prev', leftButton === null || leftButton === void 0 ? void 0 : leftButton.className),
      disabled: !!min && dates[0].clone().subtract(1, 'day').isBefore(moment(min)),
      onClick: this._handlePrevious
    }, (leftButton === null || leftButton === void 0 ? void 0 : leftButton.content) || createElement(Left, null)), createElement("button", {
      className: classNames('check-calendar__button check-calendar__next', rightButton === null || rightButton === void 0 ? void 0 : rightButton.className),
      disabled: !!max && dates[dates.length - 1].clone().add(1, 'day').isAfter(moment(max)),
      onClick: this._handleNext
    }, (rightButton === null || rightButton === void 0 ? void 0 : rightButton.content) || createElement(Right, null)), createElement("div", {
      className: classNames('check-calendar__container', {
        'check-calendar__container--hide': loading
      }),
      ref: "calendar"
    }, createElement("table", {
      className: classNames('check-calendar__table', tableClassName)
    }, createElement("thead", null), createElement("tbody", null, createElement("tr", {
      className: "check-calendar__header"
    }, createElement("td", {
      className: classNames(headerClassName)
    }), dates.map(function (current) {
      return createElement("td", {
        key: current.format('YYYY_MM_DD'),
        className: classNames(headerClassName, {
          'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(current.day())
        })
      }, createElement(ColumnDate, {
        date: current
      }));
    })), hoursIntervals && hoursIntervals.map(function (row) {
      return createElement("tr", {
        key: row.start + "_" + row.end
      }, createElement(RowHeader, {
        interval: row
      }), dates.map(function (day) {
        var interval = {
          start: getMomentFromNumber(day, row.start),
          end: getMomentFromNumber(day, row.end)
        };
        return createElement("td", {
          key: day.format('YYYY_MM_DD') + "_" + row.start + "_" + row.end,
          className: classNames(contentClassName, {
            'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(day.day())
          })
        }, createElement(Checkbox, {
          interval: interval,
          onChange: _this2._handleChange,
          checked: !!checked.find(function (c) {
            return isInInterval(c, interval);
          }),
          value: "off"
        }));
      }));
    }))))));
  };

  return CheckCalendar;
}(Component);

CheckCalendar.defaultProps = defaultProps;

export { CheckCalendar, Left as LeftIcon, Right as RightIcon, defaultProps };
//# sourceMappingURL=index.modern.js.map
