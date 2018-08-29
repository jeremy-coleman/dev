import cellReducer from './cell-reducer';
import notebookReducer from './notebook-reducer';

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous,
    )
}

export default reduceReducers(notebookReducer, cellReducer)
