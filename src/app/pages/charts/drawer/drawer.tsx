import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
//import {NavStore} from '../stores'
//import { Link } from './NavIcon';
import { Card, AppBar, Toolbar } from '@material-ui/core';
import { Row } from '../../../design';
import Link from '../../../components/Link';
import when from 'when-switch';
import { NavStore } from '../../../stores';

import { DashboardPage, DatasetsPage, NotebookPage, ChartsPage } from './routes';


export const Drawer = styled('div')({
    width: props => {props.width || '360px'},
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    right: 0
})

const WidgetIconBar = observer(() => (  
            <Toolbar {...this.props}>
              <ChartDrawerLink route='chartdrawer:charts'><SwapHoriz /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:dashboard'><Dashboard /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:datasets'><AccountBalanceWallet /></ChartDrawerLink>
              <ChartDrawerLink route='chartdrawer:notebook'><SwapHoriz /></ChartDrawerLink>          
            </Toolbar>
  ))


type LinkProps = {
  route: string
  nav?: NavStore
};

const ChartDrawerLink: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#'
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))



interface ChartDrawerProps {
  nav?: NavStore
}

const ChartDrawerRouter = inject('nav')(observer((props: ChartDrawerProps) => (
  <Row>
    {
      when(props.nav.chartDrawerRoute)
        .is('chartdrawer:charts', () => <ChartsPage />)
        .is('chartdrawer:datasets', () => <DatasetsPage />)
        .is('chartdrawer:notebook', () => <NotebookPage />)
        .is('chartdrawer:dashboard', () => <DashboardPage />)
        .else(() => <DashboardPage />)
    }
  </Row>
)
))

export const WorkDrawer: React.SFC<any> = observer(props => (
<Drawer width={props.width}>
<WidgetIconBar/>
<ChartDrawerRouter/>
</Drawer>
))