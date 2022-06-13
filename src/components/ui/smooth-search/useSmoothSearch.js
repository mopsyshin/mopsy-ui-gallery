import { generateID } from "hooks/useId";
import { useState, useRef } from "react";

const useSmoothSearch = ({ store }) => {
  const [inputIsActive, setInputIsActive] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [initState, setInitState] = useState(true);
  const searchInput = useRef();

  const isActive = inputIsActive || !inputIsEmpty;

  const updateInputValue = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputIsEmpty(true);
    } else {
      setInputIsEmpty(false);
    }
  };

  const clearInputValue = () => {
    store.addLog("[Search Input : Clear] Clear Search Input");
    updateInputValue({ target: { value: "" } });
    searchInput.current.focus();
  };

  const submit = async () => {
    if (!inputIsEmpty && !store.loadingState) {
      setInitState(false);
      store.setSearchingValue(inputValue);
      store.addLog(`[Search Input : Search] ${inputValue}`);
      store.addToast({
        id: generateID(),
        message: `Searching ${inputValue}...`,
      });
      const result = await store.getDummyData();
      store.addLog(result);
    }
  };

  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const onInputFocus = (status) => {
    if (status) {
      setInputIsActive(true);
      store.addLog("[Search Input : Focus] true");
    } else {
      setInputIsActive(false);
      store.addLog("[Search Input : Blur] true");
    }
  };

  return {
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
    loadingState: store.loadingState,
  };
};

export default useSmoothSearch;
