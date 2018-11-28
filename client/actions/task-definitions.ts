import UserTask from './user-task'
import ExternalLinkTask from './external-link-task'
import { store } from '../store'
import * as actions from './actions'
import {
  isCommandMode,
  viewModeIsEditor,
  getCells,
  getCellBelowSelectedId,
  getCellAboveSelectedId, prettyDate, formatDateString,
} from '../tools/notebook-utils'
import { stateFromJsmd } from '../tools/jsmd-tools'

const dispatcher: any = {}

for (const action in actions) {
  if (Object.prototype.hasOwnProperty.call(actions, action)) {
    dispatcher[action] = (...params) => (store.dispatch(actions[action](...params)))
  }
}

//@ts-ignore
const oscpu = window.navigator.oscpu || window.navigator.platform
let OSName = 'Unknown OS'
if (oscpu.indexOf('Win') !== -1) OSName = 'Windows'
if (oscpu.indexOf('Mac') !== -1) OSName = 'MacOS'
if (oscpu.indexOf('X11') !== -1) OSName = 'UNIX'
if (oscpu.indexOf('Linux') !== -1) OSName = 'Linux'

const commandKey = () => (OSName === 'MacOS' ? '⌘' : 'Ctrl')


class TaskStore {

evaluateCell = new UserTask({
  title: 'Run Cell',
  keybindings: ['mod+enter'],

  callback() {
    dispatcher.changeMode('command')
    dispatcher.saveNotebook(true)
    dispatcher.evaluateCell()
  },
})

evaluateAllCells = new UserTask({
  title: 'Run All Cells',
  menuTitle: 'Run All Cells',
  callback() {
    dispatcher.saveNotebook(true)
    dispatcher.evaluateAllCells(getCells(), store)
  },
})

evaluateCellAndSelectBelow = new UserTask({
  title: 'Evaluate Cell and Select Below',
  keybindings: ['shift+enter'],
  keybindingPrecondition: viewModeIsEditor,
  callback() {
    dispatcher.changeMode('command')
    dispatcher.saveNotebook(true)
    dispatcher.evaluateCell()
    const cellBelowId = getCellBelowSelectedId()
    if (cellBelowId !== null) {
      dispatcher.selectCell(cellBelowId, true)
    } else {
    // if cellBelowId *is* null, need to add a new cell.
      dispatcher.addCell('code')
      dispatcher.selectCell(getCellBelowSelectedId(), true)
    }
  },
})

moveCellUp = new UserTask({
  title: 'Move Cell Up',
  displayKeybinding: 'Shift+Up', // '\u21E7 \u2191',
  keybindings: ['shift+up'],
  keybindingPrecondition: isCommandMode,
  preventDefaultKeybinding: true,
  callback() {
    dispatcher.cellUp()
  },
})


moveCellDown = new UserTask({
  title: 'Move Cell Down',
  displayKeybinding: 'Shift+Down', // '\u21E7 \u2193',
  keybindings: ['shift+down'],
  keybindingPrecondition: isCommandMode,
  preventDefaultKeybinding: true,
  callback() {
    dispatcher.cellDown()
  },
})

loginGithub = new UserTask({
  title: 'Login using GitHub',
  callback() { dispatcher.login() },
})

logoutGithub = new UserTask({
  title: 'Logout',
  callback() { dispatcher.logout() },
})

exportGist = new UserTask({
  title: 'Export Gist',
  callback() { dispatcher.exportGist() },
})

selectUp = new UserTask({
  title: 'Select Cell Above',
  displayKeybinding: 'Up', // \u2191',
  keybindings: ['up'],
  keybindingPrecondition: isCommandMode,
  preventDefaultKeybinding: true,
  callback() {
    const cellAboveId = getCellAboveSelectedId()
    if (cellAboveId !== null) { dispatcher.selectCell(cellAboveId, true) }
  },
})

selectDown = new UserTask({
  title: 'Select Cell Down',
  displayKeybinding: 'Down', // '\u2193',
  keybindings: ['down'],
  keybindingPrecondition: isCommandMode,
  preventDefaultKeybinding: true,
  callback() {
    const cellBelowId = getCellBelowSelectedId()
    if (cellBelowId !== null) { dispatcher.selectCell(cellBelowId, true) }
  },
})

addCellAbove = new UserTask({
  title: 'Add Cell Above',
  keybindings: ['a'],
  displayKeybinding: 'A',
  keybindingPrecondition: isCommandMode,
  callback() {
    dispatcher.insertCell('code', 'above')
    dispatcher.selectCell(getCellAboveSelectedId(), true)
  },
})

addCellBelow = new UserTask({
  title: 'Add Cell Below',
  keybindings: ['b'],
  displayKeybinding: 'B',
  keybindingPrecondition: isCommandMode,

  callback() {
    dispatcher.insertCell('code', 'below')
    dispatcher.selectCell(getCellBelowSelectedId(), true)
  },
})

deleteCell = new UserTask({
  title: 'Delete Cell',
  keybindings: ['shift+backspace'],
  displayKeybinding: 'Shift+Backspace', // '\u21E7 \u232b',
  keybindingPrecondition: isCommandMode,
  callback() { dispatcher.deleteCell() },
})

changeToJavascriptCell = new UserTask({
  title: 'Change to Javascript',
  keybindings: ['j'],
  displayKeybinding: 'J',
  keybindingPrecondition: isCommandMode,
  callback() {
    dispatcher.changeCellType('code', 'js')
  },
})

changeToMarkdownCell = new UserTask({
  title: 'Change to Markdown',
  keybindings: ['m'],
  displayKeybinding: 'M',
  keybindingPrecondition: isCommandMode,
  callback() {
    dispatcher.changeCellType('markdown')
  },
})

changeToExternalResourceCell = new UserTask({
  title: 'Change to External Resource',
  keybindings: ['e'],
  displayKeybinding: 'E',
  keybindingPrecondition: isCommandMode,
  callback() {
    dispatcher.changeCellType('external dependencies')
  },
})

changeToRawCell = new UserTask({
  title: 'Change to Raw',
  keybindings: ['r'],
  displayKeybinding: 'R',
  keybindingPrecondition: isCommandMode,
  callback() { dispatcher.changeCellType('raw') },
})

changeToCSSCell = new UserTask({
  title: 'Change to CSS',
  keybindings: ['c'],
  displayKeybinding: 'C',
  keybindingPrecondition: isCommandMode,
  callback() { dispatcher.changeCellType('css') },
})

changeToPluginCell = new UserTask({
  title: 'Change to Plugin Loader',
  keybindings: ['l'],
  displayKeybinding: 'L',
  keybindingPrecondition: isCommandMode,
  callback() { dispatcher.changeCellType('plugin') },
})

toggleSkipCellInRunAll = new UserTask({
  title: 'Toggle Skipping Cell in Run All',
  keybindings: ['s'],
  displayKeybinding: 'S',
  keybindingPrecondition: isCommandMode,
  callback() { dispatcher.setCellSkipInRunAll() },
})

changeMode = new UserTask({
  title: 'Change Mode',
  callback(mode) { dispatcher.changeMode(mode) },
})

changeToMenuMode = new UserTask({
  title: 'Change to Menu Mode',
  callback() { dispatcher.changeMode('title-edit') },
})

changeToEditMode = new UserTask({
  title: 'Change to Edit Mode',
  keybindings: ['enter', 'return'],
  displayKeybinding: 'Enter',
  keybindingPrecondition: isCommandMode,
  preventDefaultKeybinding: true,
  callback() { dispatcher.changeMode('edit') },
})

changeToCommandMode = new UserTask({
  title: 'Change to Command Mode',
  keybindings: ['esc'],
  preventDefaultKeybinding: true,
  callback() { dispatcher.changeMode('command') },
})

changeTitle = new UserTask({
  title: 'Change Title',
  callback(t) { dispatcher.changePageTitle(t) },
})

createNewNotebook = new UserTask({
  title: 'New Notebook',
  preventDefaultKeybinding: true,
  callback() { dispatcher.newNotebook() },
})

saveNotebook = new UserTask({
  title: 'Save Notebook',
  keybindings: ['ctrl+s', 'meta+s'],
  displayKeybinding: `${commandKey()}+S`,
  preventDefaultKeybinding: true,
  callback() { dispatcher.saveNotebook() },
})

exportNotebook = new UserTask({
  title: 'Export Notebook',
  keybindings: ['ctrl+shift+e', 'meta+shift+e'],
  displayKeybinding: `Shift+${commandKey()}+E`,
  callback() { dispatcher.exportNotebook() },
})

exportNotebookAsReport = new UserTask({
  title: 'Export Notebook as Report',
  callback() { dispatcher.exportNotebook(true, false) },
})

exportNotebookToClipboard = new UserTask({
  title: 'Export Notebook to Clipboard',
  callback() {
    dispatcher.exportNotebook(false, true)
    dispatcher.updateAppMessages({ message: 'Notebook copied to clipboard' })
  },
})

clearVariables = new UserTask({
  title: 'Clear Variables',
  preventDefaultKeybinding: true,
  callback() { dispatcher.clearVariables() },
})

changeSidePaneWidth = new UserTask({
  title: 'Change Width of Side Pane',
  callback(widthShift) { dispatcher.changeSidePaneWidth(widthShift) },
})

toggleDeclaredVariablesPane = new UserTask({
  title: 'Toggle the Declared Variables Pane',
  menuTitle: 'Declared Variables',
  keybindings: ['ctrl+d', 'meta+d'],
  displayKeybinding: `${commandKey()}+D`,
  preventDefaultKeybinding: true,
  keybindingPrecondition: isCommandMode,
  callback() {
    //@ts-ignore
    if (store.getState().sidePaneMode !== 'declared variables') {
      dispatcher.changeSidePaneMode('declared variables')
    } else {
      dispatcher.changeSidePaneMode()
    }
  },
})

toggleHistoryPane = new UserTask({
  title: 'Toggle the History Pane',
  menuTitle: 'History',
  keybindings: ['ctrl+h', 'meta+h'],
  displayKeybinding: `${commandKey()}+H`,
  preventDefaultKeybinding: true,
  keybindingPrecondition: isCommandMode,
  callback() {
    //@ts-ignore
    if (store.getState().sidePaneMode !== 'history') {
      dispatcher.changeSidePaneMode('history')
    } else {
      dispatcher.changeSidePaneMode()
    }
  },
})

toggleAppInfoPane = new UserTask({
  title: 'Toggle the Iodide Info Pane',
  menuTitle: 'App Messages',
  keybindings: ['ctrl+i', 'meta+i'],
  displayKeybinding: `${commandKey()}+I`,
  preventDefaultKeybinding: true,
  keybindingPrecondition: isCommandMode,
  callback() {
    //@ts-ignore
    if (store.getState().sidePaneMode !== '_APP_INFO') {
      dispatcher.changeSidePaneMode('_APP_INFO')
    } else {
      dispatcher.changeSidePaneMode()
    }
  },
})

setViewModeToEditor = new UserTask({
  title: 'Set View Mode to Editor',
  callback() {
    dispatcher.setViewMode('editor')
  },
})

setViewModeToPresentation = new UserTask({
  title: 'Set View Mode to Presentation',
  callback() {
    dispatcher.setViewMode('presentation')
  },
})

fileAnIssue = new ExternalLinkTask({
  title: 'File an Issue',
  menuTitle: 'File an Issue ...',
  url: 'http://github.com/iodide-project/iodide/issues/new',
})

seeAllExamples = new ExternalLinkTask({
  title: 'See All Examples',
  menuTitle: 'See All Examples ...',
  url: 'http://github.com/iodide-project/iodide-examples/',
})

}


export function getLocalStorageNotebook(name) {
  const localStorageEntry = localStorage.getItem(name)
  if (localStorageEntry == null) return undefined
  let { lastSaved } = stateFromJsmd(localStorageEntry)
  lastSaved = (lastSaved !== undefined) ? prettyDate(formatDateString(lastSaved)) : ' '
  return new UserTask({
    title: name,
    secondaryText: lastSaved,
    callback() {
      dispatcher.loadNotebook(name)
    },
  })
}

const tasks = new TaskStore()
export default tasks
