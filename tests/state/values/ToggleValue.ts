import { observable, action } from "mobx"

export class ToggleValue {
  @observable boolState = false
  @observable toggleState: string = 'on'

  @action
  setBoolState = (boolState: boolean) => {
    this.boolState = boolState
  }

  @action
  setFalse = () => {
    this.boolState = false
  }

  @action
  toggleBool = () => {
    this.boolState = !this.boolState
  }

  @action.bound doToggle = () => this.toggleState =='on' ? this.toggleState = 'off' : this.toggleState = 'on';
}
