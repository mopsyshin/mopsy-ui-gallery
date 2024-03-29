import React, { useState, useEffect, useContext, useCallback } from "react";
import "./Navigator.scss";
import config from "components/ui.config";
import { UiContext } from "stores";

const Navigator = (props) => {
  const store = useContext(UiContext);
  const navArr = Object.entries(config);
  const [bounceState, setBounceState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isUi, setIsUi] = useState(false);

  let navList;
  let bounceTimer;
  let timer = 0;
  let touchY = 0;

  const setNavOffset = useCallback((path) => {
    const target = document.querySelector(`#${path}`);
    const list = document.querySelector("#nav-list");
    if (list) {
      list.scrollTop = target.offsetTop + 21 - 190;
    }
  }, []);

  useEffect(() => {
    navList.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
    navList.addEventListener("touchstart", (e) => {}, { passive: false });
    navList.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
    navList.addEventListener("keydown", (e) => {
      e.preventDefault();
    });
    const pathname = props.location.pathname.split("/");
    if (pathname[1] !== "ui") {
      setNavOffset(navArr[currentIndex][1].path);
      setIsUi(false);
      return;
    }
    navArr.forEach((item, index) => {
      if (`/ui/${item[1].path}` === props.location.pathname) {
        setNavOffset(item[1].path);
        setCurrentIndex(index);
        setIsUi(true);
      }
    });
  }, [props.location.pathname, navList, navArr, currentIndex, setNavOffset]);

  const selectItem = (index) => {
    const path = navArr[index][1].path;
    setNavOffset(path);
    setCurrentIndex(index);
    setIsUi(true);
    store.addLog(`[Navigator : Move to] ${path}`);
    store.pushHistory(path);
    props.history.push(`/ui/${path}`);
  };

  const debounce = (e, callback, delay) => {
    if (!bounceState) {
      callback(e);
      setBounceState(true);
    } else {
      if (timer === 0) {
        bounceTimer = setInterval(() => {
          timer += 1;
        }, 1);
      } else if (timer > delay) {
        clearInterval(bounceTimer);
        callback(e);
        setTimeout(() => {
          setBounceState(false);
        }, 500);
        timer = 0;
      }
    }
    return;
  };

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 40:
        selectNextItem();
        break;
      case 38:
        selectPrevItem();
        break;
      default:
        return;
    }
  };

  const onWheel = (e) => {
    debounce(
      e,
      (event) => {
        if (event.deltaY >= 0) {
          selectNextItem();
        } else {
          selectPrevItem();
        }
      },
      50
    );
  };

  const onTouchStart = (e) => {
    touchY = e.touches[0].pageY;
  };

  const onTouchMove = (e) => {
    let offsetY;
    offsetY = touchY - e.changedTouches[0].pageY;
    if (offsetY > 0) {
      selectNextItem();
    } else {
      selectPrevItem();
    }
  };

  const selectNextItem = () => {
    if (currentIndex < navArr.length - 1) {
      selectItem(currentIndex + 1);
    }
  };

  const selectPrevItem = () => {
    if (currentIndex > 0) {
      selectItem(currentIndex - 1);
    }
  };

  return (
    <div className="nav-container">
      <div
        className="nav-list"
        id="nav-list"
        tabIndex="0"
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchMove}
        ref={(ref) => (navList = ref)}
      >
        <div className={`center-point ${isUi ? "" : "hidden"}`}></div>
        <div className="blank-item"></div>
        {navArr.map(([key, value], index) => (
          <NavItem
            key={key}
            index={index}
            value={value}
            currentIndex={currentIndex}
            isActive={props.location.pathname === `/ui/${value.path}`}
            location={props.location}
            onClick={selectItem}
          />
        ))}
        <div className="blank-item"></div>
      </div>
    </div>
  );
};

//Nav Item component

const NavItem = (props) => {
  const distance = Math.abs(props.currentIndex - props.index);
  const scale = 1 - distance / 10;
  const opacity = 1 - distance / 5;

  return (
    <div
      className="nav-item"
      onClick={() => props.onClick(props.index)}
      id={props.value.path}
    >
      <div
        className={`text-wrapper ${props.isActive ? "active" : ""}`}
        style={{ transform: `scale(${scale})`, opacity: opacity }}
      >
        <span>{props.value.name}</span>
        {props.value.wip && <p className="wip">work in progress</p>}
      </div>
    </div>
  );
};

export default Navigator;
