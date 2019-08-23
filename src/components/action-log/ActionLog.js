import React, { useContext, useEffect } from 'react';
import { CommonContext } from 'stores/CommonContext';
import './ActionLog.scss';

const ActionLog = props => {
  const [state, actions] = useContext(CommonContext);

  const renderLogs = () => {
    return state.logs.map((log, index) => {
      return (
        <div className="log-item" key={index}>
          <span className="num">[{index}] </span>
          {log}
        </div>
      )
    })
  }

  let display;

  const clearLog = () => {
    actions.clearLog();
  }

  useEffect(() => {
    display.scrollTop = display.scrollHeight;
  }, [state.logs])

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

export default ActionLog;