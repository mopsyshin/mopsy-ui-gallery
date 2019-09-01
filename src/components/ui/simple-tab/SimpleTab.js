import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './SimpleTab.scss';

const SimpleTab = props => {

  const renderTabItems = () => {
    return <TabItem/>
  }

  return (
    <div className="simple-tab-container">
      <div className="tab-header">
        {renderTabItems()}
        <div className="tab-indicator"></div>
      </div>
      <div className="tab-body">
        <Route path="/ui/simple-tab/:tabname" component={TabPage}/>
      </div>
    </div>
  )
}

const TabItem = props => {
  return (
    <div className="tab-item">tab item 1</div>
  )
}

const TabPage = props => {
  return (
    <div>
      tab-page
    </div>
  )
}

export default SimpleTab;