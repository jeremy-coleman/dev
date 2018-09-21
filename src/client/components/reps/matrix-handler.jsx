import React from 'react';
import nb from '../../tools/nb';
import { makeMatrixText, SimpleTable } from './pretty-matrix';

export default {
  shouldHandle: (value, inContainer) => !inContainer && nb.isMatrix(value),

  render: (value) => {
    const shape = nb.shape(value)
    const dataSetInfo = `${shape[0]} × ${shape[1]} matrix (array of arrays)`
    const tabledata = makeMatrixText(value, [10, 10])
    return (
      <div>
        <div className="data-set-info">{dataSetInfo}</div>
        <SimpleTable tabledata={tabledata} />
      </div>
    )
  },
}
