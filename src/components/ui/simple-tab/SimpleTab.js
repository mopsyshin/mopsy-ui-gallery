import React, { useState, useEffect, useRef } from "react";
import "./SimpleTab.scss";
import tabs from "./tab.config";

const SimpleTab = props => {
  const tabMenus = tabs;
  const tabWrapper = useRef(null);
  const [currentTab, setCurrentTab] = useState(tabMenus[0]);
  const [indicatorStyle, setIndicatorStyle] = useState(0);

  const selectTab = data => {
    setCurrentTab(data);
    const target = document.querySelector(`.tab-item.${data.path}`);
    setIndicatorStyle({
      width: target.getBoundingClientRect().width,
      transX: target.offsetLeft,
      backgroundColor: data.color
    });
    tabWrapper.current.scrollLeft = target.offsetLeft - 64;
  };

  const renderTabItems = () => {
    return tabMenus.map((tab, index) => {
      return <TabItem data={tab} key={index} onClick={selectTab} />;
    });
  };

  useEffect(() => {
    selectTab(tabMenus[0]);
  }, [tabMenus]);

  return (
    <div className="simple-tab-container">
      <div className="tab-header" ref={tabWrapper}>
        {renderTabItems()}
        <div
          className="tab-indicator"
          style={{
            width: indicatorStyle.width,
            backgroundColor: indicatorStyle.backgroundColor,
            transform: `translateX(${indicatorStyle.transX}px)`
          }}
        ></div>
      </div>
      <div className="tab-body">
        <TabPage data={currentTab} />
      </div>
    </div>
  );
};

const TabItem = props => {
  const selectTab = () => {
    props.onClick(props.data);
  };

  return (
    <div className={`tab-item ${props.data.path}`} onClick={selectTab}>
      {props.data.tabName}
    </div>
  );
};

const TabPage = props => {
  return (
    <div className="tab-page">
      <div className="content" style={{ backgroundColor: props.data.color }}>
        {props.data.tabName}
      </div>
    </div>
  );
};

export default SimpleTab;
