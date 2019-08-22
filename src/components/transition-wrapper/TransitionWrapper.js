import React, { useState, useEffect } from 'react';
import './TransitionWrapper.scss';

const TransitionWrapper = props => {
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageTransition(true);
    }, 100)
  }, []);

  return (
    <div className={`transition-wrapper ${pageTransition ? 'active' : ''}`}>
      <h1 className="title">{props.title ? props.title : ''}</h1>
      {props.children}
    </div>
  )
}

export default TransitionWrapper;