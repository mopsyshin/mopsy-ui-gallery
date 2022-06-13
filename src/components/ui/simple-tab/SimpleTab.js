import React, { memo, useContext } from "react";
import "./SimpleTab.scss";
import tabs from "./tab.config";
import UiContext from "stores/UiContext";
import useSimpleTab from "./useSimpleTab";
import { observer } from "mobx-react-lite";

const SimpleTab = () => {
  const store = useContext(UiContext);

  const { currentTab, selectTab, tabWrapperRef, tabMenus, indicatorStyle } =
    useSimpleTab({ store, tabs });

  return (
    <div className="simple-tab-container">
      <div className="tab-header" ref={tabWrapperRef}>
        {tabMenus.map((tab) => (
          <TabItem data={tab} key={tab.tabName} onClick={selectTab} />
        ))}
        <div
          className="tab-indicator"
          style={{
            width: indicatorStyle.width,
            backgroundColor: indicatorStyle.backgroundColor,
            transform: `translateX(${indicatorStyle.transX}px)`,
          }}
        ></div>
      </div>
      <div className="tab-body">
        <TabPage data={currentTab} />
      </div>
    </div>
  );
};

const TabItem = memo(({ onClick, data }) => (
  <div className={`tab-item ${data.path}`} onClick={() => onClick(data)}>
    {data.tabName}
  </div>
));

const TabPage = memo(({ data }) => (
  <div className="tab-page">
    <div className="content" style={{ backgroundColor: data.color }}>
      {data.tabName}
    </div>
  </div>
));

export default observer(SimpleTab);
