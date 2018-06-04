import * as React from 'react'
import { observer, inject } from 'mobx-react';
import { Row, FillParent } from '../../design';
import when from 'when-switch';
import { NavStore } from '../../stores/NavStore';
import { DashboardPage, DatasetsPage, NotebookPage, ChartsPage } from './tabs';
import { flex, vertical } from 'csstips';
import { style } from 'typestyle';
import { scale3d } from 'csx/lib';


import styled, { StyledFunction } from 'styled-components';
import { ButtonGroup, Button, Classes, IButtonProps } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'

//import { BlueprintNavIcon } from '../../../design';



export const ChartDrawerToolbar  = observer((props: any) => (
            <ButtonGroup large={true} fill={true}>
              <ChartDrawerLink icon={IconNames.CODE} route='chartdrawer:charts'/>
              <ChartDrawerLink icon={IconNames.GRAPH} route='chartdrawer:dashboard'/>
              <ChartDrawerLink icon={IconNames.SCATTER_PLOT} route='chartdrawer:datasets'/>
              <ChartDrawerLink icon={IconNames.GRAPH} route='chartdrawer:notebook'/>
            </ButtonGroup >
          
))


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
  className?: any
};

const ChartDrawerLinkWORK: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))

const ChartDrawerLink: React.SFC<LinkProps & IButtonProps> = inject('nav')(observer((props: LinkProps) => (
  <Button {...props}
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </Button>
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

export const WorkDrawer: React.SFC<any> = observer((props: any) => (
  <FillParent>
    <ChartDrawerToolbar/>  
    <ChartDrawerRouter/>
  </FillParent>
))

