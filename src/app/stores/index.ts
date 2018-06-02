import { NavStore } from "./NavStore"
import { UiStore } from "./UiStore"

export interface ICogliteState {
  nav?: NavStore
  uiStore?: UiStore
}

class CogliteState implements ICogliteState {
  public uiStore = new UiStore()
  public nav = new NavStore()
}

export const cogliteState = new CogliteState()
