import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './ScrollBanner.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';

const ScrollBanner = props => {

  return (
    <TransitionWrapper>
      scroll banner
    </TransitionWrapper>
  )
}

export default observer(ScrollBanner);