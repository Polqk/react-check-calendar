import React from 'react'
import 'react-check-calendar/dist/index.css';
import Header from './Header';
import Nav from './Nav';
import Content from './Content';
import { BackTop } from 'antd';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Nav />
        <Content />
      </div>
      <BackTop />
    </div>
  )
};

export default App
