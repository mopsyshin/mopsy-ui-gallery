import React, { useState } from 'react';
import IcRemove from "../../assets/IcRemove";
import './SearchInput.scss';

const SearchInput = props => {
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
    props.submit(inputValue);
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

  const renderRemoveButton = () => {
    if (!inputIsEmpty) {
      return (
        <button
          onClick={() => {
            updateInputValue({ target: { value: '' } });
          }}
        >
          <IcRemove color="#ffffff" />
        </button>
      );
    }
  };

  return (
    <div>
      searchInput
    </div>
  )
}

export default SearchInput;