import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz, DeviceHub, InsertChart, DataUsage, GridOn } from '@material-ui/icons';
import { Card, AppBar } from '@material-ui/core';
import { Row } from '../design';
import { style } from 'typestyle'
import { scale3d } from 'csx'
import {NavStore} from '../stores/NavStore'
import { FileCommandButtons } from './CommandBar';
import { ElectronCommandBarMenu } from './ElectronMenuIcons';

import {withTheme} from 'theming'

type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
};

const LinkStyle = style({
  color: 'white',
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



const Link: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goTo(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))


const ToolbarDimensions1 = styled(AppBar)({
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


export const WidgetNavBar1 = observer((props: any) => (
  <ToolbarDimensions {...props}>
            <RowContainer {...this.props}>
              <Link route="dashboard"><Dashboard /></Link>
              <Link route="notebook"><DeviceHub /></Link>
              <Link route="charts"><InsertChart /></Link>
              <Link route="datasets"><GridOn /></Link>
              <Link route="cloud"><Cloud /></Link>
              <Link route="settings"><Settings /></Link>
              <Link route="about"><HelpOutline /></Link>
            </RowContainer>
    </ToolbarDimensions>
  ))




const ToolbarDimensions = styled(AppBar)({
    display: "flex",
    position: 'relative',
    height: '30px',
    width: "100%",
    overflow: "hidden"
  });



  export const WidgetNavBar = observer((props: any) => (
    <ToolbarDimensions {...props}>
              <RowContainer {...this.props}>
            <FileCommandButtons/>
            <ElectronCommandBarMenu/>
              </RowContainer>
      </ToolbarDimensions>
    ))
  