export = 0;
import "reflect-metadata"
import {ipcRenderer} from 'electron'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore  from './store';
import Root from './routes/Root'



setTimeout(() => {ipcRenderer.send('status', 'ready');}, 50);   // Tell main thread we are ready.

let clientInstance: any

// Handle data updates
ipcRenderer.on('data', (event, data, filename) => {
  clientInstance.setFilename(filename);
  clientInstance.updateData({
    values: data,
  });
});

// Handle spec updates
ipcRenderer.on('spec', (event, spec, filename) => {
  clientInstance.setFilename(filename);
  clientInstance.setSpec(spec);
});


// Handle application state updates and requests
ipcRenderer.on('applicationState', (event, arg) => {
  const { msg, payload } = arg;
  switch (msg) {
    case 'getState':
      ipcRenderer.send('applicationState', {
        msg: 'getState',
        payload: clientInstance.getApplicationState(),
      });
      break;
    case 'setState':
      clientInstance.setApplicationState(payload);
      break;
    default:
      break;
  }
});


const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);
