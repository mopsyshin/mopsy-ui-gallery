import React from 'react';
import './Pages.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';
import config from 'components/ui.config';
import IcArrow from 'assets/IcArrow';

const Home = props => {
  const navArr = Object.entries(config);

  const selectNav = path => {
    props.history.push(`ui/${path}`);
  }

  const renderNav = () => {
    return navArr.map(([key, value], index) => {
      return <HomeNavItem key={key} value={value} onClick={selectNav}/>
    });
  };

  return (
    <TransitionWrapper title="Mopsy UI Gallery" location={props.location}>
      <div className="home-container">
        <div className="mobile-nav">
          {renderNav()}
        </div>
      </div>
    </TransitionWrapper>
  )
}

const HomeNavItem = props => {

  const wip = () => {
    if (props.value.wip) {
      return <p className="wip">Work in progress</p>
    }
  }

  return (
    <div className="nav-item" onClick={() => {props.onClick(props.value.path)}}>
      <div>
        <p>{props.value.name}</p>
        {wip()}
      </div>
      
      <div className="ic-arrow">
        <IcArrow/>
      </div>
    </div>
  );
}

export default Home;