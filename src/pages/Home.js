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
      return (
        <div className="nav-item" onClick={() => {selectNav(value.path)}} key={key}>
          {value.name}
          <div className="ic-arrow">
            <IcArrow/>
          </div>
        </div>
      );
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

export default Home;