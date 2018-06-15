import * as React from 'react';
//import styled from 'react-emotion';
import {DataChart} from './DataChart';
import {ErrorChart} from './ErrorChart';
import {ParametersInfo} from './ParametersInfo';

export const DataPlot: any = ({ className, a, b, c, d, trainingError, iteration, predictions,
  showTestData, testError, testData, trainingData }) => {
  return (
    <div className={className} style ={{padding: '1.3em'}}>
      <ParametersInfo a={a} b={b} c={c} d={d} error={trainingError} iteration={iteration} testError={testError} />
      <div style={{display: 'flex'}}>
        <DataChart testData={testData} trainingData={trainingData} predictions={predictions} showTestData={showTestData} />
        <ErrorChart label="train_error" error={trainingError} />
        <ErrorChart label="test_error" error={testError} />
      </div>
    </div>
  );
}

