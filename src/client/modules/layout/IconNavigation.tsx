import * as React from 'react'
import {withTheme} from 'theming'
import styled from 'styled-jss'


import { observer, inject } from 'mobx-react';
import { NavStore } from '../../stores/NavStore';

import { IconButton } from '@material-ui/core';

import Dashboard from '@material-ui/icons/Dashboard';


type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
  className?: any
  icon?: any
  iconText?: any
  children?: any
};

export const Link: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <IconButton {...props} onClick={() => props.nav.goTo(props.route)} color='inherit'>
  {props.icon}
</IconButton>
)))



//@ts-ignore
const LeftNavStylesContainer = withTheme(styled('div')(({theme}) => ({
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
  backgroundColor: 'white',
  color: theme.palette.primary.main
})))



export const IconNavBar  = withTheme(observer((props) => (
  <LeftNavStylesContainer {...props}>
      <Link icon={<Dashboard />}  route="dashboard" />
      <Link icon={<Dashboard />}  route="notebook"/>
      <Link icon={<Dashboard />}  route="charts"/>
      <Link icon={<Dashboard />}  route="datasets"/>
      <Link icon={<Dashboard />}  route="cloud"/>
      <Link icon={<Dashboard />}  route="catalog"/>
      <Link icon={<Dashboard />}  route="settings"/>
      <Link icon={<Dashboard />}  route="about"/>
  </LeftNavStylesContainer >
)))

/*
export const IconNavBar1  = withTheme(observer((props) => (
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
*/

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