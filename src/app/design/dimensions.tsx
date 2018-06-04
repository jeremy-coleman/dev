import * as React from 'react';
import styled from 'styled-components';

export const FillFlex =  styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const HorizontalStretch = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: stretch;
`;

export const VerticalStretch = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;
  justify-content: stretch;
`;

export const FillParent = styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: stretch;
`


export const CssClassWrapper = ({ children, className }) => (
  <span {...{ className }}>{children}</span>
);