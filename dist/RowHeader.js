import * as React from 'react';
import { getDatesFormats, getMomentFromNumber } from "./helpers";
import HTMLParser from "html-react-parser";
import CheckContext from "./context";
import moment from "moment";
import classNames from "classnames";
var RowHeader = function (_a) {
    var interval = _a.interval;
    var props = React.useContext(CheckContext).props;
    var start = interval.start, end = interval.end;
    var _b = getDatesFormats(props), fromHour = _b.fromHour, toHour = _b.toHour;
    if (props.renderRowHeader) {
        return props.renderRowHeader(interval);
    }
    return (React.createElement("td", { className: classNames('check-calendar__row-header', props.headerRowClassName) },
        React.createElement("div", { className: "check-calendar__hour" },
            start && HTMLParser("<span>" + (getMomentFromNumber(moment(), start).format(fromHour)
                .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>"),
            end && HTMLParser("<span>" + (getMomentFromNumber(moment(), end).format(toHour)
                .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || '') + "</span>"))));
};
export default RowHeader;
//# sourceMappingURL=RowHeader.js.map