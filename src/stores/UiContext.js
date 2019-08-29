import { observable, action } from 'mobx';
import { createContext } from 'react';
import dummyData from '../dummy/dummyListSample';


class UiStore {
  @observable
  dummyList = [];

  @observable
  toast = [];

  @observable
  logs = ['[Action Log] Action Log Display Mounted'];

  @observable
  loadingState = false;
	
  @action 
  addToast(toastItem) {
    this.toast.push(toastItem);
    this.addLog(`[Toast : addToast] ${toastItem.message}`);
  }

  @action
  removeFirstToast() {
    this.toast = this.toast.slice(1);
  }

  @action
  addLog(log) {
    this.logs.push(log);
  }

  @action
  clearLog() {
    this.logs = ['[Action Log] Clear Logs'];
  }

  @action
  getDummyData() {
    return new Promise(resolve => {
      this.loadingState = true;
      this.dummyList = [];
      setTimeout(() => {
        this.loadingState = false;
        const result = dummyData;
        let i = 0;
        let timer = setInterval(() => {
          this.dummyList.push(dummyData.data[i]);
          this.addLog(`[Dummy Data : Push] ${dummyData.data[i].title}`);
          if (i < result.data.length - 1) {
            i += 1;
          } else {
            clearInterval(timer);
          }
        }, 100);
        resolve('success');
      }, 2000);
    })
  }
}

export default createContext(new UiStore());