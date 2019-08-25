import React, { useState, useEffect } from 'react';
import './TransitionWrapper.scss';

const TransitionWrapper = props => {
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    setPageTransition(false);
    setTimeout(() => {
      setPageTransition(true);
    }, 50)
  }, [props.location]);

  const openCode = () => {
    const baseUrl = 'https://github.com/mopsyshin/mopsy-ui-gallery/blob/master/src/components';
    window.open(`${baseUrl}${props.location.pathname}`);
  }
  return (
    <div className={`transition-wrapper ${pageTransition ? 'active' : ''}`}>
      <div className="header">
        <h1 className="title">{props.title ? props.title : ''}</h1>
        <button className="btn-action" onClick={openCode}>Show Code</button>
      </div>
      {props.children}
    </div>
  )
}

export default TransitionWrapper;