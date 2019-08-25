import { observable, action } from 'mobx';
import { createContext } from 'react';


class UiStore {
  @observable
  toast = [];

  @observable
  logs = ['[Action Log] Action Log Display Mounted'];
	
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
}

export default createContext(new UiStore());