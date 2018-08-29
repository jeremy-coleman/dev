//import { palette, ThemeVariables } from "../styles/palette"
import { createMuiTheme as Mui } from "@material-ui/core/styles"
import { observable, computed, action } from "mobx"

export const palette = {
  myriad: {
    primary: "#F44336",
    secondary: "#FFD740",
    background: "#FFFFFF",
  },
  ranger: {
    primary: "#2196F3",
    secondary: "#FFE57F",
    background: "#FFFFFF",
  },
  velocity: {
    primary: "#FFA000",
    secondary: "#607D8B",
    background: "#FFFFFF",
  },
}



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
  @observable title = "Coglite"

  @observable themeId = "myriad"
  @observable themeDialogToggle = new ToggleOpenValue()

  @observable menuDrawerToggle = new ToggleOpenValue()
  @observable nodeDrawerToggle = new ToggleOpenValue()
  @observable nodeFormDrawerToggle = new ToggleOpenValue()

  @observable appBarSettingsMenuToggle = new ToggleOpenValue()

  @observable appTabs = new TabValue()

  @observable isThemeDialogOpen = false

  @observable activeCogliteNodeModel = null

  @observable diagramModel = null

  @observable nodeFormsData = {}

  @observable isDynamicNodeFormUpdate = false

  constructor() {}

  @computed
  get muiTheme() {
    const basicTheme =  Mui({
      palette: {
        primary: {
          main: palette[this.themeId].primary,
        },
        secondary: {
          main: palette[this.themeId].secondary,
        }
      }
    })
    basicTheme["shape"] = {
      borderRadius: 4
    }
    return basicTheme
  }

  // @computed
  // get muiThemeVariables() {
  //   return ThemeVariables[this.themeId]
  // }

  @action
  updateTheme(themeId) {
    this.themeId = themeId
  }

  @action
  updateActiveCogliteNodeModel(model) {
    if (this.nodeFormDrawerToggle.open && (this.activeCogliteNodeModel.model.id !== model.model.id)) {
      this.isDynamicNodeFormUpdate = true
    }
    this.activeCogliteNodeModel = model
  }

  @action
  openThemeDialog() {
    this.isThemeDialogOpen = true
  }

  @action
  closeThemeDialog() {
    this.isThemeDialogOpen = false
  }

  @action
  setDiagramModel(diagramModel) {
    this.diagramModel = diagramModel
  }

  @action
  updateNodeFormsData(nodeFormsData) {
    this.nodeFormsData = nodeFormsData
  }

  @observable uiError: Error
  @action
  onError = (error: Error) => {
    this.uiError = error
  }
}

export { UiStore }