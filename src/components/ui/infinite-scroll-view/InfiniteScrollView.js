import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './InfiniteScrollView.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';

const InfiniteScrollView = props => {

  return (
    <TransitionWrapper>
      infinite
    </TransitionWrapper>
  )
}

export default observer(InfiniteScrollView);