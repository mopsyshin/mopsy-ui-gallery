import React, { useState, useEffect, useContext } from "react";
import "./TransitionWrapper.scss";
import IcArrow from "assets/IcArrow";
import UiContext from "stores/UiContext";

const TransitionWrapper = (props) => {
  const store = useContext(UiContext);
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    setPageTransition(false);
    setTimeout(() => {
      setPageTransition(true);
    }, 50);
  }, [props.location.pathname]);

  const openCode = () => {
    const baseUrl =
      "https://github.com/mopsyshin/mopsy-ui-gallery/blob/master/src/components";
    window.open(`${baseUrl}${props.location.pathname}`);
  };

  const goBack = () => {
    if (store.history.length) {
      store.backHistory();
      props.history.goBack();
    } else {
      props.history.push("/");
    }
  };

  const renderBtnBack = () => {
    if (props.location.pathname !== "/") {
      return (
        <button className="btn-back" onClick={goBack}>
          <IcArrow />
        </button>
      );
    }
  };
  return (
    <div className={`transition-wrapper ${pageTransition ? "active" : ""}`}>
      <div className="header">
        <div className="left-side">
          {renderBtnBack()}
          <h1 className="title">{props.title ? props.title : ""}</h1>
        </div>
        <button className="btn-action" onClick={openCode}>
          Show Code
        </button>
      </div>
      {props.children}
    </div>
  );
};

export default TransitionWrapper;
