import * as React from 'react';
import {observer, inject} from 'mobx-react'
import styled, { StyledFunction } from 'styled-components';
import { ButtonGroup, Button, Classes } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'
import { Route, Switch, HashRouter as Router, withRouter} from 'react-router-dom'
import { NotebookPage, DatasetsPage, PlotParams, CounterDemo, DiagramNodes, SettingsPage } from './views'
import { BlueprintNavIcon } from '../../../design';
import { NavigationStore } from '../../../stores';



interface INavProps {
  navigation: NavigationStore;
}


@inject('navigation')
@observer
export class WorkDrawerRoutes extends React.Component {
 render() {
const {navigation} = this.props as INavProps;
return(
<Router>
    <Switch>
          <Route path='/nbdrawer/counter' component={CounterDemo} />
          <Route path='/nbdrawer/diagramnodes' component={DiagramNodes} />
          <Route path='/nbdrawer/plotparams' component={PlotParams} />
          <Route path='/nbdrawer/notebook' component={NotebookPage} />
          <Route path='/nbdrawer/datasets' component={DatasetsPage} />
          <Route path='/nbdrawer/settings' component={SettingsPage} />
          <Route path='*' component={CounterDemo} />
    </Switch>
</Router>
)}}





export const IconNavBar  = observer(({vertical, large, size, props}: any) => (
            <ButtonGroup large={true} fill={true} {...props}>
                <BlueprintNavIcon icon={IconNames.CODE} size={25}  route="/nbdrawer/counter"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25}  route="/nbdrawer/diagramnodes"/>
                <BlueprintNavIcon icon={IconNames.SCATTER_PLOT} size={25}  route="/nbdrawer/plotparams"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25} route="/nbdrawer/diagramnodes"/>
            </ButtonGroup >
          
))


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


@observer
export class WorkspaceDrawer extends React.Component<any, any> {
    render(){
    const {...props} = this.props
    return(
        <Drawer width={props.width}>
            <IconNavBar/>
            <WorkDrawerRoutes/>
        </Drawer>
    )}
}

