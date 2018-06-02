/*    "redux-devtools": "^3.3.2",
    "redux-devtools-extension": "^1.0.0",
    "redux-immutable-state-invariant": "^1.2.4",
		"redux-unhandled-action": "^1.2.0", */
		
	/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './reducer';

export default function configureStore(initialState = {}) {
  const enhancers = [];
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    const reduxImmutableState = require('redux-immutable-state-invariant');
    const reduxUnhandledAction = require('redux-unhandled-action').default;
    middleware.push(reduxImmutableState());
    middleware.push(reduxUnhandledAction(action => (
      // eslint-disable-next-line no-console
      console.error(`${action} didn't lead to creation of a new state object`)
    )));
  }

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, initialState, composeWithDevTools(...enhancers));

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
	


 export const installExtensions = async () => {
	const installer = require('electron-devtools-installer');
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

	return Promise.all(
		extensions.map(name => installer.default(installer[name], forceDownload))
	).catch(console.log);
};



if (process.env.NODE_ENV === 'production') {
	const sourceMapSupport = require('source-map-support');
	sourceMapSupport.install();
}

	require('electron-debug')();
	const path = require('path');
	
	const p = path.join(__dirname, '..', 'dist', 'node_modules');
  require('module').globalPaths.push(p);
  
  let mainUrl = `file://${__dirname}/app/index.html`;

if (process.env.NODE_ENV === 'development') {
	mainUrl = 'http://localhost:1212/index.html';
}


/*

app.on('ready', async () => {
		await installExtensions();
  
    // create window etc..
    
  }
  
  */
  
  import nosql from 'nosql';
import osenv from 'osenv';
import mkdirp from 'mkdirp';
import path from 'path';

const Repository = {
  name: 'untitled',
  start() {
    const databasePath = path.join(osenv.home(), '.goron', 'data');
    const filePath = path.join(databasePath, this.name);
    mkdirp.sync(databasePath);
    this.nosql = nosql.load(filePath);

    return this;
  }
};

export default Repository;