import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from '../containers/App';
import NotFoundPage from '../containers/NotFoundPage';
import AuthContainer from '../containers/auth.container';
import DashboardContainer from '../containers/dashboard.container';
import ProfileContainer from '../containers/profile.container';
import SearchContainer from '../containers/search.container';
import MessagingContainer from '../containers/messaging.container';
import NotebookContainer from '../containers/notebook.container';
import requireAuth from '../utils/requireAuth';


const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <App/>
                <div className="container-fluid mainBlock">
                    <div className="container">
                        <Switch>
                            <Route path='/' component={AuthContainer} exact/>
                            <Route path='/dashboard' component={DashboardContainer}/>
                            <Route path='/search' component={SearchContainer}/>
                            <Route path='/notebook' component={NotebookContainer}/>
                            <Route path='/messaging' component={requireAuth(MessagingContainer)}/>
                            <Route path='/notebook' component={requireAuth(NotebookContainer)}/>
                            <Route path='/profile' component={requireAuth(ProfileContainer)}/>
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);

export default Root;
