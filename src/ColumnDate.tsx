import * as React from 'react';
import Moment from "react-moment";
import * as moment from "moment";
import CheckContext from "./context";

interface Props {
  date: moment.Moment;
}

const ColumnDate: React.FC<Props> = ({ date }) => {
  const { props } = React.useContext(CheckContext);

  if (props.renderColumnHeader) {
    return props.renderColumnHeader(date);
  }

  return (
    <div>
      <div>
        <Moment
          className="check-calendar_day"
          locale={props?.locale}
          format="ddd"
        >
          {date}
        </Moment>
      </div>
      <div>
        <Moment
          className="check-calendar__day-number"
          locale="fr"
          format="DD"
        >
          {date}
        </Moment>
      </div>
      <div>
        <Moment
          className="check-calendar__month"
          locale="fr"
          format="MMM"
        >
          {date}
        </Moment>
      </div>
      <div
        // class="d-optionDetails"
      />
    </div>
  );
}

export default ColumnDate;
