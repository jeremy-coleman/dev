import * as React from 'react';
import {observer, inject} from 'mobx-react'
import styled, { StyledFunction } from 'styled-components';
import { ButtonGroup, Button, Classes } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'
import { Route, Switch, withRouter, HashRouter} from 'react-router-dom'
import { NotebookPage, DatasetsPage, PlotParams, CounterDemo, DiagramNodes, SettingsPage } from './views'
import { BlueprintNavIcon } from '../../../design';




//interface INavProps {navigation: NavigationStore}
//@inject('navigation')


let WorkDrawerRoutes = () =>
    <Switch>
          <Route path='/nbdrawer/counter' component={CounterDemo} />
          <Route path='/nbdrawer/diagramnodes' component={DiagramNodes} />
          <Route path='/nbdrawer/plotparams' component={PlotParams} />
          <Route path='/nbdrawer/notebook' component={NotebookPage} />
          <Route path='/nbdrawer/datasets' component={DatasetsPage} />
          <Route path='/nbdrawer/settings' component={SettingsPage} />
          <Route path='/nbdrawer/*' component={CounterDemo} />
    </Switch>
;


export const IconNavBar  = () => (
            <ButtonGroup large={true} fill={true}>
                <BlueprintNavIcon icon={IconNames.CODE} size={25}  route="/nbdrawer/counter"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25}  route="/nbdrawer/diagramnodes"/>
                <BlueprintNavIcon icon={IconNames.SCATTER_PLOT} size={25}  route="/nbdrawer/plotparams"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25} route="/nbdrawer/diagramnodes"/>
            </ButtonGroup >
          
)



const Drawer: any = styled.div`
    width: ${props => props.width || '160px'};
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
    right: 0;
`

let _WorkspaceDrawer = props =>
    <Drawer width={props}>
    <IconNavBar/>
        <Switch>
            <Route path="/nbdrawer" component={WorkDrawerRoutes} />
      </Switch>
    </Drawer>
;


export let WorkspaceDrawer: any = withRouter(_WorkspaceDrawer)


/*
export class WorkspaceDrawer extends React.Component<any, any>{
render(){
    return(
        <Switch>
        <Route path="/nbdrawer" component={WorkspaceDrawerComponent} />
      </Switch>)
}}
*/