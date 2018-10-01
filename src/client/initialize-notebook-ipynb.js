import { getSavedNotebooks, getUserData } from './reducers/notebook-reducer';
import { newNotebook } from './state-prototypes';
import { stateFromJsmd } from './tools/jsmd-tools';

function initializeNotebook() {
  const jsmdElt = document.getElementById('jsmd')
  let state
  if (jsmdElt &&
      jsmdElt.innerHTML &&
      jsmdElt.innerHTML.trim() !== '') {
    state = stateFromJsmd(jsmdElt.innerHTML)
  } else {
    state = newNotebook()
  }
  return Object.assign(state, getSavedNotebooks(), getUserData())
}

export { initializeNotebook };
