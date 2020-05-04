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
import * as React from 'react';
import './checkbox.css';
import classNames from 'classnames';
var Checkbox = function (props) {
    var _handleChange = function (e) {
        var value = e.target.checked;
        if (props.onChange) {
            props.onChange(value, __assign(__assign({}, props), { checked: value, value: value ? 0 : 1 }));
        }
    };
    return (React.createElement("label", { className: classNames('check-calendar-checkbox__wrapper', { disabled: props.disabled }, props.className) },
        React.createElement("span", { className: "check-calendar-checkbox" },
            React.createElement("input", __assign({}, props, { onChange: _handleChange, className: classNames('check-calendar-checkbox__input'), type: "checkbox" })),
            React.createElement("span", { className: "check-calendar-checkbox__inner" }))));
};
export default Checkbox;
//# sourceMappingURL=index.js.map