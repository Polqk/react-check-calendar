import * as React from 'react';
import {HourInterval} from "./types";
import {getDatesFormats, getMomentFromNumber} from "./helpers";
import HTMLParser from "html-react-parser";
import CheckContext from "./context";
import moment from "moment";

interface Props {
  item: HourInterval;
}

const RowHeader: React.FC<Props> = ({ item }) => {
  const { props } = React.useContext(CheckContext);
  const { start, end } = item;
  const { fromHour, toHour } = getDatesFormats(props);

  return (
      <td className="check-calendar__row-header">
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
