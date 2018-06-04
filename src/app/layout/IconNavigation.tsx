import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
//import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz, DeviceHub, InsertChart, GridOn } from '@material-ui/icons';
import { Card } from '@material-ui/core';
import { ListItem, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import {NavStore} from '../stores/NavStore'
import {withTheme} from 'theming'





import AccountBalanceWallet from 'rmdi/lib/AccountBalanceWallet'
import Cloud from 'rmdi/lib/Cloud'
import Dashboard from 'rmdi/lib/Dashboard'
import HelpOutline from 'rmdi/lib/HelpOutline'
import Settings from 'rmdi/lib/Settings'
import SwapHoriz from 'rmdi/lib/SwapHoriz'
import DeviceHub from 'rmdi/lib/DeviceHub'
import InsertChart from 'rmdi/lib/InsertChart'
import GridOn  from 'rmdi/lib/GridOn'






type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
};


const Link: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' {...props}
    onClick={() => props.nav.goTo(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))



interface NavListIconProps {
    route: string;
    icon?: any;
    label?: string;
}

function _NavListIcon({ icon, label, route }: NavListIconProps) {
  return (
    <ListItem button component={props => <Link {...props as any} route={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
  }

export const NavListIcon = withTheme(_NavListIcon);



const LeftNavStylesContainer = styled(Card)({
    maxWidth: '64px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px',
    overflow: 'hidden'
})

export const IconNavBar = withTheme(observer((props: any) => (  
            <LeftNavStylesContainer {...props}>
              <NavListIcon route="dashboard" icon={<Dashboard />}/>
              <NavListIcon route="notebook" icon={<DeviceHub />}/>
              <NavListIcon route="charts" icon={<InsertChart />}/>
              <NavListIcon route="datasets" icon={<GridOn />}/>
              <NavListIcon route="cloud" icon={<Cloud />}/>
              <NavListIcon route="settings" icon={<Settings />}/>
              <NavListIcon route="about" icon={<HelpOutline />}/>
            </LeftNavStylesContainer>
  )));

/*
const VertFlexContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;
*/
/*
 export const IconNavigation  = observer(({fill, vertical, large, size, props}: BlueprintNavIconProps) => (        
            <StyledButtonGroup large={true} fill={true} vertical={true}>
                <BlueprintNavIcon>IconNames.DASHBOARD} size={35} large={true} route="/"/>
                <BlueprintNavIcon>IconNames.CODE} size={35} large={true} route="notebook"/>
                <BlueprintNavIcon>IconNames.CHART} size={35} large={true} route="charts"/>
                <BlueprintNavIcon>IconNames.DATABASE} size={35} large={true}  route="datasets"/>
                <BlueprintNavIcon>IconNames.GRAPH} size={35} large={true}  route="dashboard" />
                <BlueprintNavIcon>IconNames.CLOUD} size={35} large={true}  route="cloud"/>
                <BlueprintNavIcon>IconNames.COG} size={35} large={true}  route="settings"/>
                <BlueprintNavIcon>IconNames.HELP} size={35} large={true}  route="about"/>
            </StyledButtonGroup >
  ))
  */



//import styled from 'styled-components'

/*
const Container = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0px !important;
  list-style: none;
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  width: 50px !important;
  border-color: white;
  border: 10px;
`;

const VertFlexContainer = styled(ButtonGroup)`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MenuIcon = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;

export const MenuIconDivider = styled(MenuDivider)`
  width: 50px !important;
`;

const LeftNavSC = styled.div`
    width: 64px;
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
`
*/