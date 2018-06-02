import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import { Card, AppBar, Toolbar } from '@material-ui/core';
import { Row, FillParent } from '../../design';
import when from 'when-switch';
import { NavStore } from '../../stores/NavStore';

import {withTheme} from 'theming'

import { DashboardPage, DatasetsPage, NotebookPage, ChartsPage } from './tabs';
import { flex, vertical } from 'csstips';
import { style } from 'typestyle';
import { scale3d } from 'csx/lib';




export const Drawer = styled(Card)({
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    minHeight: '100%',
    right: 0
})

const ToolbarDimensions = styled(AppBar)({
  display: "flex",
  position: 'relative',
  height: 50,
  width: "100%",
  overflow: "hidden"
});

const RowContainer = styled('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});



const WidgetIconBar = withTheme(observer((props: any) => (  
      <ToolbarDimensions {...props}>
        <RowContainer {...this.props} style={{alignItems: 'space-between'}}>
              <ChartDrawerLink route='chartdrawer:charts'><SwapHoriz /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:dashboard'><Dashboard /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:datasets'><AccountBalanceWallet /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:notebook'><SwapHoriz /></ChartDrawerLink>          
        </RowContainer>
    </ToolbarDimensions>
  )))



const LinkStyle = style({
  color: 'black',
  textDecoration: 'none',
  transitionDuration: '0.3s',
  padding: [0, 10, 0, 10],
  $nest: {
    '&:hover': {
      color: '#6642C6',
      transform: scale3d(1.1, 1.1, 1.1)
    }
  }
})


type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
};

const ChartDrawerLink: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))



interface ChartDrawerProps {
  nav?: NavStore
  classes?: any
}

const ChartDrawerRouter = inject('nav')(observer((props: ChartDrawerProps) => (
  <div className={style(flex, vertical)} {...props}>
    {
      when(props.nav.chartDrawerRoute)
        .is('chartdrawer:charts', () => <ChartsPage />)
        .is('chartdrawer:datasets', () => <DatasetsPage />)
        .is('chartdrawer:notebook', () => <NotebookPage />)
        .is('chartdrawer:dashboard', () => <DashboardPage />)
        .else(() => <DashboardPage />)
    }
  </div>
)
))

export const WorkDrawer: React.SFC<any> = observer(props => (
    <div className={style(flex, vertical)}>
    <WidgetIconBar/>
    
    <ChartDrawerRouter/>
    </div>
))

