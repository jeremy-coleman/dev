import {NavigationStore} from './NavigationStore'
import { UiStore } from './UiStore';


export class Store {
  navigation = new NavigationStore()
  uiStore = new UiStore()
}