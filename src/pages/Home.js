import React from 'react';
import './Pages.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';
import config from 'components/ui.config';
import IcArrow from 'assets/IcArrow';
import IcMopsy from 'assets/ic_mopsy.svg';
import IcGithub from 'assets/github.png';
import IcFb from 'assets/fb.png';

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

  const toUrl = url => {
    window.open(url);
  }

  return (
    <TransitionWrapper location={props.location}>
      <div className="home-container">
        <div className="introduction">
          <img src={IcMopsy} alt="mopsy" className="logo"/>
          <p className="title">UI Gallery</p>
          <p className="author">
            By Mopsy
          </p>
          <div className="social">
            <img src={IcGithub} alt="github"
                 className="btn-social"
                 onClick={() => {toUrl('https://github.com/mopsyshin/mopsy-ui-gallery')}}/>
            <img src={IcFb} alt="facebook"
                 className="btn-social"
                 onClick={() => {toUrl('https://www.facebook.com/mopsyshin')}}/>
          </div>
        </div>
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