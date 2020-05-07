import * as React from 'react';
import './checkbox.css';
import classNames from 'classnames';
import {MomentRange} from "../types";
import {getMomentFromDate} from "../helpers";
import CheckContext from "../context";

export type CheckBoxChangeHandler = (value: boolean, props: Props) => void;
type CheckboxProps = {
  ref?: any;
  onChange: CheckBoxChangeHandler;
  interval: MomentRange;
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
type Props = CheckboxProps & InputProps;

const Checkbox: React.FC<Props> = ({interval, ...props}) => {
  const {props: { disableBefore, disableAfter, disabledDates } } = React.useContext(CheckContext);

  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    props.onChange(value, {...props, checked: value, value: value ? 0 : 1, interval })
  };

  const isBeforeDisabled = disableBefore ? interval.end.isBefore(getMomentFromDate(disableBefore)) : false;
  const isAfterDisabled = disableAfter ? interval.start.isAfter(getMomentFromDate(disableAfter)) : false;
  const isDisabledDate = Array.isArray(disabledDates)
    ? disabledDates.some(d => getMomentFromDate(d).isBetween(interval.start, interval.end))
    : false;

  const disabled = props.disabled || isBeforeDisabled || isAfterDisabled || isDisabledDate;
  return (
    <label className={classNames('check-calendar-checkbox__wrapper', { disabled }, props.className)}>
      <span className="check-calendar-checkbox">
        <input
          {...props}
          onChange={_handleChange}
          className={classNames('check-calendar-checkbox__input')}
          type="checkbox"
          disabled={disabled}
        />
      <span className="check-calendar-checkbox__inner" />
    </span>
    </label>
  );
}

export default Checkbox;
