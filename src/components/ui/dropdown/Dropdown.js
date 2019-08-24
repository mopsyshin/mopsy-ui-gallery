import React, { useState, useEffect, useContext } from 'react';
import './Dropdown.scss';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';
import IcArrow from 'assets/IcArrow';
import data from './sample';
import { CommonContext } from 'stores/CommonContext';

const Dropdown = props => {
  const [state, actions] = useContext(CommonContext);

  const [selecting, setSelecting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data.arr[0]);

  const toggleDropdown = () => {
    if (selecting) {
      setSelecting(false);
      actions.addLog(`[Dropdown Menu : Toggle Dropdown] false`);
    } else {
      setSelecting(true);
      actions.addLog(`[Dropdown Menu : Toggle Dropdown] true`);
    }
  }

  const selectItem = item => {
    document.body.style.overflow = 'unset';
    setSelecting(false);
    setSelectedItem(item);
    actions.addLog(`[Dropdown Menu : Select Item] ${item.value}, ${item.display}`);
  }

  const setBodyOverflow = status => {
    if (status) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  const dropdownList = () => {
    if (selecting) {
      return (
        <div onMouseEnter={() => setBodyOverflow(false)}
             onMouseLeave={() => setBodyOverflow(true)}>
        {
          data.arr.map((item, index) => {
            return (
              <div key={index}>
                <div></div>
                <div className="display-item" onClick={() => {selectItem(item)}} >
                  {item.display}
                </div>
              </div>
            )
          })
        }
        </div>
      )
    }
  }

  useEffect(() => {
    if (data.initItem) {
      selectItem(data.initItem);
    }
  }, []);

  const wrapperHeight = () => {
    if (selecting) {
      return data.arr.length > 5 ? (56 * 5 + 28) + 'px' : (56 * (data.arr.length + 1)) + 'px';
    }
    return '56px';
  }

  return (
    <TransitionWrapper title="Dropdown Menu">
      <div className="dropdown-container">
        <div className={`wrapper ${selecting ? 'selecting' : ''}`} style={{
          height: wrapperHeight()
        }}>
          <div className="display-item" onClick={toggleDropdown}>
            <div>
              {selectedItem.display}
            </div>
            <div className={`ic-wrapper ${selecting ? 'selecting' : ''}`}>
              <IcArrow/>
            </div>
          </div>
          { dropdownList() }
        </div>
      </div>
    </TransitionWrapper>
  )
}

export default Dropdown;