import {cellReducer} from './cell-reducer';
import {notebookReducer} from './notebook-reducer';

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous,
    )
}

let reducer = reduceReducers(notebookReducer, cellReducer);


export {reducer as default, reducer}