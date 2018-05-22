import * as React from 'react'
import { Router, Route, Switch, withRouter} from 'react-router-dom'
import { observer, inject } from 'mobx-react';

import { NavigationStore } from './stores/NavigationStore';
import { NotebookView } from './pages/notebook/View';
import { NotebookPage, DatasetsPage, ChartsPage, DashboardPage, CloudPage, SettingsPage, AboutPage, WorkflowGraph} from './pages'


interface INavProps {
  navigation: NavigationStore;
}


@inject('navigation')
@observer
export class AppRoutes extends React.Component {
 render() {
  const {navigation} = this.props as INavProps;
  return(
  <Router history={navigation.history}>
    <Switch>
        <Route path='/pages/dashboard' component={DashboardPage} />
          <Route path='/pages/notebook' component={NotebookPage} />
          <Route path='/pages/datasets' component={DatasetsPage} />
          <Route path='/pages/charts' component={ChartsPage} />
          <Route path='/pages/cloud' component={CloudPage} />
          <Route path='/pages/settings' component={SettingsPage} />
          <Route path='/pages/workflowgraph' component={NotebookView} />
          <Route path='/pages/about' component={AboutPage} />
          <Route path='*' component={DashboardPage} />
    </Switch>
  </Router>
  )}}

//export let AppRoutes = withRouter(_AppRoutes)