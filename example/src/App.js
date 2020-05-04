import React from 'react'

import { CheckCalendar } from 'react-check-calendar';
import 'react-check-calendar/dist/index.css';
import moment from 'moment';

const App = () => {
  const [dates, setDates] = React.useState([{ moments: { start: moment().set('hour', 16), end: new Date() }}]);
  return (
    <div>
      <div className="container">
        <CheckCalendar
          max={new Date()}
          onChange={(dates) => setDates(dates)}
          checkedDates={dates.moments}
        />
      </div>
    </div>

  )
};

export default App
