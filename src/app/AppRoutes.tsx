import * as React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import { NotebookView, DatasetsPage, ChartsPage, DashboardPage, CloudPage, SettingsPage, AboutPage} from './pages'
import { WorkflowGraph } from './pages/WorkflowGraph/WorkflowGraph';


import { observer, inject } from 'mobx-react';


export let _AppRoutes = observer(() =>
    <Switch>
        <Route path='/pages/dashboard' component={DashboardPage} />
          <Route path='/pages/notebook' component={NotebookView} />
          <Route path='/pages/datasets' component={DatasetsPage} />
          <Route path='/pages/charts' component={ChartsPage} />
          <Route path='/pages/cloud' component={CloudPage} />
          <Route path='/pages/settings' component={SettingsPage} />
          <Route path='/pages/workflowgraph' component={WorkflowGraph} />
          <Route path='/pages/about' component={AboutPage} />
          <Route path='*' component={DashboardPage} />
    </Switch>
);

export let AppRoutes = withRouter(_AppRoutes)