import { createElement, createContext, useContext, Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import HTMLParser from 'html-react-parser';
import Moment from 'react-moment';

const Left = () => createElement("svg", {
  height: 30,
  viewBox: "0 0 320 512"
}, createElement("path", {
  d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49\n      256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-\n      9.37-9.37-9.37-24.57 0-33.94z"
}));

const Right = () => createElement("svg", {
  height: 30,
  viewBox: "0 0 320 512"
}, createElement("path", {
  d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522\n      -.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373\n       33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
}));

const defaultProps = {
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
const defaultContext = {
  props: defaultProps
};
const defaultDatesFormats = {
  fromHour: '[from] [<strong>]h:mm[</strong>][<small>]a[</small>]',
  toHour: ' [to] [<strong>]h:mm[</strong>][<small>]a[</small>]'
};

const CheckContext = createContext(defaultContext);
const CheckContextProvider = CheckContext.Provider;

const getMomentFromNumber = (date, value) => {
  const trunced = Math.trunc(value);
  return date.clone().set('hour', trunced).set('minutes', (value - trunced) * 60).set('second', 0).set('millisecond', 0);
};
const getDatesFormats = props => ({ ...defaultDatesFormats,
  ...props.datesFormats
});
const getArrayDates = (start, count) => {
  const dates = [];
  const clonedStart = start.clone().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

  for (let i = 0; i < count; i++) {
    dates.push(clonedStart.clone().add(i, 'day'));
  }

  return dates;
};
const isInInterval = (interval1, interval2) => {
  const {
    start,
    end
  } = getMomentsFromRange(interval1);
  const {
    start: start2,
    end: end2
  } = getMomentsFromRange(interval2);
  return start.isSame(start2, "minute") || end.isSame(end2, "minute") || start.isBetween(start2, end2, 'minutes', '()') || end.isBetween(start2, end2, 'minutes', '()');
};
const getMomentsFromRange = interval => ({
  start: getMomentFromDate(interval.start),
  end: getMomentFromDate(interval.end)
});
const getMomentFromDate = date => date instanceof moment ? date : moment(date);

const RowHeader = ({
  interval
}) => {
  const {
    props
  } = useContext(CheckContext);
  const {
    start,
    end
  } = interval;
  const {
    fromHour,
    toHour
  } = getDatesFormats(props);

  if (props.renderRowHeader) {
    return props.renderRowHeader(interval);
  }

  return createElement("td", {
    className: classNames('check-calendar__row-header', props.headerRowClassName)
  }, createElement("div", {
    className: "check-calendar__hour"
  }, start && HTMLParser(`<span>${getMomentFromNumber(moment(), start).format(fromHour).replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || ''}</span>`), end && HTMLParser(`<span>${getMomentFromNumber(moment(), end).format(toHour).replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || ''}</span>`)));
};

const ColumnDate = ({
  date
}) => {
  const {
    props
  } = useContext(CheckContext);

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

const Checkbox = ({
  interval,
  ...props
}) => {
  const {
    props: {
      disableBefore,
      disableAfter,
      disabledDates
    }
  } = useContext(CheckContext);

  const _handleChange = e => {
    const value = e.target.checked;
    props.onChange(value, { ...props,
      checked: value,
      value: value ? 0 : 1,
      interval
    });
  };

  const isBeforeDisabled = disableBefore ? interval.end.isBefore(getMomentFromDate(disableBefore)) : false;
  const isAfterDisabled = disableAfter ? interval.start.isAfter(getMomentFromDate(disableAfter)) : false;
  const isDisabledDate = Array.isArray(disabledDates) ? disabledDates.some(d => getMomentFromDate(d).isBetween(interval.start, interval.end)) : false;
  const disabled = props.disabled || isBeforeDisabled || isAfterDisabled || isDisabledDate;
  return createElement("label", {
    className: classNames('check-calendar-checkbox__wrapper', {
      disabled
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

class CheckCalendar extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading: false,
      currentDate: moment(this.props.start).set('day', this.props.startWeekDay || 1),
      checkedRanges: []
    };

    this._handlePrevious = () => {
      this.setState({
        loading: true
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          currentDate: this.state.currentDate.clone().subtract(7, 'days')
        }, this.props.onPreviousClick);
      }, 400);
    };

    this._handleNext = () => {
      this.setState({
        loading: true
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          currentDate: this.state.currentDate.clone().add(7, 'days')
        }, this.props.onNextClick);
      }, 400);
    };

    this._handleChange = (value, props) => {
      const {
        checkedRanges
      } = this.state;
      const {
        interval
      } = props;
      const {
        onChange,
        checkedDates
      } = this.props;
      let newChecked = [...(Array.isArray(checkedDates) ? checkedDates : checkedRanges)];

      if (value) {
        newChecked.push(interval);
      } else {
        const foundIndex = newChecked.findIndex(c => isInInterval(c, interval));

        if (foundIndex > -1) {
          newChecked.splice(foundIndex, 1);
        }
      }

      newChecked = newChecked.map(i => getMomentsFromRange(i));

      if (onChange) {
        onChange({
          dates: newChecked.map(i => ({
            start: i.start.toDate(),
            end: i.end.toDate()
          })),
          moments: newChecked
        });
      }

      if (!Array.isArray(checkedDates)) {
        this.setState({
          checkedRanges: newChecked
        });
      }
    };
  }

  render() {
    const {
      hoursIntervals,
      hideDays,
      max,
      min,
      checkedDates,
      leftButton,
      rightButton,
      containerClassName,
      tableClassName,
      headerClassName,
      contentClassName
    } = this.props;
    const {
      loading,
      currentDate,
      checkedRanges
    } = this.state;
    const dates = getArrayDates(currentDate, 7);
    const checked = Array.isArray(checkedDates) ? checkedDates : checkedRanges;
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
    }), dates.map(current => {
      return createElement("td", {
        key: current.format('YYYY_MM_DD'),
        className: classNames(headerClassName, {
          'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(current.day())
        })
      }, createElement(ColumnDate, {
        date: current
      }));
    })), hoursIntervals && hoursIntervals.map(row => createElement("tr", {
      key: `${row.start}_${row.end}`
    }, createElement(RowHeader, {
      interval: row
    }), dates.map(day => {
      const interval = {
        start: getMomentFromNumber(day, row.start),
        end: getMomentFromNumber(day, row.end)
      };
      return createElement("td", {
        key: `${day.format('YYYY_MM_DD')}_${row.start}_${row.end}`,
        className: classNames(contentClassName, {
          'check-calendar__hidden': hideDays === null || hideDays === void 0 ? void 0 : hideDays.includes(day.day())
        })
      }, createElement(Checkbox, {
        interval: interval,
        onChange: this._handleChange,
        checked: !!checked.find(c => isInInterval(c, interval)),
        value: "off"
      }));
    }))))))));
  }

}

CheckCalendar.defaultProps = defaultProps;

export { CheckCalendar, Left as LeftIcon, Right as RightIcon, defaultProps };
//# sourceMappingURL=index.modern.js.map
