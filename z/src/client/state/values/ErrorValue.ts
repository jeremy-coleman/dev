import { observable, action } from "mobx"

export class ErrorValue {
  @observable value: Error
  @observable stack: Error["stack"]
  @observable message: Error["message"]
  
  @action.bound onError = (error: Error) => (
          this.value = error, 
          this.stack = error.stack,
          this.message = error.message
    )
}