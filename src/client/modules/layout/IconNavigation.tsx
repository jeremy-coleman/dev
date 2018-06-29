import * as React from 'react'
import { observer } from 'mobx-react';
import { IconNames } from '@blueprintjs/icons';
import {withTheme} from 'theming'
import styled from 'react-emotion'

import { Link } from '../../components/Link';

//@ts-ignore
const LeftNavStylesContainer = withTheme(styled('div')(({theme, props}) => ({
  maxWidth: 48,
  minWidth: 48,
  width: 48,
  minHeight: "100%",
  flex: "1 1 auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignmentBaseline: "central",
  overflow: "hidden",
  border: "3px solid white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
  backgroundColor: 'white'
})))


export const IconNavBar  = withTheme(observer((props) => (
      <LeftNavStylesContainer {...props}>
          <Link icon={IconNames.PROJECTS} large={true}  route="dashboard" />
          <Link icon={IconNames.GRAPH} large={true} route="notebook"/>
          <Link icon={IconNames.CHART} large={true} route="charts"/>
          <Link icon={IconNames.DATABASE} large={true}  route="datasets"/>
          <Link icon={IconNames.CLOUD} large={true}  route="cloud"/>
          <Link icon={IconNames.APPLICATIONS} large={true}  route="catalog"/>
          <Link icon={IconNames.COG} large={true}  route="settings"/>
          <Link icon={IconNames.HELP} large={true}  route="about"/>
      </LeftNavStylesContainer >
    )))


/*
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fill: theme.palette.primary.contrastText,

  const LeftNavStylesContainer = styled.div`
      max-width: 48px;
      min-width: 48px;
      width: 48px;
      min-height: 100%;
      flex: 1 1 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      alignment-baseline: central;
      overflow: hidden;
      border: 3px solid white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
      ;`
*/