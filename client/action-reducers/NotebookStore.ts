import {observable, action} from 'mobx'
import copy from 'copy-to-clipboard';
//import { blankState, newCell, newCellID, newNotebook } from './state-prototypes';
import { exportJsmdBundle, exportJsmdToString, stateFromJsmd, stringifyStateToJsmd, titleToHtmlFilename } from '../tools/jsmd-tools';

import * as MarkdownIt from 'markdown-it';
import * as MarkdownItAnchor from 'markdown-it-anchor';
import * as MarkdownItKatex from 'markdown-it-katex';

import {  moveCell, scrollToCellIfNeeded } from './cell-reducer-utils';

const MD = MarkdownIt({ html: true }) // eslint-disable-line
MD.use(MarkdownItKatex).use(MarkdownItAnchor)

const AUTOSAVE = 'AUTOSAVE: '
const jsLanguageDefinition = {
  pluginType: 'language',
  languageId: 'js',
  displayName: 'Javascript',
  codeMirrorMode: 'javascript',
  module: 'window',
  evaluator: 'eval',
  keybinding: 'j',
  url: ''
}

const pluginCellDefaultContent = `{
  "pluginType": ""
  "languageId": "",
  "displayName": "",
  "codeMirrorMode": "",
  "keybinding": "",
  "url": "",
  "module": "",
  "evaluator": ""
}`

class NotebookStore {
    @observable title = 'untitled'
    @observable cells = []
    @observable languages = { js: jsLanguageDefinition }
    @observable languageLastUsed = 'js'
    @observable userDefinedVarNames = []
    @observable lastSaved = undefined
    @observable userData = {}
    @observable mode = 'command'
    @observable viewMode = 'editor'
    @observable sidePaneMode = undefined
    @observable sidePaneWidth = 562
    @observable history = []
    @observable externalDependencies = []
    @observable executionNumber = 0
    @observable appMessages = []
    @observable autoSave = undefined
    @observable locallySaved = []
    @observable savedEnvironment = {}
    @observable runningCellID = undefined


@action.bound blankState() {
  return(
    this.title = 'untitled',
    this.cells = [],
    this.languages = { js: jsLanguageDefinition },
    this.languageLastUsed = 'js',
    this.userDefinedVarNames = [],
    this.lastSaved = undefined,
    this.userData = {},
    this.mode = 'command',
    this.viewMode = 'editor',
    this.sidePaneMode = undefined,
    this.sidePaneWidth = 562,
    this.history = [],
    this.externalDependencies = [],
    this.executionNumber = 0,
    this.appMessages = [],
    this.autoSave = undefined,
    this.locallySaved = [],
    this.savedEnvironment = {},
    this.runningCellID = undefined
  )
}

@action.bound getSelectedCellId() {
  const index = this.cells.findIndex(c => c.selected)
  if (index > -1) {
    return this.cells[index].id
  }
  return undefined 
}

@action.bound nextOverflow(currentOverflow) {
  return { HIDDEN: 'VISIBLE', VISIBLE: 'SCROLL', SCROLL: 'HIDDEN' }[currentOverflow]
}


@action newCellRowSettings(cellType) {
  switch (cellType) {
    case 'code':
      return {
        EXPLORE: { input: 'VISIBLE', sideeffect: 'VISIBLE', output: 'VISIBLE' },
        REPORT: { input: 'HIDDEN', sideeffect: 'VISIBLE', output: 'HIDDEN' },
      }
    case 'markdown':
      return {
        EXPLORE: { input: 'VISIBLE', output: 'VISIBLE' },
        REPORT: { input: 'VISIBLE', output: 'VISIBLE' },
      }
    case 'external dependencies':
      return {
        EXPLORE: { input: 'VISIBLE', output: 'VISIBLE' },
        REPORT: { input: 'HIDDEN', output: 'HIDDEN' },
      }
    case 'plugin':
      return {
        EXPLORE: { input: 'VISIBLE', output: 'VISIBLE' },
        REPORT: { input: 'HIDDEN', output: 'HIDDEN' },
      }
    case 'css':
      return {
        EXPLORE: { input: 'VISIBLE' },
        REPORT: { input: 'HIDDEN' },
      }
    case 'raw':
      return {
        EXPLORE: { input: 'VISIBLE' },
        REPORT: { input: 'HIDDEN' },
      }
    default:
      throw Error(`Unsupported cellType: ${cellType}`)
  }
}


@action newCell(cellId, cellType, language = 'js') {
  return {
    content: cellType === 'plugin' ? pluginCellDefaultContent : '',
    id: cellId,
    cellType,
    value: undefined,
    rendered: false,
    selected: false,
    asyncProcessCount: 0,
    executionStatus: ' ',
    evalStatus: 'UNEVALUATED',
    rowSettings: this.newCellRowSettings(cellType),
    skipInRunAll: false,
    language, // default language is js, but it only matters the cell is a code cell
  }
}

@action.bound getCellBelowSelectedId() {
  const cells = this.cells
  const index = cells.findIndex(c => c.selected)
  if (index === cells.length - 1) {
    // if there is no cell below, return this cell's id
    return cells[index].id
  } else if (index >= 0 && index < (cells.length - 1)) {
    return cells[index + 1].id
  }
  throw new Error('no cell currently selected')
}


@action.bound getSelectedCell() {
  const index = this.cells.findIndex(c => c.selected)
  if (index > -1) {
    return this.cells[index]
  }
  return undefined // for now
}

@action.bound  newStateWithSelectedCellPropertySet(cellPropToSet, newValue) {
  const cells = this.cells.slice()
  const thisCell = this.getSelectedCell()
  thisCell[cellPropToSet] = newValue
  return this.cells = cells // = thisCell? this is gonna be broken
}

@action.bound  newStateWithPropsAssignedForCell(cellId, cellPropsToSet) {
  const cells = this.cells.slice()
  const index = cells.findIndex(c => c.id === cellId)
  cells[index] = Object.assign({}, cells[index], cellPropsToSet)
  return this.cells = cells
}



@action.bound newStateWithSelectedCellPropsAssigned(cellPropsToSet) {
  return this.newStateWithPropsAssignedForCell(this.getSelectedCellId(), cellPropsToSet)
}

@action.bound  newStateWithRowOverflowSet(cellId, rowType, viewModeToSet, rowOverflow) {
  const cells = this.cells.slice()
  const cellIndex = cells.findIndex(c => c.id === cellId)
  const cell = cells[cellIndex]
  // this block can be deprecated if we move to enums for VIEWs
  let view
  switch (viewModeToSet) {
    case 'editor':
      view = 'EXPLORE'
      break
    case 'presentation':
      view = 'REPORT'
      break
    default:
      throw Error(`Unsupported viewMode: ${viewModeToSet}`)
  }
  cell.rowSettings[view][rowType] = rowOverflow

  cells[cellIndex] = Object.assign({}, cells[cellIndex])


  return  this.cells = cells
}

@action newCellID() {
  return Math.max(-1, ...this.cells.map(c => c.id)) + 1
}

@action addNewCellToState(cellType = 'code', language = 'js') {
  const nextCellId = this.newCellID()
  return this.cells.push(this.newCell(nextCellId, cellType, language))
}


@action newNotebook() {
   return this.addNewCellToState(this.blankState()), this.cells[0].selected = true
}


@action.bound newAppMessage(appMessageId, appMessageText, appMessageDetails, appMessageWhen) {
  return {
    id: appMessageId,
    message: appMessageText,
    details: appMessageDetails,
    when: appMessageWhen,
  }
}

@action.bound addAppMessageToState(appMessage) {
  const nextAppMessageId = this.newCellID()
  
  return this.appMessages.push(this.newAppMessage(nextAppMessageId, appMessage.message, appMessage.details, appMessage.when))
}

@action.bound getSavedNotebooks() {
  const autoSave = Object.keys(localStorage).filter(n => n.includes(AUTOSAVE))[0]
  const locallySaved = Object.keys(localStorage).filter(n => !n.includes(AUTOSAVE))
  locallySaved.sort((a, b) => {
    const p = (_) => {
      let ls: any = localStorage.getItem(_)
      if (!ls) return -1
      ls = stateFromJsmd(ls)
      return Date.parse(ls.lastSaved)
    }
    return p(b) - p(a)
  })
  return {
    autoSave,
    locallySaved,
  }
}

@action.bound getUserData() {
  //@ts-ignore
  return { userData: window.userData || {} }
}

@action.bound clearHistory(loadedState) {
  // TODO: Don't assign to passed parameter

  /* eslint-disable */
  // remove history and declared properties before exporting the this.
  this.userDefinedVarNames = []
  this.history = []
  this.externalDependencies = []
  this.executionNumber = 0
  this.cells = [...loadedState.cells.slice()]
  this.cells.forEach((cell) => {
    cell.evalStatus = undefined
    if (cell.cellType === 'code' || cell.cellType === 'external dependencies') cell.value = undefined
  })
  /* eslint-enable */
}

@action.bound clearUserDefinedVars(userDefinedVarNames) {
  // remove user defined variables when loading/importing a new/saved NB
  userDefinedVarNames.forEach((varName) => {
    try {
      delete window[varName]
    } catch (e) {
      console.log(e)
    }
  })
}

@observable initialVariables = new Set(Object.keys(window))
//initialVariables.add('__core-js_shared__')
//initialVariables.add('Mousetrap')
//initialVariables.add('CodeMirror')

@action notebookReducer = (action) => {
  let nextState
  let title
  let cells

  switch (action.type) {
    case 'NEW_NOTEBOOK':
      this.clearUserDefinedVars(this.userDefinedVarNames)
      return Object.assign(this.newNotebook(), this.getSavedNotebooks(), this.getUserData())

    case 'EXPORT_NOTEBOOK': {
      const exportState = Object.assign(
        {},
        //...this?
        { viewMode: action.exportAsReport ? 'presentation' : 'editor' },
      )

      if (action.exportToClipboard) {
        const jsmdStr = encodeURIComponent(exportJsmdToString(exportState))
        copy(`${window.location.href.split('?')[0]}?jsmd=${jsmdStr}`)
      } else {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(exportJsmdBundle(exportState))}`
        const dlAnchorElem = document.getElementById('export-anchor')
        dlAnchorElem.setAttribute('href', dataStr)
        title = this.title === undefined ? 'new-notebook' : this.title
        dlAnchorElem.setAttribute('download', titleToHtmlFilename(title))
        dlAnchorElem.click()
      }

     // return state  ..this?
    }

    case 'IMPORT_NOTEBOOK': {
    // note: loading a NB should always assign to a copy of the latest global
    // and per-cell state for backwards compatibility
      nextState = action.newState
      this.clearUserDefinedVars(this.userDefinedVarNames)
      this.clearHistory(nextState)
      cells = this.cells.map((cell, i) =>
        Object.assign(this.newCell(i, cell.cellType), cell))
      return Object.assign(
        this.blankState(), nextState, { cells }, this.getSavedNotebooks(),
        this.getUserData(),
      )
    }

    case 'SAVE_NOTEBOOK': {
      ( title  = this.title)
      let lastSaved
      if (!action.autosave) {
        lastSaved = (new Date()).toISOString()
      } 
      else {
        ({ lastSaved } = this.lastSaved)
        title = AUTOSAVE + title
      }
      Object.assign({}, this.lastSaved, {
        cells: this.cells.slice().map((c) => {
          const newC = Object.assign({}, c)
          newC.evalStatus = undefined
          if (newC.cellType === 'code' || newC.cellType === 'external dependencies') {
            newC.value = undefined
          }
          return newC
        }),
      }, { title: this.title })
      this.clearHistory(this.history)
      window.localStorage.setItem(title, stringifyStateToJsmd(this))
      return this.lastSaved = lastSaved , this.getSavedNotebooks()
    }

    case 'LOAD_NOTEBOOK': {
      this.clearUserDefinedVars(this.userDefinedVarNames)
      nextState = stateFromJsmd(window.localStorage.getItem(action.title))
      this.clearHistory(this.history)
      // note: loading a NB should always assign to a copy of the latest global
      // and per-cell state for backwards compatibility
      cells = this.cells.map((cell, i) =>
        Object.assign(this.newCell(i, cell.cellType), cell))
      return Object.assign(this.blankState(), nextState, this.getSavedNotebooks(), this.getUserData())
    }

    case 'DELETE_NOTEBOOK': {
      ({ title } = action)

      // FIXME: for some reason, airbnb-eslint doesn't like using hasOwnProperty
      // but changing to the recommended syntax breaks a test b/c our localStorage
      // mock is bare-bones. We could upgrade the mock or change the approach
      if (window.localStorage.hasOwnProperty(this.title)) { // eslint-disable-line
        window.localStorage.removeItem(this.title)
      }
      nextState = (
        (title === this.title) ?
          Object.assign({}, this.newNotebook()) :
          Object.assign({}, this)
      )
      return nextState
    }

    case 'CLEAR_VARIABLES': {
      return (
        this.clearUserDefinedVars(this.userDefinedVarNames),
        this.userDefinedVarNames = [],
        this.externalDependencies = []
      )
    }

    case 'CHANGE_PAGE_TITLE':
      return this.title = action.title

    case 'SET_VIEW_MODE': {
      const { viewMode } = action
      return this.viewMode = viewMode
    }

    case 'CHANGE_MODE': {
      const { mode } = action
      return this.mode = mode
    }

    case 'CHANGE_SIDE_PANE_MODE': {
      return this.sidePaneMode = action.mode
    }

    case 'CHANGE_SIDE_PANE_WIDTH': {
      const width = this.sidePaneWidth + action.widthShift
      return this.sidePaneWidth = width
    }

    case 'INCREMENT_EXECUTION_NUMBER': {
      return this.executionNumber +=1
    }

    case 'LOGIN_SUCCESS': {
      const { userData } = action
      return this.userData = userData
    }

    case 'LOGOUT': {
      return this.userData = {}
    }

    case 'APPEND_TO_EVAL_HISTORY': {
      const history = [...this.history]
      history.push({
        cellID: action.cellId,
        lastRan: new Date(),
        content: action.content,
      })
      return this.history = history
    }

    case 'UPDATE_USER_VARIABLES': {
     return Object.keys(window)
        .filter(g => !this.initialVariables.has(g))
        .forEach((g) => { this.userDefinedVarNames.push(g) })
    }

/*
    case 'UPDATE_APP_MESSAGES': {
      nextState = Object.assign({}, state)
      nextthis.appMessages = nextthis.appMessages.slice()
      return this.addAppMessageToState(nextState, Object.assign({}, action.message))
    }
*/
        case 'UPDATE_APP_MESSAGES': {
         return this.appMessages = action.message
    }

    case 'TEMPORARILY_SAVE_RUNNING_CELL_ID': {
      const { cellID } = action
      return this.runningCellID = cellID
    }

    case 'SAVE_ENVIRONMENT': {
      let newSavedEnvironment
      if (action.update) {
        newSavedEnvironment = Object.assign({}, this.savedEnvironment, action.updateObj)
      } else {
        newSavedEnvironment = action.updateObj
      }
      return this.savedEnvironment = newSavedEnvironment
    }

    case 'ADD_LANGUAGE': {
      return this.languages = action.languageDefinition
    }

    default: return {}
  }
}

@action cellReducer = (action) => {
  switch (action.type) {
    case 'INSERT_CELL': {
      const cells = this.cells.slice()
      const index = cells.findIndex(c => c.id === this.getSelectedCellId())
      const direction = (action.direction === 'above') ? 0 : 1
      const nextCell = this.newCell(this.newCellID(), 'code', this.languageLastUsed)
      cells.splice(index + direction, 0, nextCell)
      return this.cells = cells
    }

    case 'ADD_CELL': {
      const language = this.languageLastUsed
      const cells = this.cells.slice()
      const nextCell = this.newCell(this.newCellID(), action.cellType, language)
      return(
        this.cells = [...cells, nextCell],
        this.languageLastUsed = language
      )
    }

    case 'SELECT_CELL': {
      const cells = this.cells.slice()
      cells.forEach((c) => { c.selected = false })  // eslint-disable-line
      const index = cells.findIndex(c => c.id === action.id)
      const thisCell = cells[index]
      thisCell.selected = true
      if (action.scrollToCell) { scrollToCellIfNeeded(thisCell.id) }
      return this.cells = cells
    }

    case 'CELL_UP':
      scrollToCellIfNeeded(this.getSelectedCellId())
      return this.cells = moveCell(this.cells, this.getSelectedCellId(), 'up')
      

    case 'CELL_DOWN':
      scrollToCellIfNeeded(this.getCellBelowSelectedId())
      return this.cells = moveCell(this.cells, this.getSelectedCellId(), 'down')

    case 'UPDATE_CELL_PROPERTIES':
      return this.newStateWithPropsAssignedForCell(action.cellId, action.updatedProperties)

    case 'UPDATE_INPUT_CONTENT':
      return this.newStateWithSelectedCellPropertySet('content', action.content)

    case 'CHANGE_ELEMENT_TYPE':
      return this.newStateWithSelectedCellPropertySet('elementType', action.elementType)

    case 'CHANGE_DOM_ELEMENT_ID':
      return this.newStateWithSelectedCellPropertySet('domElementID', action.elemID)

    case 'CHANGE_CELL_TYPE': {
      const { language } = action
      const { rowSettings } = this.newCell(-1, action.cellType)
      return this.newStateWithSelectedCellPropsAssigned(
        {
          cellType: action.cellType,
          value: undefined,
          rendered: false,
          rowSettings,
          language,
        }),
        this.languageLastUsed = language
      
    }

    case 'SET_CELL_ROW_COLLAPSE_STATE': {
      let { cellId } = action
      if (cellId === undefined) { cellId = this.getSelectedCellId() }
      return this.newStateWithRowOverflowSet(
        cellId,
        action.rowType,
        action.viewMode,
        action.rowOverflow,
      )
    }

    case 'MARK_CELL_NOT_RENDERED':
      return this.newStateWithSelectedCellPropertySet('rendered', false)

    case 'DELETE_CELL': {
      const selectedId = this.getSelectedCellId()
      const cells = this.cells.slice()
      if (!cells.length) return 

      const index = cells.findIndex(c => c.id === selectedId)
      const thisCell = this.cells[index]
      if (thisCell.selected) {
        let nextIndex = 0
        if (cells.length > 1) {
          if (index === cells.length - 1) nextIndex = cells.length - 2
          else nextIndex = index + 1
          cells[nextIndex].selected = true
        }
      }
      
       return this.cells = cells.filter(cell => cell.id !== selectedId)
      
    }


// import MarkdownIt from 'markdown-it';
// import MarkdownItAnchor from 'markdown-it-anchor';
// import MarkdownItKatex from 'markdown-it-katex';

import * as MarkdownIt from 'markdown-it';
import * as MarkdownItAnchor from 'markdown-it-anchor';
import * as MarkdownItKatex from 'markdown-it-katex';

import { exportJsmdBundle, titleToHtmlFilename } from '../tools/jsmd-tools'
import { getCellById, isCommandMode } from '../tools/notebook-utils'
import {
  addExternalDependency,
  getSelectedCell,
} from './cell-reducer-utils'

import { waitForExplicitContinuationStatusResolution } from './evalQueue'

import { addLanguageKeybinding } from '../keybindings'

let evaluationQueue = Promise.resolve()

const MD = MarkdownIt({ html: true })
MD.use(MarkdownItKatex).use(MarkdownItAnchor)

const CodeMirror = require('codemirror') // eslint-disable-line

 temporarilySaveRunningCellID(cellID) {
  return {
    type: 'TEMPORARILY_SAVE_RUNNING_CELL_ID',
    cellID,
  }
}

 updateAppMessages(messageObj) {
  //     message.when = (new Date()).toString()
  //     message.details, when, message.
  const { message } = messageObj
  let { details, when } = messageObj
  if (when === undefined) when = new Date().toString()
  if (details === undefined) details = message
  return {
    type: 'UPDATE_APP_MESSAGES',
    message: { message, details, when },
  }
}

 importNotebook(newState) {
  return {
    type: 'IMPORT_NOTEBOOK',
    newState,
  }
}

 importFromURL(importedState) {
  return (dispatch) => {
    dispatch(importNotebook(importedState))
    dispatch(updateAppMessages({ message: 'Notebook successfully imported from URL.' }))
    return Promise.resolve()
  }
}

 exportNotebook(exportAsReport = false, exportToClipboard = false) {
  return {
    type: 'EXPORT_NOTEBOOK',
    exportAsReport,
    exportToClipboard,
  }
}

 saveNotebook(autosave = false) {
  return {
    type: 'SAVE_NOTEBOOK',
    autosave,
  }
}

 loadNotebook(title) {
  return {
    type: 'LOAD_NOTEBOOK',
    title,
  }
}

 deleteNotebook(title) {
  return {
    type: 'DELETE_NOTEBOOK',
    title,
  }
}

 newNotebook() {
  return {
    type: 'NEW_NOTEBOOK',
  }
}

 clearVariables() {
  return {
    type: 'CLEAR_VARIABLES',
  }
}

 changePageTitle(title) {
  return {
    type: 'CHANGE_PAGE_TITLE',
    title,
  }
}

 changeMode(mode) {
  return {
    type: 'CHANGE_MODE',
    mode,
  }
}

 setViewMode(viewMode) {
  return {
    type: 'SET_VIEW_MODE',
    viewMode,
  }
}

 updateInputContent(text) {
  return {
    type: 'UPDATE_INPUT_CONTENT',
    content: text,
  }
}

 changeCellType(cellType, language = 'js') {
  return (dispatch) => {
  //return (dispatch, getState) => {
    if (isCommandMode()) {
    //if (isCommandMode(getState())) {
      dispatch({
        type: 'CHANGE_CELL_TYPE',
        cellType,
        language,
      })
    }
  }
}

 appendToEvalHistory(cellId, content) {
  return {
    type: 'APPEND_TO_EVAL_HISTORY',
    cellId,
    content,
  }
}

// note: this function is NOT EXPORTED. It is a private function meant
// to be wrapped by other actions that will configure and dispatch it.
 updateCellProperties(cellId, updatedProperties) {
  return {
    type: 'UPDATE_CELL_PROPERTIES',
    cellId,
    updatedProperties,
  }
}

 incrementExecutionNumber() {
  return {
    type: 'INCREMENT_EXECUTION_NUMBER',
  }
}
 updateUserVariables() {
  return {
    type: 'UPDATE_USER_VARIABLES',
  }
}


function evaluateCodeCell(cell) {
  return (dispatch, getState) => {
    // this variable may get changed in eval.
    const state = getState()
    let output
    let evalStatus
    const code = cell.content
    const languageModule = state.languages[cell.language].module
    const { evaluator } = state.languages[cell.language]
    // this is one place where we have to directly mutate the DOM b/c we need
    // this to happen outside of React's update schedule. see also iodide-api/print.js
    document.getElementById(`cell-${cell.id}-side-effect-target`).innerHTML = ''
    dispatch(temporarilySaveRunningCellID(cell.id))
    try {
      output = window[languageModule][evaluator](code)
    } catch (e) {
      output = e
      evalStatus = 'ERROR'
    }
    const updateCellAfterEvaluation = () => {
      const cellProperties: any = { value: output, rendered: true }
      if (evalStatus === 'ERROR') cellProperties.evalStatus = evalStatus
      this.updateCellProperties(cell.id, cellProperties)
      this.incrementExecutionNumber()
      this.appendToEvalHistory(cell.id, cell.content)
      this.updateUserVariables()
    }

    const evaluation = Promise.resolve()
      .then(updateCellAfterEvaluation)
      .then(waitForExplicitContinuationStatusResolution)
      .then(() => this.temporarilySaveRunningCellID(undefined)))
    return evaluation
  }
}

@action evaluateMarkdownCell = (cell) => this.updateCellProperties(
    cell.id,
    {
      value: MD.render(cell.content),
      rendered: true,
      evalStatus: 'SUCCESS',
    },
  ))
}

@action evaluateResourceCell(cell) {
  return (dispatch, getState) => {
    const externalDependencies = [...getState().externalDependencies]
    const dependencies = cell.content.split('\n').filter(d => d.trim().slice(0, 2) !== '//')
    const newValues = dependencies
      .filter(d => !externalDependencies.includes(d))
      .map(addExternalDependency)

    newValues.forEach((d) => {
      if (!externalDependencies.includes(d.src)) {
        externalDependencies.push(d.src)
      }
    })

    const evalStatus = newValues.map(d => d.status).includes('error') ? 'ERROR' : 'SUCCESS'
    this.updateCellProperties(
      cell.id,
      {
        value: new Array(...[...cell.value || [], ...newValues]),
        rendered: true,
        evalStatus,
      },
    )
    if (newValues.length) {
      this.appendToEvalHistory(
        cell.id,
        `// added external dependencies:\n${newValues.map(s => `// ${s.src}`).join('\n')}`,
      )
    }
    dispatch(incrementExecutionNumber())
    dispatch(updateUserVariables())
  }
}

@action evaluateCSSCell = (cell) => updateCellProperties(
      cell.id,
      {
        value: cell.content,
        rendered: true,
        evalStatus: 'SUCCESS',
      })

@action
addLanguage = (languageDefinition) => this.languageDefinition,


function evaluateLanguagePluginCell(cell) {
  return (dispatch) => {
    let pluginData
    let value
    let evalStatus
    let languagePluginPromise
    const rendered = true
    try {
      pluginData = JSON.parse(cell.content)
    } catch (err) {
      value = `plugin definition failed to parse:\n${err.message}`
      evalStatus = 'ERROR'
    }

    if (pluginData.url === undefined) {
      value = 'plugin definition missing "url"'
      evalStatus = 'ERROR'
      dispatch(updateCellProperties(cell.id, { value, evalStatus, rendered }))
    } else {
      const {
        url, keybinding, languageId, displayName,
      } = pluginData

      languagePluginPromise = new Promise((resolve, reject) => {
        const xhrObj = new XMLHttpRequest()

        xhrObj.addEventListener('progress', (evt) => {
          value = `downloading plugin: ${evt.loaded} bytes loaded`
          if (evt.total > 0) {
            value += `out of ${evt.total} (${evt.loaded / evt.total}%)`
          }
          evalStatus = 'ASYNC_PENDING'
          dispatch(updateCellProperties(cell.id, { value, evalStatus, rendered }))
        })

        xhrObj.addEventListener('load', () => {
          value = `${displayName} plugin downloaded, initializing`
          dispatch(updateCellProperties(cell.id, { value, evalStatus, rendered }))
          // see the following for asynchronous loading of scripts from strings:
          // If it is simply evaling a code block, then it returns undefined.
          // But if it returns a Promise, then we can wait for that promise to resolve
          // before we continue execution.

          //@ts-ignore
          const pr = Promise.resolve(window.eval(xhrObj.responseText)) // eslint-disable-line no-eval

          pr.then(() => {
            value = `${displayName} plugin ready`
            evalStatus = 'SUCCESS'
            dispatch(addLanguage(pluginData))
            // FIXME: adding the keybinding move to a reducer ideally, but since it mutates
            // a part of global state in a snowflake sideffect-ish way, and since it
            // needs `dispatch` we'll do it here.
            if (keybinding.length === 1 && (typeof keybinding === 'string')) {
              addLanguageKeybinding(
                [keybinding],
                () => dispatch(changeCellType('code', languageId)),
              )
            }
            dispatch(updateCellProperties(cell.id, { value, evalStatus, rendered }))
            resolve()
          })
        })

        xhrObj.addEventListener('error', () => {
          value = `${displayName} plugin failed to load`
          evalStatus = 'ERROR'
          dispatch(updateCellProperties(cell.id, { value, evalStatus, rendered }))
          reject()
        })

        xhrObj.open('GET', url, true)
        xhrObj.send()
        CodeMirror.requireMode(pluginData.codeMirrorMode, () => { })
      })
    }
    return languagePluginPromise
  }
}

 evaluateCell(cellId) {
  return () {
    let evaluation
    let cell
    if (cellId === undefined) {
      cell = this.getSelectedCell()
    } else {
      cell = this.getCellById(this.cells, cellId)
    }
    // here is where we should mark a cell as PENDING.
    if (cell.cellType === 'code') {
      evaluationQueue = evaluationQueue
        .then(() => dispatch(evaluateCodeCell(cell)))
      evaluation = evaluationQueue
    } else if (cell.cellType === 'markdown') {
      evaluation = dispatch(evaluateMarkdownCell(cell))
    } else if (cell.cellType === 'external dependencies') {
      evaluation = dispatch(evaluateResourceCell(cell))
    } else if (cell.cellType === 'css') {
      evaluation = dispatch(evaluateCSSCell(cell))
    } else if (cell.cellType === 'plugin') {
      if (JSON.parse(cell.content).pluginType === 'language') {
        evaluationQueue = evaluationQueue.then(() => dispatch(evaluateLanguagePluginCell(cell)))
        evaluation = evaluationQueue
      } else {
        evaluation = this.updateAppMessages({ message: 'No loader for plugin type or missing "pluginType" entry' })
      }
    } else {
      cell.rendered = false
    }
    return evaluation
  }
}

 evaluateAllCells(cells) {
    let p = Promise.resolve()
    this.cells.forEach((cell) => {
      if (cell.cellType === 'css' && !cell.skipInRunAll) {
        p = p.then(() => this.evaluateCell(cell.id))
      }
    })
    this.cells.forEach((cell) => {
      if (cell.cellType === 'markdown' && !cell.skipInRunAll) {
        p = p.then(() => this.evaluateCell(cell.id))
      }
    })
    this.cells.forEach((cell) => {
      if (cell.cellType !== 'markdown' && cell.cellType !== 'css' && !cell.skipInRunAll) {
        p = p.then(() => this.evaluateCell(cell.id))
      }
    })
  }
}


 setCellRowCollapsedState(viewMode, rowType, rowOverflow, cellId) {
  return {
    type: 'SET_CELL_ROW_COLLAPSE_STATE',
    viewMode,
    rowType,
    rowOverflow,
    cellId,
  }
}

 cellUp() {
  return {
    type: 'CELL_UP',
  }
}

 cellDown() {
  return {
    type: 'CELL_DOWN',
  }
}

 insertCell(cellType, direction) {
  return {
    type: 'INSERT_CELL',
    cellType,
    direction,
  }
}

 addCell(cellType) {
  return {
    type: 'ADD_CELL',
    cellType,
  }
}

 selectCell(cellID, scrollToCell = false) {
  return {
    type: 'SELECT_CELL',
    id: cellID,
    scrollToCell,
  }
}

 deleteCell() {
  return {
    type: 'DELETE_CELL',
  }
}

 changeElementType(elementType) {
  return {
    type: 'CHANGE_ELEMENT_TYPE',
    elementType,
  }
}

 changeDOMElementID(elemID) {
  return {
    type: 'CHANGE_DOM_ELEMENT_ID',
    elemID,
  }

@action.bound setCellSkipInRunAll(value) {
  return (dispatch, getState) => {
    let setValue = value
    if (setValue === undefined) {
      setValue = !getSelectedCell(getState()).skipInRunAll
    }
    dispatch(updateCellProperties(
      getSelectedCell(getState()).id,
      { skipInRunAll: setValue },
    ))
  }
}



}}}