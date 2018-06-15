import * as React from 'react';
import styled from 'react-emotion';

const sanitizeValue = v => Math.abs(v.toFixed(3));

const _Equation = ({ className, a, b, c, d }) => {
  return <div className={className}>
    <span>y = </span>
    <span>{`${sanitizeValue(a)}x`}<sup>3</sup></span>
    <span>{`${b >= 0 ? ' + ' : ' - '}`}</span>
    <span>{`${sanitizeValue(b)}x`}<sup>2</sup></span>
    <span>{`${c >= 0 ? ' + ' : ' - '}`}</span>
    <span>{`${sanitizeValue(c)}x`}</span>
    <span>{`${d >= 0 ? ' + ' : ' - '}`}</span>
    <span>{`${sanitizeValue(d)}`}</span>
  </div>
};

export const Equation: any = styled(_Equation)({
  fontStyle: "italic",
  margin: ".25em 0"})

