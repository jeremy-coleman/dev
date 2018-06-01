
#1
https://github.com/apoterenko/redux-effects-promise 
@EffectsPromise or something

#2
https://github.com/Brooooooklyn/redux-epics-decorator
@namespace('thing')
@Effect
etc

#3
https://github.com/piotr-oles/redux-executor#readme
import { handleCommand } from 'redux-executor';

export const sequenceCommandExecutor = handleCommand(
  'SEQUENCE()',
  (command, dispatch) => command.payload.reduce(
    (promise, command) => promise.then(() => dispatch(command).promise || Promise.resolve()),
    Promise.resolve()
  )
);

export const parallelCommandExecutor = handleCommand(
  'PARALLEL()',
  (command, dispatch) => Promise.all(
    command.payload.map(command => dispatch(command).promise || Promise.resolve())
  ).then(() => undefined) // we should return Promise<void> because we should not rely on promise result
);

other good flow control too


#4
https://github.com/piotr-oles/redux-detector

export function createLimitExceedDetector(limit, action) {
  return function limitExceedDetector(prevState, nextState) {
    if (prevState <= limit && nextState > limit) {
      return action;
    }
  }
}

// ./detectors/rowsLimitExceedDetector.js
import { mountDetector } from 'redux-detector';
import { createLimitExceeedDetector } from './limitExceedDetector';

export const rowsLimitExceedDetector = mountDetector(
  state => state.rows.length,
  createLimitExceedDetector(100, ROWS_LIMIT_EXCEEDED)

#5
https://github.com/sibnerian/selector-action

export function reloadActiveItem() {
    // We can access the current state by returning a thunk.
  return (dispatch, getState) => {
    const state = getState();
    const activeId = activeIdSelector(state);
    // Now we just have to dispatch the action...
    return dispatch({
      type: 'RELOAD_ACTIVE_ITEM',
      promise: fetch(`//website.com/items/${activeId}`),
    });
  };
}

#6
https://github.com/ascension/recon/blob/master/src/recon.js
redux-controller..not so good


#7
https://github.com/l2silver/create-selector-without-props/blob/master/index.js
create selector without props? idk
module.exports = function(){
    var args = Array.prototype.slice.call(arguments, 0, -1);
    var resultFunction = Array.prototype.slice.call(arguments, -1);
    var memoizedArgs = [];
    var memoizedResult;
    var changed = false;


    function callArgsFunctionWithState(state, func, index) {
        var result = func(state);
        if(result !== memoizedArgs[index]){
            changed = true;
            memoizedArgs[index] = result;
        }
    }
    return function(state){
        args.forEach(callArgsFunctionWithState.bind(null, state));
        if(changed){
            memoizedResult = resultFunction[0].apply(null, memoizedArgs);
        }
        changed = false;
        return memoizedResult;
    }
}


import decamelize from 'decamelize'
import pluralize from 'pluralize'

export function generateActionName(name){
  return decamelize(name).toUpperCase()
}

#8 
https://github.com/l2silver/resource-action-types/blob/master/src/index.js
export function reorder(name){return 'REORDER_' + generateActionName(pluralize(name, 1))}
export function link(name){return 'LINK_' + generateActionName(pluralize(name, 1))}
export function unlink(name){return 'UNLINK_' + generateActionName(pluralize(name, 1))}
export function createRelationship(name){return 'INDEX_LINK_' + generateActionName(pluralize(name, 1))}
export function indexRelationship(name){return 'INDEX_RELATIONSHIP_' + generateActionName(pluralize(name, 1))}
export function concatRelationship(name){return 'CONCAT_RELATIONSHIP_' + generateActionName(pluralize(name, 1))}
export function create(name){return 'CREATE_' + generateActionName(pluralize(name, 1))}
export function update(name){return 'UPDATE_' + generateActionName(pluralize(name, 1))}
export function remove(name){return 'REMOVE_' + generateActionName(pluralize(name, 1))}
export function get(name){return 'GET_' + generateActionName(pluralize(name, 1))}
export function index(name){return 'INDEX_' + generateActionName(pluralize(name, 1))}

export default {
  link,
  unlink,
  createRelationship,
  indexRelationship,
  create,
  update,
  remove,
  get,
  index,
  reorder,
  concatRelationship,
}

#9
 https://github.com/l2silver/fantasy-baseball-frontend-react
using zscore 

#10
https://github.com/Dash-OS/redux-saga-process
Assign sagas to different processes...good later on


#11
https://github.com/Dash-OS/redux-css
redux-css lol

#12
https://github.com/Dash-OS/saga-task-manager
assign saga to tasks for forked processes...good later on

#13 
https://github.com/Dash-OS/saga-observable
uses a promise queue for saga future actions

https://github.com/brookemitchell/ramda-reselect

import createSelector from 'ramda-reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }