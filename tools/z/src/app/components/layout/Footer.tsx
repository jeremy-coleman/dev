import * as React from 'react';
import {observer} from 'mobx-react'
import styled from 'styled-components';
import { lighten } from 'polished';


const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

const HorizontalFlex = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: stretch;
`;


const FooterDimensions = styled.div`
  border: 3px solid black;
  display: flex;
  height: 25px;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;

export const Footer = observer(props => (
  <FooterDimensions >
    <HorizontalFlex>
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
    </HorizontalFlex>
  </FooterDimensions>
))