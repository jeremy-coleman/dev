import { observable, action, computed } from "mobx"

export class ToggleValue {
  @observable value: boolean = false
  
  constructor(value?: boolean) {
    value && value === true ? this.value == true : this.value == false
  }

  @action setExplicit = (value: ToggleValue["value"]) => this.value = value
  
  @action setFalse = () => {this.value = false}
  @action.bound setTrue = () => this.value = true

  @action toggle = () => this.value = !this.value

  @computed get open () {return this.value}
  
}


export class OpenValue {
  @observable open = Boolean(false)
  @action.bound toggle = () => this.open = !this.open
}

export class SimpleToggleValue {
  @observable open = Boolean(false)

  @action
  toggle = () => {
    this.open = !this.open
  }
}

export class StringToggleValue {

  @observable value: 'on' | 'off' = 'on';

  @action.bound setExplicit = (value: StringToggleValue["value"]) => this.value = value;

  @action.bound turnOff = () => this.value = 'off' as 'off';
  
  @action.bound turnOn = () => this.value = 'on' as 'on';
  
  @action.bound toggle = () => this.value =='on' ? this.value = 'off' : this.value = 'on';
}


// export class ToggleValue {
//   @observable open = false

//   @action
//   setExplicit = (open: boolean) => {
//     this.open = open
//   }

//   @action
//   close = () => {
//     this.open = false
//   }

//   @action
//   toggle = () => {
//     this.open = !this.open
//   }
// }