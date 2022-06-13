import React, { useContext } from "react";
import "./SmoothSearch.scss";
import IcRemove from "assets/IcRemove";
import Spinner from "assets/Spinner";
import DummyList from "components/dummy-list/DummyList";
import useSmoothSearch from "./useSmoothSearch";
import { observer } from "mobx-react-lite";
import { UiContext } from "stores";

const SmoothSearch = () => {
  const store = useContext(UiContext);
  const {
    isActive,
    inputIsEmpty,
    initState,
    clearInputValue,
    enterSubmit,
    searchInput,
    inputValue,
    updateInputValue,
    onInputFocus,
    submit,
    loadingState,
  } = useSmoothSearch({ store });

  return (
    <div className="smooth-search-page">
      <div className={`search-input-container ${initState ? "init" : ""}`}>
        <div className={`input-wrapper ${isActive ? "active" : ""}`}>
          <input
            type="text"
            ref={searchInput}
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
    <div className={`spinner-wrapper ${isLoading ? "active" : ""}`}>
      <div className="spinner">
        <Spinner />
      </div>
    </div>
    <div className={`text ${isLoading ? "" : "active"}`}>Search</div>
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
