import * as React from 'react';
import Moment from "react-moment";
import CheckContext from "./context";
var ColumnDate = function (_a) {
    var date = _a.date;
    var props = React.useContext(CheckContext).props;
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(Moment, { className: "check-calendar_day", locale: props === null || props === void 0 ? void 0 : props.locale, format: "ddd" }, date)),
        React.createElement("div", null,
            React.createElement(Moment, { className: "check-calendar__day-number", locale: "fr", format: "DD" }, date)),
        React.createElement("div", null,
            React.createElement(Moment, { className: "check-calendar__month", locale: "fr", format: "MMM" }, date)),
        React.createElement("div", null)));
};
export default ColumnDate;
//# sourceMappingURL=ColumnDate.js.map