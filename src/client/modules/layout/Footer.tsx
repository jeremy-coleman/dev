import * as React from 'react'
import { observer } from 'mobx-react';
import { HorizontalStretch } from '../../design';


const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';



import {withTheme} from 'theming'
import styled from 'react-emotion'



//@ts-ignore
const FooterDimensions = withTheme(styled('div')(({theme}) => ({
  border: "3px solid black",
  display: "flex",
  maxHeight: 25,
  minHeight: 25,
  width: "100%",
  flexDirection: "row",
  position: "relative",
  bottom: 0,
  left: 0,
  right: 0,
  flexWrap: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
})))


export const StatusFooter = observer((props) => (
  <FooterDimensions >
    <HorizontalStretch>
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
    </HorizontalStretch>
  </FooterDimensions>
))



/*
const FooterDimensions1 = styled.div`
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
*/