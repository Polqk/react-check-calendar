import * as React from 'react'
import Code from '../Code'
import CheckCalendar from 'react-check-calendar';
import moment from 'moment';

const code = `import React from 'react';
import CheckCalendar from 'react-check-calendar';
import 'react-check-calendar/dist/index.css';
import moment from 'moment';

const Controlled = () => {
  const [selected, setSelected] = React.useState([]);
  
  const nextWeek = moment().add(1, 'week');
  const prevWeek = moment().subtract(1, 'week');
  return (
    <CheckCalendar
      checkedDates={selected}
      onChange={({ moments, dates }) => setSelected(moments)}
      max={ nextWeek }
      min={ nextWeek }
      disableAfter={ nextWeek }
      disableBefore={ prevWeek }
    />
  );
};

export default Controlled;
`

const Controlled = () => {
  const [selected, setSelected] = React.useState([]);
  const nextWeek = moment().add(1, 'week');
  const prevWeek = moment().subtract(1, 'week');

  return (
    <section id="controlled">
      <h2>Controlled</h2>
      <div className="example-container">
        <div>
          <CheckCalendar
            checkedDates={selected}
            onChange={({ moments }) => setSelected(moments)}
            max={ nextWeek }
            min={ prevWeek }
            disableAfter={ nextWeek }
            disableBefore={ prevWeek }
            // TODO: disabled dates modification, ranges accept
          />
        </div>
        <div>
          <Code text={code}/>
        </div>
      </div>
    </section>
  )
}

export default Controlled
