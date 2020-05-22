import * as React from 'react';
import {CheckCalendarProps, CheckCalendarState, MomentRange} from "./types";
import LeftIcon from "./Left";
import RightIcon from "./Right";
import classNames from "classnames";
import { defaultProps } from "./defaults";
import { CheckContextProvider } from "./context";
import RowHeader from "./RowHeader";
import moment from "moment";
import ColumnDate from "./ColumnDate";
import {getArrayDates, getMomentFromNumber, getMomentsFromRange, isInInterval} from "./helpers";
import Checkbox, {CheckBoxChangeHandler} from "./CheckBox";

import './styles.css';

class CheckCalendar extends React.Component<CheckCalendarProps, CheckCalendarState> {
  static defaultProps = defaultProps;

  state = {
    loading: false,
    currentDate: moment(this.props.start).set('day', this.props.startWeekDay || 1),
    checkedRanges: []
  };

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

    const { loading, currentDate, checkedRanges } = this.state;
    const dates = getArrayDates(currentDate, 7);
    const checked = Array.isArray(checkedDates) ? checkedDates : checkedRanges;

    const prevDisabled = loading || (!!min && dates[0].clone().set('hour', 0).isBefore(moment(min)));
    const nextDisabled = loading || (!!max && dates[dates.length - 1].clone().set('hour', 23).isAfter(moment(max)));

    console.log('max', (!!max && dates[dates.length - 1].clone().set('hour', 23).isAfter(moment(max))), 'min', !!min && dates[0].clone().set('hour', 0).isBefore(moment(min)));

    return (
      <CheckContextProvider value={{ props: this.props }}>
        <div className={classNames('check-calendar', containerClassName)}>
          <button
            className={classNames(
              'check-calendar__button check-calendar__prev',
              leftButton?.className
            )}
            disabled={prevDisabled}
            onClick={this._handlePrevious}
          >
            {leftButton?.content || <LeftIcon />}
          </button>
          <button
            className={classNames(
              'check-calendar__button check-calendar__next',
              rightButton?.className
            )}
            disabled={nextDisabled}
            onClick={this._handleNext}
          >
            {rightButton?.content || <RightIcon/>}
          </button>
          <div
            className={classNames('check-calendar__container', {
              'check-calendar__container--hide': loading
            })}
            ref="calendar"
          >
            <table className={classNames('check-calendar__table', tableClassName)} >
              <thead />
              <tbody>
              <tr className="check-calendar__header">
                <td
                  key="header_empty"
                  className={classNames(headerClassName)}
                />
                {dates.map((current) => (
                  <td
                    key={`check-calendar-header-${current.format('YYYY_MM_DD')}`}
                    className={classNames(headerClassName, { 'check-calendar__hidden': hideDays?.includes(current.day()) })}
                  >
                    <ColumnDate date={current} />
                  </td>
                ))}
              </tr>
              {hoursIntervals && hoursIntervals.map((row) => (
                <tr key={`${row.start}_${row.end}`}>
                  <RowHeader interval={row} />
                  {dates.map(day => {
                    const interval = {
                      start: getMomentFromNumber(day, row.start),
                      end: getMomentFromNumber(day, row.end)
                    };

                    return (
                      <td
                        key={`${day.format('YYYY_MM_DD')}_${interval.start}_${interval.end}`}
                        className={classNames(contentClassName, { 'check-calendar__hidden': hideDays?.includes(day.day()) })}
                      >
                        <Checkbox
                          interval={interval}
                          onChange={this._handleChange}
                          checked={!!(checked).find(c => isInInterval(c, interval))}
                          value="off"
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </CheckContextProvider>
    );
  }

  _handlePrevious = () => {
    this.setState({ loading:true });
    setTimeout(() => {
      this.setState({
        loading:false,
        currentDate: this.state.currentDate.subtract(7, 'days')
      }, this.props.onPreviousClick);

    }, 400);

  };

  _handleNext = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        loading: false,
        currentDate: this.state.currentDate.add(7, 'days')
      }, this.props.onNextClick);
    }, 400);
  };

  _handleChange: CheckBoxChangeHandler = ( value, props) => {
    const { checkedRanges } = this.state;
    const { interval } = props;
    const { onChange, checkedDates } = this.props;
    let newChecked = [...(Array.isArray(checkedDates) ? checkedDates : checkedRanges)];

    if (value) {
      newChecked.push(interval);
    } else {
      const foundIndex = newChecked.findIndex((c) => isInInterval(c, interval));

      if (foundIndex > -1) {
        newChecked.splice(foundIndex, 1);
      }
    }

    newChecked = newChecked.map(i => getMomentsFromRange(i));

    if (onChange) {
      onChange({
        dates: (newChecked as MomentRange[]).map(i => ({ start: i.start.toDate(), end: i.end.toDate() })) ,
        moments: newChecked as MomentRange[]
      })
    }

    if (!Array.isArray(checkedDates)) {
      this.setState({ checkedRanges: newChecked as MomentRange[] });
    }
  };

}

export {
  CheckCalendar as default,
  CheckCalendar,
  CheckCalendarProps,
  defaultProps,
  LeftIcon,
  RightIcon,
  Checkbox
}
