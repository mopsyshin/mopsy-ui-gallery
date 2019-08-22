import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigator.scss';
import config from '../ui.config';

const Navigator = props => {
  const renderNav = () => {
    const arr = Object.entries(config);
    return arr.map(([key, value]) => {
      return (
        <div className="nav-item" key={key}>
          <Link to={`/ui/${value.path}`}>{value.name}</Link>
        </div>
      )
    })
  }

  return (
    <div className="nav-container">
      <div className="top-gradient"></div>
      <div className="bottom-gradient"></div>
      {renderNav()}
    </div>
  )
}

export default Navigator;