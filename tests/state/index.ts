import { UiStore } from "./UiStore"
import {ThemeState} from "./ThemeState"
import {NavState} from './NavState'

export {UiStore, ThemeState, NavState}


export interface IState {
  uiStore: UiStore
  nav: NavState
  theme: ThemeState
}

class CogliteClientState implements IState {
 uiStore = new UiStore()
 nav = new NavState()
 theme = new ThemeState()
}

const state = new CogliteClientState()
export {state as default, state}


  
