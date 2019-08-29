import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { UiContext } from 'stores';
import './SmoothSearch.scss';
import IcRemove from 'assets/IcRemove';
import Spinner from 'assets/Spinner';
import DummyList from 'components/dummy-list/DummyList';

const SmoothSearch = props => {
  const store = useContext(UiContext);
  const [inputIsActive, setInputIsActive] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [initState, setInitState] = useState(true);
  const [count, setCount] = useState(1);

  const updateInputValue = e => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputIsEmpty(true);
    } else {
      setInputIsEmpty(false);
    }
  };

  const clearInputValue = () => {
    store.addLog('[Search Input : Clear] Clear Search Input');
    updateInputValue({target: {value: ''}});
  }

  const submit = async () => {
    if (!inputIsEmpty && !store.loadingState) {
      setInitState(false);
      store.addLog(`[Search Input : Search] ${inputValue}`);
      store.addToast({
        id: count,
        message: `Searching ${inputValue}...`,
      });
      setCount(count + 1);
      const result = await store.getDummyData();
      store.addLog(result);
    }
  };

  const enterSubmit = e => {
    if (e.key === 'Enter') {
      submit();
    }
  }

  const renderSubmitButton = () => {
    if (inputIsActive || !inputIsEmpty) {
      return (
        <button disabled={inputIsEmpty} onClick={submit} className="btn-submit">
          <div className={`spinner-wrapper ${store.loadingState ? 'active' : ''}`}>
            <div className="spinner"><Spinner/></div>
          </div>
          <div className={`text ${store.loadingState ? '' : 'active'}`}>Search</div>
        </button>
      );
    }
  };

  const renderClearButton = () => {
    if (!inputIsEmpty) {
      return (
        <button
          className="btn-clear"
          onClick={() => {
            clearInputValue();
          }}>
          <IcRemove color="#ffffff" />
        </button>
      );
    }
  };

  return (
    <div className="smooth-search-page">
      <div className={`search-input-container ${initState ? 'init' : ''}`}>
        <div
          className={`input-wrapper ${
            inputIsActive || !inputIsEmpty ? "active" : ""
          }`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={updateInputValue}
            onKeyPress={enterSubmit}
            placeholder="Type Something"
            onFocus={() => {
              setInputIsActive(true)
              store.addLog('[Search Input : Focus] true')
            }}
            onBlur={() => {
              setInputIsActive(false)
              store.addLog('[Search Input : Blur] true')
            }}/>
          {renderClearButton()}
        </div>
        {renderSubmitButton()}
      </div>
      <div className="search-result-container">
        <DummyList initState={initState}/>
      </div>
    </div>
  );
};

export default observer(SmoothSearch);
