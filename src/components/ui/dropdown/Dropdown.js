import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { UiContext } from "stores";
import "./Dropdown.scss";
import IcArrow from "assets/IcArrow";
import data from "../../../dummy/dropdownSample";
import classNames from "classnames/dedupe";
import useDropdown from "./useDropdown";

const Dropdown = () => {
  const store = useContext(UiContext);

  const {
    selecting,
    wrapperHeight,
    toggleDropdown,
    selectedItem,
    setBodyOverflow,
    selectItem,
  } = useDropdown({ store });

  return (
    <div className="dropdown-container">
      <div className={classNames("wrapper", { selecting })}>
        <div
          className={classNames("scroll-view", { selecting })}
          style={{
            height: wrapperHeight(),
          }}
        >
          <div className="display-item" onClick={toggleDropdown}>
            <div>{selectedItem.display}</div>
            <div className={classNames("ic-wrapper", { selecting })}>
              <IcArrow />
            </div>
          </div>
          {selecting && (
            <div
              onMouseEnter={() => setBodyOverflow(false)}
              onMouseLeave={() => setBodyOverflow(true)}
            >
              {data.arr.map((item, index) => {
                return (
                  <div key={index}>
                    <div></div>
                    <div
                      className="display-item"
                      onClick={() => {
                        selectItem(item);
                      }}
                    >
                      {item.display}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Dropdown);
