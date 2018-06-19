import './App.css';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { RouterStore } from '../../stores/RouterStore';
import JsonFormatter from '../JsonFormatter/JsonFormatter';
import Qrcode from '../Qrcode/Qrcode';
import Sidebar from '../Sidebar/Sidebar';
import SqlFormatter from '../SqlFormatter/SqlFormatter';
import Top from '../Top/Top';
import { Footer } from './Footer';
import NotFound from './NotFound';

interface AppProps {
  router: RouterStore;
}


@inject('router')
@observer
class App extends React.Component {
  render() {
    const {router} = this.props as AppProps;
    return (
      <Router history={router.history}>
        <div className="App">
          <Sidebar />
          <div className="main">
            <Switch>
              <Route exact={true} path="/" component={Top}/>
              <Route path="/sql_formatter" component={SqlFormatter}/>
              <Route path="/json_formatter" component={JsonFormatter}/>
              <Route path="/qrcode" component={Qrcode}/>
              <Route component={NotFound}/>
            </Switch>   
          </div>
           <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
