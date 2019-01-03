import { observable, action } from "mobx"

export class TabValue {
  @observable tabValue = 0
  
  @action
  setTab(event, tabValue) {
    this.tabValue = tabValue
  }
}