import { observable, action } from "mobx"


export class ToggleValue {
  @observable open = false

  @action
  openDrawer = (open: boolean) => {
    this.open = open
  }

  @action
  closeDrawer = () => {
    this.open = false
  }

  @action
  toggleDrawer = () => {
    this.open = !this.open
  }
}

export class TabValue {
  @observable tabValue = 0
  
  @action
  setTab(event, tabValue) {
    this.tabValue = tabValue
  }
}

class UiStore {
  @observable title = "Demo"

  @observable themeId = "myriad"
  @observable themeDialogToggle = new ToggleValue()

  @observable menuDrawerToggle = new ToggleValue()
  @observable DrawerToggle = new ToggleValue()
  @observable FormDrawerToggle = new ToggleValue()

  @observable appBarSettingsMenuToggle = new ToggleValue()

  @observable appTabs = new TabValue()

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

export { UiStore }