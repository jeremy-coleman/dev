//import * as React from 'react'
import { observer } from 'mobx-react';
import {withTheme} from 'theming'
import styled from 'styled-jss'


export const Background = withTheme(observer(styled('div')(({theme}) => ({
    background: theme.palette.primary.main,
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
}))))

export const BoxCentered = withTheme(observer(styled('div')(({theme}) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}))))

