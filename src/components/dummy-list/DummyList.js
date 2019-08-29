import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './DummyList.scss';
import Spinner from 'assets/Spinner';
import { UiContext } from 'stores';
import { openSync } from 'fs';

const DummyList = props => {
  const store = useContext(UiContext);

  const renderDummyItem = () => {
    return store.dummyList.map((item, index) => {
      return (
        <DummyItem key={index} data={item}/>
      )
    })
  }

  return (
    <div className={`dummy-list-container ${!props.initState ? "active" : ""}`}>
      <div className={`dummy-items ${store.loadingState ? "" : "active"}`}>
        {renderDummyItem()}
      </div>
      <div className={`loading-container ${store.loadingState ? "active" : ""}`}>
        <div className="spinner">
          <Spinner color="#ddd" width="48" height="48"/>
        </div>
        <div className="loading-message">
          Searching...
        </div>
      </div>
    </div>
  )
}


const DummyItem = props => {
  return (
    <div className="dummy-item-container">
      <div className="author">
        {props.data.author}
      </div>
      <div className="body">
        {props.data.body}
      </div>
    </div>
  )
}

export default observer(DummyList);