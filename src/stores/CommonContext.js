import React, { useState, createContext } from 'react';

const CommonContext = createContext([{}, () => {}]);

const CommonProvider = props => {
  const [state, setState] = useState({
    toast: [],
    logs: ['[Action Log] Action Log Display Mounted'],
  });

  const actions = {
    addToast: toastItem => {
      if (state.toast.length > 3) {
        setState({
          ...state,
          toast: [
            ...state.toast.slice(1),
            toastItem,
          ],
          logs: [
            ...state.logs,
            `[Toast : addToast] ${toastItem.message}`
          ]
        });
      } else {
        setState({
          ...state,
          toast: [
            ...state.toast,
            toastItem,
          ],
          logs: [
            ...state.logs,
            `[Toast : addToast] ${toastItem.message}`
          ]
        });
      }
    },
    addLog: log => {
      setState({...state, logs: [...state.logs, log]});
    },
    clearLog: () => {
      setState({...state, logs: ['[Action Log] Clear Logs']});
    }
  };

  return (
    <CommonContext.Provider value={[state, actions]}>
      {props.children}
    </CommonContext.Provider>
  )
};

export { CommonContext, CommonProvider };