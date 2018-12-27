import { observable, action } from "mobx"
import {ToggleValue} from './values'




class CommandBarStore {
  @observable items: any[] = []
  @observable farItems: any[] = []

  constructor(items?, farItems?){
    this.items = items
    this.farItems = farItems;
  };

  @action addItem = (item) => this.items.push(item);
  @action addFarItem = (farItem) => this.farItems.push(farItem);
}



class UiState {
  @observable title = "Demo"

  @observable commandBar = new CommandBarStore()

  @observable themeDialogToggle = new ToggleValue()

  @observable menuDrawerToggle = new ToggleValue()
  @observable DrawerToggle = new ToggleValue()
  @observable FormDrawerToggle = new ToggleValue()

  @observable appBarSettingsMenuToggle = new ToggleValue()


  @observable isThemeDialogOpen = false


  constructor() {}


  @action
  openThemeDialog() {
    this.isThemeDialogOpen = true
  }

  @action
  closeThemeDialog() {
    this.isThemeDialogOpen = false
  }



  @observable uiError: Error
  
  @action onError = (error: Error) => {
    this.uiError = error
  }
}

export { UiState }