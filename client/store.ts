
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

  finalReducer = reducer
  enhancer = applyMiddleware(thunk)

const initialState = initializeNotebook()

const store = createStore(finalReducer, initialState, enhancer)

if (initialState.viewMode === 'presentation') {
  //@ts-ignore
  store.dispatch(evaluateAllCells(store.getState().cells, store)) 
}

console.log(stateSchema)

const { dispatch } = store

export { store, dispatch };
