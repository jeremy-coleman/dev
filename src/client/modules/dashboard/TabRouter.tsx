import * as React from 'react'
import { observer, inject } from 'mobx-react';
import { FillParent } from '../../design';
import when from 'when-switch';
import { NavStore } from '../../stores/NavStore';
import { DataTab, SettingsTab, ModelTab, TrainTab } from './tabs';
import { flex, vertical } from 'csstips';
import { style } from 'typestyle';


import { ButtonGroup, Button,  IButtonProps } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'


export const MLDrawerToolbar  = observer((props: any) => (
            <ButtonGroup large={true} fill={true}>
              <ChartDrawerLink icon={IconNames.CODE} route='mldrawer:charts'/>
              <ChartDrawerLink icon={IconNames.GRAPH} route='mldrawer:dashboard'/>
              <ChartDrawerLink icon={IconNames.SCATTER_PLOT} route='mldrawer:datasets'/>
              <ChartDrawerLink icon={IconNames.GRAPH} route='mldrawer:notebook'/>
            </ButtonGroup >
          
))


type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
  className?: any
};


const ChartDrawerLink: React.SFC<LinkProps & IButtonProps> = inject('nav')(observer((props: LinkProps) => (
  <Button {...props}
    onClick={() => props.nav.goToMlDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </Button>
)))



interface ChartDrawerProps {
  nav?: NavStore
  classes?: any
}




const DashboardTabRouter = inject('nav')(observer((props: ChartDrawerProps) => (
  <div className={style(flex, vertical)} {...props}>
    {
      when(props.nav.mlDrawerRoute)
        .is('mldrawer:charts', () => <DataTab />)
        .is('mldrawer:datasets', () => <SettingsTab />)
        .is('mldrawer:notebook', () => <ModelTab />)
        .is('mldrawer:dashboard', () => <TrainTab />)
        .else(() => <TrainTab />)
    }
  </div>
)
))

export const DashboardTabRouterOutlet: React.SFC<any> = observer((props: any) => (
  <FillParent>
    <MLDrawerToolbar/>  
    <DashboardTabRouter/>
  </FillParent>
))








/*
//import { scale3d } from 'csx/lib';

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

const ChartDrawerLinkWORKS: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))
*/