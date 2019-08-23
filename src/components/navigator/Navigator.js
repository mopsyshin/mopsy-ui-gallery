import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navigator.scss';
import config from 'components/ui.config';
import { CommonContext } from 'stores/CommonContext';

const Navigator = props => {
  const renderNav = () => {
    const arr = Object.entries(config);
    return arr.map(([key, value]) => {
      return (
        <NavItem key={key} value={value} location={props.location}/>
      )
    })
  }

  return (
    <div className="nav-container">
      <div className="top-gradient"></div>
      <div className="bottom-gradient"></div>
      <div className="nav-list">
        <div className="blank-item"></div>
        {renderNav()}
        <div className="blank-item"></div>
      </div>
    </div>
  )
}

const NavItem = props => {
  const [isActive, setIsActive] = useState(false);
  const [state, actions] = useContext(CommonContext);

  useEffect(() => {
    if (props.location.pathname === `/ui/${props.value.path}`) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [props.location]);

  return (
    <div className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link to={`/ui/${props.value.path}`}>{props.value.name}</Link>
    </div>
  )
}

export default Navigator;