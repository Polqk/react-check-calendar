import * as React from 'react';
import {HourInterval} from "./types";
import {getDatesFormats, getMomentFromNumber} from "./helpers";
import HTMLParser from "html-react-parser";
import CheckContext from "./context";
import moment from "moment";
import classNames from "classnames";

interface Props {
  interval: HourInterval;
}

const RowHeader: React.FC<Props> = ({ interval }) => {
  const { props } = React.useContext(CheckContext);
  const { start, end } = interval;
  const { fromHour, toHour } = getDatesFormats(props);

  if (props.renderRowHeader) {
    return props.renderRowHeader(interval);
  }

  return (
      <td className={classNames('check-calendar__row-header', props.headerRowClassName)}>
        <div className="check-calendar__hour">
          {start && HTMLParser(`<span>${
            getMomentFromNumber(moment(), start).format(fromHour)
              .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || ''}</span>`)}
          {end && HTMLParser(`<span>${
            getMomentFromNumber(moment(), end).format(toHour)
              .replace(fromHour.charAt(fromHour.indexOf('mm') - 1) + '00', '') || ''
          }</span>`)}
        </div>
      </td>
  )
}

export default RowHeader;
