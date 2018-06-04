import * as React from 'react';
import {observer} from 'mobx-react'
import styled from 'styled-components';
import { lighten } from 'polished';
import { HorizontalStretch } from '../design';


const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

let x ={  border: "1px solid orange",
  display: "flex",
  flexDirection: 'row',
  width: "100%",
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0}

const FooterDimensions = styled.div`
  border: 3px solid black;
  display: flex;
  height: 25px;
  width: 100%;
  flex-direction: row;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;

export const Footer = observer(props => (
  <FooterDimensions >
    <HorizontalStretch>
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
    </HorizontalStretch>
  </FooterDimensions>
))

