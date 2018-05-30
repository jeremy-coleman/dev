'use strict';
const electron = require('electron');
const AutoLaunch = require('auto-launch');

const app = electron.app;

const autoLaunchSettings = new AutoLaunch({
  name: 'Coglite',
  path: (process.platform === 'darwin') ? app.getPath('exe').replace(/\.app\/Content.*/, '.app') : undefined,
  isHidden: true
});

function activate() {
  // Activate app launch on login
  return autoLaunchSettings
    .isEnabled()
    .then(enabled => {
      if (!enabled) {
        return autoLaunchSettings.enable();
      }
    });
}

function deactivate() {
  // Deactivate app launch on login
  return autoLaunchSettings
    .isEnabled()
    .then(enabled => {
      if (enabled) {
        return autoLaunchSettings.disable();
      }
    });
}

module.exports = {activate, deactivate};
