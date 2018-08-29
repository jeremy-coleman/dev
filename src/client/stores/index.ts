import { UiStore } from "./UiStore"

export interface ICogStore {
  uiStore: UiStore
}

class CogStore implements ICogStore {
  uiStore = new UiStore()
}

export const cogStore = new CogStore()
