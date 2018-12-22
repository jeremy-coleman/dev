
import { UiState } from "./ui"
import {NavState} from './nav'
import { WorkspaceStorage, storageService } from './workspace'


import {ThemeState} from './theme'



let GlobalState = {
 ui: new UiState(),
 nav: new NavState(),
 theme: new ThemeState()
}


const state = {...GlobalState}



export {UiState, ThemeState, NavState}
export { WorkspaceStorage, storageService }


export {state}
export default state

