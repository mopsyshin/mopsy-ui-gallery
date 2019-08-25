import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './FloatingMenu.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';

const FloatingMenu = props => {

  return (
    <TransitionWrapper>
      floating
    </TransitionWrapper>
  )
}

export default observer(FloatingMenu);