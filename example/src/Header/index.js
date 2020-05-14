import React from 'react';

import './header.css';
import { CheckCalendar } from 'react-check-calendar';

export default () => (
  <header>
    <h1>React check calendar</h1>
    <div>
      <CheckCalendar
        leftButton={{ className: 'white' }}
        rightButton={{ className: 'white'}}
      />
    </div>
  </header>
);
