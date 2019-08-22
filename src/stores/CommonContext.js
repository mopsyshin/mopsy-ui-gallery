import React, { useState, createContext } from 'react';

const CommonContext = createContext([{}, () => {}]);

const CommonProvider = props => {
  const [state, setState] = useState({
    user: {
      name: 'mopsy',
      age: 13,
    }
  });

  const actions = {
    updateUser: user => {
      setState({...state, user});
    }
  };

  return (
    <CommonContext.Provider value={[state, actions]}>
      {props.children}
    </CommonContext.Provider>
  )
};

export { CommonContext, CommonProvider };