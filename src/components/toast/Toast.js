import React, { useContext } from 'react';
import './Toast.scss';
import { CommonContext } from 'stores/CommonContext';

const Toast = props => {
  const [state, actions] = useContext(CommonContext);

  const renderToastItem = () => {
    return state.toast.map((message, index) => {
      return <ToastItem message={message} key={index}/>
    })
  }

  return (
    <div className="toast-manager">
      {renderToastItem()}
    </div>
  )
}

const ToastItem = props => {
  return (
    <div className="toast-item">
      {props.message}
    </div>
  )
}

export default Toast;