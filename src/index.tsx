import * as React from 'react';
import {CheckCalendarProps, CheckCalendarState, MomentRange} from "./types";
import Left from "./Left";
import Right from "./Right";
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
    const { hoursIntervals, hideDays, max, min, disableBefore, disableAfter, checkedDates } = this.props;
    const { loading, currentDate, checkedRanges } = this.state;
    const dates = getArrayDates(currentDate, 7);
    const checked = Array.isArray(checkedDates) ? checkedDates : checkedRanges;

    return (
      <CheckContextProvider value={{ props: this.props }}>
        <div className="check-calendar">
          <button
            className="check-calendar__button check-calendar__prev"
            disabled={!!min && dates[0].clone().subtract(1, 'day').isBefore(moment(min))}
            onClick={this._handlePrevious}
          >
            <Left/>
          </button>
          <button
            className="check-calendar__button check-calendar__next"
            disabled={!!max && dates[dates.length - 1].clone().add(1, 'day').isAfter(moment(max))}
            onClick={this._handleNext}
          >
            <Right/>
          </button>
          <div
            className={classNames('check-calendar__container', {'check-calendar__container--hide': loading})}
            ref="calendar"
          >
            <table className="check-calendar__table">
              <thead/>
              <tbody>
              <tr className="check-calendar__header">
                <td
                  className="check-calendar__header"
                />
                {dates.map((current) => {
                    return (
                      <td
                        key={current.format('YYYY_MM_DD')}
                        className={classNames({ 'check-calendar__hidden': hideDays?.includes(current.day()) })}
                      >
                        <ColumnDate date={current} />
                      </td>
                    );
                  })}
              </tr>
              {hoursIntervals && hoursIntervals.map((row) => (
                <tr key={`${row.start}_${row.end}`}>
                  <RowHeader item={row} />
                  {dates.map(day => {
                    const interval = {
                      start: getMomentFromNumber(day, row.start),
                      end: getMomentFromNumber(day, row.end)
                    };

                    const isBeforeDisabled = disableBefore ? interval.end.isBefore(moment(disableBefore)) : false;
                    const isAfterDisabled = disableAfter ? interval.start.isAfter(moment(disableAfter)) : false;

                    return (
                      <td
                        key={`${day.format('YYYY_MM_DD')}_${row.start}_${row.end}`}
                        className={classNames({ 'check-calendar__hidden': hideDays?.includes(day.day()) })}
                      >
                        <Checkbox
                          interval={interval}
                          onChange={this._handleChange}
                          disabled={isBeforeDisabled || isAfterDisabled}
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
        currentDate: this.state.currentDate.clone().subtract(7, 'days')
      });

    }, 400);

  };

  _handleNext = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        loading: false,
        currentDate: this.state.currentDate.clone().add(7, 'days')
      });
    }, 400);
  };

  _handleChange: CheckBoxChangeHandler = ( value, props) => {
    const { checkedRanges } = this.state;
    const { interval } = props;
    const { onChange, checkedDates } = this.props;
    let newChecked = [...Array.isArray(checkedDates) ? checkedDates : checkedRanges];
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
      });

    }

    if (!Array.isArray(checkedDates)) {
      this.setState({ checkedRanges: newChecked as MomentRange[] });
    }
  };

}

export {
  CheckCalendar,
  CheckCalendarProps,
  defaultProps,
};
