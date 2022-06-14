import { useState, useEffect, useCallback, useMemo } from "react";
import data from "../../../dummy/dropdownSample";

const useDropdown = ({ store }) => {
  const [selecting, setSelecting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data.arr[0]);

  const toggleDropdown = () => {
    if (selecting) {
      setSelecting(false);
      store.addLog(`[Dropdown Menu : Toggle Dropdown] false`);
    } else {
      setSelecting(true);
      store.addLog(`[Dropdown Menu : Toggle Dropdown] true`);
    }
  };

  const selectItem = useCallback(
    (item) => {
      document.body.style.overflow = "unset";
      setSelecting(false);
      setSelectedItem(item);
      store.addLog(
        `[Dropdown Menu : Select Item] ${item.value}, ${item.display}`
      );
    },
    [store]
  );

  const setBodyOverflow = (status) => {
    if (status) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    if (data.initItem) {
      selectItem(data.initItem);
    }
  }, [selectItem]);

  const wrapperHeight = useMemo(() => {
    if (selecting) {
      return data.arr.length > 5
        ? 56 * 5 + 28 + "px"
        : 56 * (data.arr.length + 1) + "px";
    }
    return "56px";
  }, [selecting]);

  return {
    selecting,
    wrapperHeight,
    toggleDropdown,
    selectedItem,
    setBodyOverflow,
    selectItem,
  };
};

export default useDropdown;
