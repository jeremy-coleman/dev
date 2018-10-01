import { store } from '../store';


function sideEffectDiv(sideEffectClass, reportSideEffect) {
  // appends a side effect div to the side effect area
  const cellId = store.getState().runningCellID
  const div = document.createElement('div')
  const printClass = (reportSideEffect === true) ? sideEffectClass : `${sideEffectClass} hide-side-effect`
  div.setAttribute('class', printClass)
  //@ts-ignore
  document.getElementById(`cell-${cellId}-side-effect-target`).append(div)
  return div
}

export const output = {
  text: (s, reportSideEffect = false) => {
    // dumbly puts a string in a side effect div
    const div = sideEffectDiv('side-effect-print', reportSideEffect)
    div.innerHTML = s.toString()
  },
  element: (nodeType, reportSideEffect = true) => {
    const div = sideEffectDiv('side-effect-element', reportSideEffect)
    const node = document.createElement(nodeType)
    //@ts-ignore
    div.append(node)
    return node
  },
}


// export function html(s) {

// }


// export function append(s) {

// }
