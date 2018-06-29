import * as React from 'react';
import {NumericParameter} from './NumericParameter';
import {Equation} from './Equation';
import styled from 'react-emotion';

const _ParametersInfo = ({ className, a, b, c, d, error, iteration, testError }) =>
  <div className={className}>
    <Equation a={a} b={b} c={c} d={d} />
    <div style={{margin: '.25em 0'}}>
      <NumericParameter label="training error" value={error[error.length - 1]} />
      <NumericParameter label="test error" value={testError[testError.length - 1]} />
      <NumericParameter label="iteration" value={iteration} round={0} />
    </div>
  </div>;

export const ParametersInfo: any = styled(_ParametersInfo)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1em"
})

/*
  .parameters {
    margin: .25em 0;
  }
  */