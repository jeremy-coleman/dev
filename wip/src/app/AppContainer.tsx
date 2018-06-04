import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { DevRoot } from './DevRoot';
import App from './AppComponent';
import { Store } from './stores';
import { NavigationStore } from './stores/NavigationStore';
import { FillParent, VerticalStretch } from './design';


interface AppProps {
  navigation?: NavigationStore
}


@inject('store')
@observer
class CogliteAppContainerBase extends React.Component<AppProps, any> {
render(){
const {navigation} = this.props
 return(
  <HashRouter>
    <DevRoot>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </DevRoot>
  </HashRouter>
 )}
}


export let CogliteAppContainer = hot(module)(CogliteAppContainerBase)