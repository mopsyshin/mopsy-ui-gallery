import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './Toast.scss';
import { UiContext } from 'stores';

const Toast = props => {
  const store = useContext(UiContext);

  const renderToastItem = () => {
    return store.toast.map(item => {
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
  const store = useContext(UiContext);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 1000);
    setTimeout(() => {
      store.removeFirstToast();
    }, 1500);
  }, [store])

  return (
    <div className={`toast-item ${hidden ? 'hidden' : ''}`}>
      {props.item.message}
    </div>
  )
}

export default observer(Toast);