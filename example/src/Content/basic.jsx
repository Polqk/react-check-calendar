import React from 'react';
import { CheckCalendar } from 'react-check-calendar';
import Code from '../Code';

const basic = `import React from 'react';
import { CheckCalendar } from 'react-check-calendar';
import 'react-check-calendar/dist/index.css';

const Basic = () => (
   <CheckCalendar />
);

export default Basic;
`;

const Basic = () => (
  <section id="basic-example">
    <h2>Basic Example</h2>
    <div className="example-container">
      <div>
        <CheckCalendar />
      </div>
      <div>
        <Code text={ basic } />
      </div>
    </div>
  </section>
);

export default Basic;
