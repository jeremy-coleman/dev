
import * as React from 'react';
import {observer, inject} from 'mobx-react'
import styled, { StyledFunction } from 'styled-components';
import { ButtonGroup, Button, Classes } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'
import { Route, Switch, withRouter, HashRouter} from 'react-router-dom'
import { NotebookPage, DatasetsPage, ChartsPage, DashboardPage } from './routes'
import { BlueprintNavIcon } from '../../../design';


export let WorkDrawerRoutes = () =>
    <Switch>
          <Route path='/nbdrawer/dashboard' render={() => DashboardPage} />
          <Route path='/nbdrawer/notebook' component={NotebookPage} />
          <Route path='/nbdrawer/datasets' component={DatasetsPage} />
          <Route path='/nbdrawer/charts' component={ChartsPage} />
    </Switch>
;


export const ChartDrawerToolbar  = () => (
            <ButtonGroup large={true} fill={true}>
                <BlueprintNavIcon icon={IconNames.CODE} size={25}  route="/nbdrawer/counter"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25}  route="/nbdrawer/diagramnodes"/>
                <BlueprintNavIcon icon={IconNames.SCATTER_PLOT} size={25}  route="/nbdrawer/plotparams"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={25} route="/nbdrawer/diagramnodes"/>
            </ButtonGroup >
          
)
