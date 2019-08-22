import React, { useState, useContext } from "react";
import IcRemove from "assets/IcRemove";
import "./SearchInput.scss";
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';
import { CommonContext } from 'stores/CommonContext';

const SearchInput = props => {
  const [state, actions] = useContext(CommonContext);

  const [inputIsActive, setInputIsActive] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [inputValue, setInputValue] = useState("");
  
  const updateInputValue = e => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputIsEmpty(true);
    } else {
      setInputIsEmpty(false);
    }
  };

  const submit = () => {
    if (!inputIsEmpty) {
      actions.addToast(`Searching '${inputValue}'... `)
    }
  };

  const enterSubmit = e => {
    if (e.keyCode === 13) {
      submit();
    }
  }

  const renderSubmitButton = () => {
    if (inputIsActive || !inputIsEmpty) {
      return (
        <button disabled={inputIsEmpty} onClick={submit} className="btn-submit">
          검색
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
            updateInputValue({ target: { value: "" } });
          }}
        >
          <IcRemove color="#ffffff" />
        </button>
      );
    }
  };

  return (
    <TransitionWrapper title="Smooth Search Input">
      <div className="search-input-container">
        <div
          className={`input-wrapper ${
            inputIsActive || !inputIsEmpty ? "active" : ""
          }`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={updateInputValue}
            onKeyUp={enterSubmit}
            onFocus={() => {setInputIsActive(true)}}
            onBlur={() => {setInputIsActive(false)}}/>
          {renderClearButton()}
        </div>
        {renderSubmitButton()}
      </div>  
    </TransitionWrapper>
  );
};

export default SearchInput;
