import React from 'react';
import { CheckCalendar } from 'react-check-calendar';
import GitHubLogo from './GitHub'

import './header.css';

export default () => (
  <header>
    <h1>React check calendar</h1>
    <GitHubLogo />
    <div>
      <CheckCalendar
        leftButton={{ className: 'white' }}
        rightButton={{ className: 'white'}}
      />
    </div>
  </header>
);
