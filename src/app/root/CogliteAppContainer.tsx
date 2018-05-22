import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { CogliteApp } from './CogliteAppBase';
import { CogliteRoot } from './CogliteRoot';
import { Store } from '../stores';
import { NavigationStore } from '../stores/NavigationStore';

interface AppProps {
  nav?: NavigationStore
}

@inject('store')
@observer
class CogliteAppContainerBase extends React.Component<AppProps, any> {
render(){
const {nav} = this.props as Store
 return(
  <CogliteRoot>
    <HashRouter>
      <Switch>
        <Route path="/" component={CogliteApp} />
      </Switch>
    </HashRouter>
  </CogliteRoot>
 )}
}


export let CogliteAppContainer = hot(module)(CogliteAppContainerBase)