import React, { useState, createContext } from 'react';

const CommonContext = createContext([{}, () => {}]);

const CommonProvider = props => {
  const [state, setState] = useState({
    toast: [],
  });

  const actions = {
    addToast: toastMessage => {
      const newArr = state.toast.slice();
      newArr.push(toastMessage);
      setState({...state, toast: newArr});
      setTimeout(() => {
        actions.removeToast();
      }, 1000);
    },
    removeToast: index => {
      const newArr = state.toast.slice(1);
      setState({...state, toast: newArr});
    },
  };

  return (
    <CommonContext.Provider value={[state, actions]}>
      {props.children}
    </CommonContext.Provider>
  )
};

export { CommonContext, CommonProvider };