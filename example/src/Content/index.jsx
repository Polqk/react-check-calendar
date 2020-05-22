import React from 'react';

import Installation from './installation';
import Introduction from './introduction';
import Basic from './basic';
import Parameters from './parameters';
import Controlled from './controlled';

const Content = () => {
  return (
    <main>
      <Introduction />
      <Installation />
      <Basic />
      <Parameters />
      <Controlled />
    </main>
  );
};

export default Content;
