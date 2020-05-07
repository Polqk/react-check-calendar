import * as React from 'react';
import './checkbox.css';
import { MomentRange } from "../types";
export declare type CheckBoxChangeHandler = (value: boolean, props: Props) => void;
declare type CheckboxProps = {
    ref?: any;
    onChange: CheckBoxChangeHandler;
    interval: MomentRange;
};
declare type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
declare type Props = CheckboxProps & InputProps;
declare const Checkbox: React.FC<Props>;
export default Checkbox;
