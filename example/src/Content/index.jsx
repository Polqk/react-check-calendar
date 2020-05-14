import React from 'react';

import Installation from './installation';
import Introduction from './introduction';
import Basic from './basic';
import Parameters from './parameters';

const Content = () => {
  return (
    <main>
      <Introduction />
      <Installation />
      <Basic />
      <Parameters />
    </main>
  );
};

export default Content;
