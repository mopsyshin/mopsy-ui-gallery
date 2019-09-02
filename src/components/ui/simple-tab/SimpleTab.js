import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './SimpleTab.scss';
import tabs from './tab.config';

const SimpleTab = props => {
  const tabMenus = tabs;

  const renderTabItems = () => {
    return tabMenus.map((tab, index) => {
      return <TabItem data={tab} key={index}/>
    }) 
  }

  const indicatorWidth = () => {
    
  }

  return (
    <div className="simple-tab-container">
      <div className="tab-header">
        {renderTabItems()}
        <div className="tab-indicator" style={{width: indicatorWidth}}></div>
      </div>
      <div className="tab-body">
        <Route path="/ui/simple-tab/:tabname" component={TabPage}/>
      </div>
    </div>
  )
}

const TabItem = props => {
  return (
    <div className="tab-item">
      {props.data.tabName}
    </div>
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