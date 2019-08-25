import React, { useState, useEffect, useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { UiContext } from 'stores';
import './Dropdown.scss';
import IcArrow from 'assets/IcArrow';
import data from './sample';


const Dropdown = props => {
  const store = useContext(UiContext);

  const [selecting, setSelecting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data.arr[0]);

  const toggleDropdown = () => {
    if (selecting) {
      setSelecting(false);
      store.addLog(`[Dropdown Menu : Toggle Dropdown] false`);
    } else {
      setSelecting(true);
      store.addLog(`[Dropdown Menu : Toggle Dropdown] true`);
    }
  }

  const selectItem = useCallback(item => {
    document.body.style.overflow = 'unset';
    setSelecting(false);
    setSelectedItem(item);
    store.addLog(`[Dropdown Menu : Select Item] ${item.value}, ${item.display}`);
  }, [store])

  const setBodyOverflow = status => {
    if (status) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    if (data.initItem) {
      selectItem(data.initItem);
    }
  }, [selectItem]);

  const wrapperHeight = () => {
    if (selecting) {
      return data.arr.length > 5 ? (56 * 5 + 28) + 'px' : (56 * (data.arr.length + 1)) + 'px';
    }
    return '56px';
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

  return (
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
  )
}

export default observer(Dropdown);