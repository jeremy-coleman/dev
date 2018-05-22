import * as React from 'react';
import { withStyles, Paper} from 'material-ui';
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
//import { NavIcon } from './NavIcon';
import {observer} from 'mobx-react'
import styled, { StyledFunction } from 'styled-components';



interface DrawerProps {
    width?: any
}

const drawerDiv: StyledFunction<DrawerProps> = styled.div;

export const Drawer = drawerDiv`
    width: ${props => props.width || '360px'};
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
    right: 0;
`



import { MenuDivider, ButtonGroup, Button, IButtonProps } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'
import { Link } from 'react-router-dom';


export const IconNavBar  = observer(props => (               
            <ButtonGroup large={true} fill={true}>
                <Button icon={IconNames.MENU} large={true} onClick={handleClick}/>
                <Button icon={IconNames.DATABASE} large={true}  onClick={handleClick}/>
                <Button icon={IconNames.GRAPH} large={true}  onClick={handleClick}/>
                <Button icon={IconNames.COG} large={true}  onClick={handleClick} />
            </ButtonGroup >
          
        ))
    
function handleClick(e: React.SyntheticEvent<any>) {
        console.log("clicked", (e.target as HTMLElement).textContent);}
   

const _WorkDrawer = ({...props }) => (
<Drawer width={props.width}>
<IconNavBar/>
<WorkDrawerRoutes/>
</Drawer>
)

export const WorkDrawer = observer(_WorkDrawer)


import { HashRouter as Router, Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom'
import { NotebookPage, DatasetsPage, ChartsPage, DashboardPage, CloudPage, SettingsPage, AboutPage } from './WorkspaceDrawer'


type WorkDrawerRouteProps = any & RouteComponentProps<any, any>;

@observer
class _WorkDrawerRoutes extends React.Component<WorkDrawerRouteProps, any> {
 render() {
  return(
    <Switch>
        <Route path='/nbdrawer/dashboard' component={DashboardPage} />
          <Route path='/nbdrawer/notebook' component={NotebookPage} />
          <Route path='/nbdrawer/datasets' component={DatasetsPage} />
          <Route path='/nbdrawer/charts' component={ChartsPage} />
          <Route path='/nbdrawer/cloud' component={CloudPage} />
          <Route path='/nbdrawer/settings' component={SettingsPage} />
          <Route path='/nbdrawer/about' component={AboutPage} />
          <Route path='*' component={DashboardPage} />
    </Switch>
  )}}

export let WorkDrawerRoutes = withRouter(_WorkDrawerRoutes)



//const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
//export {LeftNav as default, LeftNav}


// add "label" if you want to use text ie: <NavIcon label="Portfolio" route="/" icon={<Dashboard />} />
