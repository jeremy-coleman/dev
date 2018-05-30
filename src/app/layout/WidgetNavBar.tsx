import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import { Card, AppBar } from '@material-ui/core';
import { Row } from '../design';
import { style } from 'typestyle'
import { scale3d } from 'csx'
import {NavStore} from '../stores/NavStore'


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


export const WidgetNavBar = observer((props: any) => (
  <ToolbarDimensions {...props}>
            <RowContainer {...this.props}>
              <Link route="dashboard"><Dashboard /></Link>
              <Link route="notebook"><SwapHoriz /></Link>
              <Link route="charts"><SwapHoriz /></Link>
              <Link route="datasets"><AccountBalanceWallet /></Link>
              <Link route="workflow"><SwapHoriz /></Link>
              <Link route="cloud"><Cloud /></Link>
              <Link route="settings"><Settings /></Link>
              <Link route="about"><HelpOutline /></Link>
            </RowContainer>
    </ToolbarDimensions>
  ))
