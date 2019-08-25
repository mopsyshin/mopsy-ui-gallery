import React, { useState, useEffect, useContext } from "react";
import "./Navigator.scss";
import config from "components/ui.config";
import { UiContext } from 'stores';

const Navigator = props => {
  const store = useContext(UiContext);
  const [bounceState, setBounceState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUi, setIsUi] = useState(false);
  
  const navArr = Object.entries(config);
  let navList;
  let bounceTimer;
  let timer = 0;

  useEffect(() => {
    setIsUi(false);
    navList.scrollTop = 21;
    navArr.forEach((item, index) => {
      if (`/ui/${item[1].path}` === props.location.pathname) {
        setNavOffset(item[1].path);
        setIsUi(true);
      }
    })
    navList.addEventListener("wheel", e => {
      e.preventDefault();
    });
  }, [props.location.pathname]);


  const selectItem = index => {
    const path = navArr[index][1].path;
    props.history.push(`/ui/${path}`);
    setNavOffset(path);
    setCurrentIndex(index);
    setIsUi(true);
    store.addLog(`[Navigator : Move to] ${path}`);
  }

  const setNavOffset = path => {
    const target = document.querySelector(`#${path}`);
    navList.scrollTop = target.offsetTop + 21 - 190;
  }

  const onWheel = e => {
    if (!bounceState) {
      debounceWheel(e);
      setBounceState(true);
    } else {
      if (timer === 0) {
        bounceTimer = setInterval(() => {
          timer += 1;
        }, 1);
      } else if (timer > 50) {
        clearInterval(bounceTimer);
        debounceWheel(e);
        setBounceState(false);
        timer = 0;
      }
    }
    return;
  };

  const debounceWheel = e => {
    if (e.deltaY >= 0) {
      if (currentIndex < navArr.length - 1) {
        selectItem(currentIndex + 1)
      }
    } else {
      if (currentIndex > 0) {
        selectItem(currentIndex - 1)
      }
    }
  };

  const renderNav = () => {
    return navArr.map(([key, value], index) => {
      return (
        <NavItem
          key={key}
          index={index}
          value={value}
          isActive={props.location.pathname === `/ui/${value.path}`}
          location={props.location}
          onClick={selectItem}
        />
      );
    });
  };

  return (
    <div className="nav-container">
      <div className="top-gradient"></div>
      <div className="bottom-gradient"></div>
      <div className="nav-list" onWheel={onWheel} ref={ref => (navList = ref)}>
        <div className={`center-point ${isUi ? '' : 'hidden'}`}></div>
        <div className="blank-item"></div>
        {renderNav()}
        <div className="blank-item"></div>
      </div>
    </div>
  );
};


//Nav Item component

const NavItem = props => {
  const clickItem = () => {
    props.onClick(props.index);
  };

  return (
    <div
      className="nav-item"
      onClick={clickItem}
      id={props.value.path}
    >
      <div className={`text-wrapper ${props.isActive ? "active" : ""}`}>
        <span>{props.value.name}</span>
      </div>
    </div>
  );
};

export default Navigator;
