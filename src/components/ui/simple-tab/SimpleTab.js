import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import "./SimpleTab.scss";
import tabs from "./tab.config";
import UiContext from "stores/UiContext";

const SimpleTab = (props) => {
  const store = useContext(UiContext);
  const tabMenus = tabs;
  const tabWrapper = useRef(null);
  const [currentTab, setCurrentTab] = useState(tabMenus[0]);
  const [indicatorStyle, setIndicatorStyle] = useState(0);

  const selectTab = useCallback(
    (data) => {
      setCurrentTab(data);
      store.addLog(`[Simple Tab : Select Tab] ${data.path}`);
      const target = document.querySelector(`.tab-item.${data.path}`);
      setIndicatorStyle({
        width: target.getBoundingClientRect().width,
        transX: target.offsetLeft,
        backgroundColor: data.color,
      });
      tabWrapper.current.scrollLeft = target.offsetLeft - 64;
    },
    [store]
  );

  const renderTabItems = () => {
    return tabMenus.map((tab, index) => {
      return <TabItem data={tab} key={index} onClick={selectTab} />;
    });
  };

  useEffect(() => {
    selectTab(tabMenus[0]);
  }, [tabMenus, selectTab]);

  return (
    <div className="simple-tab-container">
      <div className="tab-header" ref={tabWrapper}>
        {renderTabItems()}
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

const TabItem = (props) => {
  const selectTab = () => {
    props.onClick(props.data);
  };

  return (
    <div className={`tab-item ${props.data.path}`} onClick={selectTab}>
      {props.data.tabName}
    </div>
  );
};

const TabPage = (props) => {
  return (
    <div className="tab-page">
      <div className="content" style={{ backgroundColor: props.data.color }}>
        {props.data.tabName}
      </div>
    </div>
  );
};

export default SimpleTab;
