import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import {logger} from 'redux-logger';

import Coglite from './reducers';
import {rootEpic} from './epics';
import configs from './services/configs';

const epicMiddleware = createEpicMiddleware(rootEpic);
const configureStore = () => {

    const history = createHistory();
    const middlewareHistory = routerMiddleware(history);

    const middlewares = [middlewareHistory, epicMiddleware, logger];


    return createStore(
        Coglite,
        composeWithDevTools( //future will be deleted in production mode
            applyMiddleware(...middlewares)
        )
    );
};

export default configureStore;
