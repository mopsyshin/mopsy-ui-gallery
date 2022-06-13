import { useState, useRef, useCallback, useEffect } from "react";

const useSimpleTab = ({ store, tabs }) => {
  const tabMenus = tabs;
  const tabWrapperRef = useRef(null);
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
      tabWrapperRef.current.scrollLeft = target.offsetLeft - 64;
    },
    [store]
  );

  useEffect(() => {
    selectTab(tabMenus[0]);
  }, [selectTab, tabMenus]);

  return { tabWrapperRef, tabMenus, selectTab, indicatorStyle, currentTab };
};

export default useSimpleTab;
