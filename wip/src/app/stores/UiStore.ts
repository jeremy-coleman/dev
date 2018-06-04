import { observable, computed, action } from "mobx"


export class ToggleOpenValue {
  @observable open = false

  @action
  openDrawer = (open: boolean) => {
    this.open = open
  }

  @action
  closeDrawer = () => {
    this.open = false
  }
}

export class TabValue {
  @observable tabValue = 0
  @action setTab(event, tabValue) {this.tabValue = tabValue}
}

class UiStore {
  @observable title = "Coglite"

  @observable themeId = "myriad"
  @observable themeDialogToggle = new ToggleOpenValue()

  @observable menuDrawerToggle = new ToggleOpenValue()
  @observable nodeDrawerToggle = new ToggleOpenValue()
  @observable nodeFormDrawerToggle = new ToggleOpenValue()

  @observable appBarSettingsMenuToggle = new ToggleOpenValue()

  @observable appTabs = new TabValue()

  @observable isThemeDialogOpen = false

  constructor() {}


  @action
  updateTheme(themeId) {
    this.themeId = themeId
    
  }

  @action
  openThemeDialog() {
    this.isThemeDialogOpen = true
  }

  @action
  closeThemeDialog() {
    this.isThemeDialogOpen = false
  }

  @observable uiError: Error
  @action onError = (error: Error) => {this.uiError = error}
  
}

let uiStore = new UiStore()
export { UiStore }