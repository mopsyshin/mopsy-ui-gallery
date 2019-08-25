import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { UiContext } from 'stores';
import './ActionLog.scss';

const ActionLog = props => {
  const store = useContext(UiContext);
  const logs = store.logs;

  let display;

  const clearLog = () => {
    store.clearLog();
  }

  useEffect(() => {
    display.scrollTop = display.scrollHeight;
  });

  const renderLogs = () => {
    return logs.map((log, index) => {
      return (
        <div className="log-item" key={index}>
          <span className="num">[{index}] </span>
          {log}
        </div>
      )
    })
  }

  return (
    <div className="action-log-container">
      <div className="log-display" ref={ref => {display = ref}}>
        <div className="log-list">
        {renderLogs()}
        </div>
      </div>
      <button className="btn-clear" onClick={clearLog}>Clear Logs</button>
    </div>
  )
}

export default observer(ActionLog);