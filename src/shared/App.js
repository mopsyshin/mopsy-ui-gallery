import React from "react";
import { Route, Link } from "react-router-dom";
import Navigator from "components/navigator/Navigator";
import ActionLog from "components/action-log/ActionLog";
import imgFrame from "assets/frame.png";
import { Home, Intro, UiPage } from "pages/index";
import "styles/index.scss";

const App = () => {
  return (
    <div className="App">
      <div className="main-container">
        <LeftSide />
        <Frame />
        <ActionLog />
      </div>
    </div>
  );
};

const Frame = () => {
  return (
    <div className="frame-container">
      <img src={imgFrame} alt="frame" className="img-frame" />
      <div className="inner-frame">
        <Route exact path="/" component={Home} />
        <Route exact path="/intro" component={Intro} />
        <Route path="/ui/:name" component={UiPage} />
      </div>
    </div>
  );
};

const LeftSide = () => {
  return (
    <div className="left-side">
      <Link to="/" className="title">
        UI Gallery
      </Link>
      <p className="author">by Mopsy</p>
      <Route path="/" component={Navigator} />
    </div>
  );
};

export default App;
