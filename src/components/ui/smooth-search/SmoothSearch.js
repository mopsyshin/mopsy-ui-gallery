import React, { useContext } from "react";
import "./SmoothSearch.scss";
import IcRemove from "assets/IcRemove";
import Spinner from "assets/Spinner";
import DummyList from "components/dummy-list/DummyList";
import useSmoothSearch from "./useSmoothSearch";
import { observer } from "mobx-react-lite";
import { UiContext } from "stores";
import classNames from "classnames/dedupe";

const SmoothSearch = () => {
  const store = useContext(UiContext);

  const {
    inputValue,
    searchInputRef,
    initState,
    isActive,
    inputIsEmpty,
    loadingState,
    submit,
    enterSubmit,
    onInputFocus,
    clearInputValue,
    updateInputValue,
  } = useSmoothSearch({ store });

  return (
    <div className="smooth-search-page">
      <div
        className={classNames("search-input-container", { init: initState })}
      >
        <div className={classNames("input-wrapper", { active: isActive })}>
          <input
            type="text"
            ref={searchInputRef}
            value={inputValue}
            onChange={updateInputValue}
            onKeyPress={enterSubmit}
            placeholder="Type Something"
            onFocus={() => onInputFocus(true)}
            onBlur={() => onInputFocus(false)}
          />
          {!inputIsEmpty && <ClearButton clear={clearInputValue} />}
        </div>
        {isActive && (
          <SubmitButton
            submit={submit}
            disabled={inputIsEmpty}
            isLoading={loadingState}
          />
        )}
      </div>
      <div className="search-result-container">
        <DummyList initState={initState} />
      </div>
    </div>
  );
};

const SubmitButton = ({ submit, disabled, isLoading }) => (
  <button disabled={disabled} onClick={submit} className="btn-submit">
    <div className={classNames("spinner-wrapper", { active: isLoading })}>
      <div className="spinner">
        <Spinner />
      </div>
    </div>
    <div className={classNames("text", { active: isLoading })}>Search</div>
  </button>
);

const ClearButton = ({ clear }) => (
  <button
    className="btn-clear"
    onClick={() => {
      clear();
    }}
  >
    <IcRemove color="#ffffff" />
  </button>
);

export default observer(SmoothSearch);
