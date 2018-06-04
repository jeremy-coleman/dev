import * as React from 'react'
import { Navbar,NavbarGroup ,NavbarDivider , Alignment, Button} from "@blueprintjs/core";
import { observer } from 'mobx-react';
import styled from 'styled-components'
import { lighten } from 'polished';
import { HorizontalStretch } from '../design';


const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';


const FooterDimensions = styled.div`
  border: 3px solid black;
  display: flex;
  max-height: 25px;
  min-height: 25px;
  width: 100%;
  flex-direction: row;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => lighten(0.1, props.theme.main)};
  flex-wrap: none;
`;

export const StatusFooter = observer(props => (
  <FooterDimensions >
    <HorizontalStretch>
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
    </HorizontalStretch>
  </FooterDimensions>
))

