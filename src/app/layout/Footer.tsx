//import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Row } from '../design';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import styled from 'styled-jss';
import { AppBar } from '@material-ui/core';

const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

type FooterProps = {
  classes?: any,
  children?: any
}

const FooterDimensions = styled(AppBar)({
  border: "1px solid orange",
  display: "flex",
  flexDirection: 'row',
  width: "100%",
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0
})

export const Footer = observer((P: FooterProps) => (
  <FooterDimensions >
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
  </FooterDimensions>
))
