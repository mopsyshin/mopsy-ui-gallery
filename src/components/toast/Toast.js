import React, { useState, useContext, useEffect } from 'react';
import './Toast.scss';
import { CommonContext } from 'stores/CommonContext';

const Toast = props => {
  const [state, actions] = useContext(CommonContext);

  const renderToastItem = () => {
    return state.toast.map(item => {
      return <ToastItem item={item} key={item.id}/>
    })
  }

  return (
    <div className="toast-manager">
      {renderToastItem()}
    </div>
  )
}

const ToastItem = props => {
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 1000);
  }, [])

  return (
    <div className={`toast-item ${hidden ? 'hidden' : ''}`}>
      {props.item.message}
    </div>
  )
}

export default Toast;