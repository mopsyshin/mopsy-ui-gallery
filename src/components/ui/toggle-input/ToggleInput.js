import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './ToggleInput.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';

const ToggleInput = props => {

  return (
    <TransitionWrapper>
      toggle input
    </TransitionWrapper>
  )
}

export default observer(ToggleInput);