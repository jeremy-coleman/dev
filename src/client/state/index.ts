
import { UiState } from "./ui"
import {NavState} from './nav'



import {ThemeState} from './theme'



let GlobalState = {
 ui: new UiState(),
 nav: new NavState(),
 theme: new ThemeState()
}


const state = {...GlobalState}



export {UiState, ThemeState, NavState}


export {state}
export default state

