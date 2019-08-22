import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { CommonProvider } from 'stores/CommonContext';
import './App.scss';
import Navigator from 'components/navigator/Navigator';
import imgFrame from 'assets/frame.png';
import { Home, Intro, UiPage } from 'pages/index';

const App = props => {
  return (
    <CommonProvider>
      <div className="App">
        <div className="main-container">
          <LeftSide/>
          <div className="frame">
            <img src={imgFrame} alt="frame" className="img-frame"/>
            <div className="inner-frame">
              <Route exact path="/" component={Home}/>
              <Route exact path="/intro" component={Intro}/>
              <Route path="/ui/:name" component={UiPage} />
            </div>
          </div>
        </div>
      </div>
    </CommonProvider>
  );
}

const LeftSide = props => {
  return (
    <div className="left-side">
      <Link to="/" className="title">UI Gallery</Link>
      <p>by Mopsy</p>
      <Navigator/>
    </div>
  )
}

export default App;
