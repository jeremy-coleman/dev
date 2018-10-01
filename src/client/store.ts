/* global IODIDE_BUILD_MODE */
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { evaluateAllCells } from './actions/actions';
import { initializeNotebook } from './initialize-notebook';
import {createValidatedReducer} from './reducers/create-validated-reducer';
import {reducer} from './reducers/reducer';
import { stateSchema } from './state-prototypes';


let enhancer
let finalReducer

//@ts-ignore
if (IODIDE_BUILD_MODE === 'dev' || IODIDE_BUILD_MODE === 'devperf') {
  finalReducer = createValidatedReducer(reducer, stateSchema)
  enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger({
      predicate: (getState, action) => action.type !== 'UPDATE_INPUT_CONTENT',
    })),
  )
  //@ts-ignore
} else if (IODIDE_BUILD_MODE === 'test') {
  finalReducer = createValidatedReducer(reducer, stateSchema)
  enhancer = applyMiddleware(thunk)
} else {
  finalReducer = reducer
  enhancer = applyMiddleware(thunk)
}

const initialState = initializeNotebook()

const store = createStore(finalReducer, initialState, enhancer)

if (initialState.viewMode === 'presentation') {
  //@ts-ignore
  store.dispatch(evaluateAllCells(store.getState().cells, store)) 
}

console.log(stateSchema)

const { dispatch } = store

export { store, dispatch };
