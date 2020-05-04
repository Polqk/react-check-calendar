import * as React from 'react';
import './checkbox.css';
import classNames from 'classnames';
import {MomentRange} from "../types";

export type CheckBoxChangeHandler = (value: boolean, props: Props) => void;
type CheckboxProps = {
  ref?: any;
  onChange?: CheckBoxChangeHandler;
  interval: MomentRange;
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
type Props = CheckboxProps & InputProps;

const Checkbox: React.FC<Props> = (props) => {
  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    if (props.onChange) {
      props.onChange(value, {...props, checked: value, value: value ? 0 : 1 })
    }
  };
  return (
    <label className={classNames('check-calendar-checkbox__wrapper', { disabled: props.disabled }, props.className)}>
      <span className="check-calendar-checkbox">
        <input
          {...props}
          onChange={_handleChange}
          className={classNames('check-calendar-checkbox__input')}
          type="checkbox"
        />
      <span className="check-calendar-checkbox__inner" />
    </span>
    </label>
  );
}

export default Checkbox;
