'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const fs = require('fs-extra');
const config = require('./config');
const update = require('./update');

const app = electron.app;
const appName = app.getName();
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const globalShortcut = electron.globalShortcut;
const join = path.join;
const platform = process.platform;
const resolve = path.resolve;
const shell = electron.shell;

let configData;
let defaultConfigPath; // Default config file directory
const oaJSON = '.ao.json'; // Config file name
const homeDir = os.homedir();
const homeConfig = join(homeDir, oaJSON); // Config file on home directory
const keymapsDir = resolve(__dirname, 'keymaps'); // Keymaps directory

const sourceURL = 'https://github.com/klauscfhq/ao';
const homepageURL = 'https://klauscfhq.github.io/ao';
const communityURL = 'https://gitter.im/klauscfhq/ao';
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';
const searchURL = 'https://github.com/search?q=+is:issue+repo:klauscfhq/ao';
const licenseURL = 'https://github.com/klauscfhq/ao/blob/master/license.md';
const keyboardShortcutsRefURL = 'https://github.com/klauscfhq/ao#keyboard-shortcuts';
const searchFeatureRequestsURL = 'https://github.com/klauscfhq/ao/labels/feature-request';

function getPath() {
  // Retrieve the default path of the platform-dedicated config file
  switch (platform) {
    case ('darwin'):
      defaultConfigPath = join(keymapsDir, 'darwin.json');
      break;

    case ('linux'):
      defaultConfigPath = join(keymapsDir, 'linux.json');
      break;

    case ('win32'):
      defaultConfigPath = join(keymapsDir, 'win32.json');
      break;

    default:
      defaultConfigPath = join(keymapsDir, 'linux.json');
      break;
  }
  return defaultConfigPath;
}

function getConfig() {
  // Get the dedicated config file for each platform
  const defaultConfig = getPath();
  // Create a new default config file if it does not already exist
  if (!fs.existsSync(homeConfig)) {
    try {
      fs.copySync(defaultConfig, homeConfig);
      console.log('Ao config file was created successfully');
    } catch (err) {
      console.error(err);
    }
  }
  // Parse the content of the config file
  try {
    configData = JSON.parse(fs.readFileSync(homeConfig, 'utf8'));
  } catch (err) {
    console.log('Invalid JSON object');
  }
  return configData;
}

// Get the user-defined settings
const aoConfig = getConfig();

function setAcc(custom, predefined) {
  // Return the custom or predefined shortcut keys
  if (Object.prototype.hasOwnProperty.call(aoConfig.shortcutKeys, custom)) {
    return aoConfig.shortcutKeys[custom];
  }
  return predefined;
}

function activate(custom) {
  const [appWindow] = BrowserWindow.getAllWindows();

  if (process.platform === 'darwin') {
    appWindow.restore();
  }

  appWindow.webContents.send(custom);
}

function showWin() {
  // Bring main app window on top if not visible or focused
  const appWindow = BrowserWindow.getAllWindows()[0];
  if (!appWindow.isVisible() || !appWindow.isFocused()) {
    appWindow.show();
    appWindow.focus();
  }
}

function toggleWin() {
  // Toggle/untoggle main app window
  const appWindow = BrowserWindow.getAllWindows()[0];
  if (appWindow.isVisible() && appWindow.isFocused()) {
    appWindow.hide();
    appWindow.blur();
  } else {
    appWindow.show();
    appWindow.focus();
  }
}

function registerGlobalShortcuts() {
  const globalToggleAo = globalShortcut.register(
    // Global shortcut key for toggling/untoggling main app window
    setAcc('global-toggle-ao', 'Shift+Alt+A'), () => {
      toggleWin();
    });

  const globalSearchTodo = globalShortcut.register(
    // Global shortcut key for todo searching
    setAcc('global-search', 'Shift+Alt+F'), () => {
      showWin();
      activate('search');
    });

  const globalCreateTodo = globalShortcut.register(
    // Global shortcut key for todo creation
    setAcc('global-new-todo', 'Shift+Alt+C'), () => {
      showWin();
      activate('new-todo');
    });

  if (globalToggleAo && globalSearchTodo && globalCreateTodo) {
    console.log('Successfully registered global shortcut keys');
  } else {
    console.log('Global shortcut keys registration failed');
  }
}

function requestAppRestart() {
  // Display restart dialog on settings update
  const result = dialog.showMessageBox({
    icon: path.join(__dirname, 'static/Icon.png'),
    title: 'Restart Required',
    message: 'Restart Ao to activate new settings',
    detail: 'Would you like to restart now?',
    buttons: ['Restart', 'Dismiss'],
    defaultId: 0, // Make `Restart` the default action button
    cancelId: 1
  });
  // Check whether the restart button was pressed
  if (result === 0) {
    app.quit();
    app.relaunch();
  }
}

function confirmSignOut() {
  // Display sign-out confirmation dialog
  const result = dialog.showMessageBox({
    icon: path.join(__dirname, 'static/Icon.png'),
    title: 'Sign out Confirmation',
    message: 'Sign out of Ao',
    detail: 'Are you sure you want to sign out?',
    buttons: ['Sign out', 'Dismiss'],
    defaultId: 0, // Make `Sign out` the default action button
    cancelId: 1
  });
  // Check whether the sign-out button was pressed
  if (result === 0) {
    activate('sign-out');
  }
}

const helpSubmenu = [{
  label: `View License`,
  click() {
    shell.openExternal(licenseURL);
  }
}, {
  label: 'Version ' + app.getVersion(),
  enabled: false
}, {
  label: `Ao Homepage`,
  click() {
    shell.openExternal(homepageURL);
  }
}, {
  label: `Check for Update`,
  click() {
    update.manualUpdateCheck();
  }
}, {
  label: `Update Check Frequency`,
  submenu: [{
    label: 'Once Every 2 Hours',
    type: 'checkbox',
    checked: (config.get('updateCheckPeriod') === '2h'),
    click() {
      config.set('updateCheckPeriod', '2h');
      requestAppRestart();
    }
  }, {
    label: 'Once Every 6 Hours',
    type: 'checkbox',
    checked: (config.get('updateCheckPeriod') === '6h'),
    click() {
      config.set('updateCheckPeriod', '6h');
      requestAppRestart();
    }
  }, {
    label: 'Once Every 12 Hours',
    type: 'checkbox',
    checked: (config.get('updateCheckPeriod') === '12h'),
    click() {
      config.set('updateCheckPeriod', '12h');
      requestAppRestart();
    }
  }, {
    label: 'Once a Day',
    type: 'checkbox',
    checked: (config.get('updateCheckPeriod') === '24h'),
    click() {
      config.set('updateCheckPeriod', '24h');
      requestAppRestart();
    }
  }]
}, {
  type: 'separator'
}, {
  label: 'Keyboard Shortcuts Reference',
  click() {
    shell.openExternal(keyboardShortcutsRefURL);
  }
}, {
  type: 'separator'
}, {
  label: 'Fork Source',
  click() {
    shell.openExternal(sourceURL);
  }
}, {
  label: `Report Issue`,
  click() {
    shell.openExternal(issueURL);
  }
}, {
  label: `Search Issues`,
  click() {
    shell.openExternal(searchURL);
  }
}, {
  label: `Search Feature Requests`,
  click() {
    shell.openExternal(searchFeatureRequestsURL);
  }
}, {
  label: `Community Discussion`,
  click() {
    shell.openExternal(communityURL);
  }
}];

if (process.platform !== 'darwin') {
  helpSubmenu.push({
    type: 'separator'
  }, {
    role: 'about',
    click() {
      electron.dialog.showMessageBox({
        title: `About Ao`,
        message: `Ao ${app.getVersion()} (${os.arch()})`,
        detail: 'Created by Klaus Sinani',
        icon: path.join(__dirname, 'static/Icon.png'),
        buttons: ['OK']
      });
    }
  });
}

const darwinTpl = [{
  label: appName,
  submenu: [{
    role: 'about'
  }, {
    type: 'separator'
  }, {
    role: 'services',
    submenu: []
  }, {
    type: 'separator'
  }, {
    role: 'hide'
  }, {
    role: 'hideothers'
  }, {
    role: 'unhide'
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  label: 'File',
  submenu: [{
    label: 'Search',
    accelerator: 'CmdorCtrl+F',
    click() {
      activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'List',
    submenu: [{
      label: 'New List',
      accelerator: setAcc('new-list', 'CmdorCtrl+L'),
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: setAcc('delete-list', 'CmdorCtrl+Shift+D'),
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: setAcc('rename-list', 'CmdorCtrl+Y'),
      click() {
        activate('rename-list');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Hide Completed Todos',
      accelerator: setAcc('hide-todo', 'CmdorCtrl+Shift+H'),
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: setAcc('new-todo', 'CmdorCtrl+N'),
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: setAcc('delete-todo', 'CmdorCtrl+D'),
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: setAcc('rename-todo', 'CmdorCtrl+T'),
      click() {
        activate('rename-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Add to My Day',
      accelerator: setAcc('add-my-day', 'CmdorCtrl+K'),
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: setAcc('complete-todo', 'CmdorCtrl+Shift+N'),
      click() {
        activate('complete-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Set Reminder',
      accelerator: setAcc('set-reminder', 'CmdorCtrl+Shift+E'),
      click() {
        activate('set-reminder');
      }
    }, {
      label: 'Add Due Date',
      accelerator: setAcc('add-due-date', 'CmdorCtrl+Shift+T'),
      click() {
        activate('add-due-date');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: setAcc('my-day', 'CmdorCtrl+M'),
    click() {
      activate('my-day');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: setAcc('toggle-cortana', 'CmdorCtrl+E'),
    click() {
      activate('toggle-cortana');
    }
  }, {
    label: 'Return to Todos',
    accelerator: setAcc('return', 'Esc'),
    click() {
      activate('return');
    }
  }, {
    type: 'separator'
  }, {
    label: 'To-Do Settings',
    accelerator: setAcc('settings', 'CmdorCtrl+,'),
    click() {
      activate('settings');
    }
  }, {
    label: 'Launch on Start',
    type: 'checkbox',
    checked: config.get('autoLaunch'),
    click(item) {
      config.set('autoLaunch', item.checked);
      activate('auto-launch');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Edit Shortcut Keys',
    accelerator: 'CmdorCtrl+.',
    click() {
      activate('edit-shortcuts');
    }
  }, {
    label: 'Enable Global Shortcut Keys',
    type: 'checkbox',
    checked: config.get('useGlobalShortcuts'),
    click(item) {
      config.set('useGlobalShortcuts', item.checked);
      requestAppRestart();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Sign out',
    accelerator: setAcc('sign-out', 'CmdorCtrl+Alt+Q'),
    click() {
      confirmSignOut();
    }
  }]
}, {
  label: 'Edit',
  submenu: [{
    type: 'separator'
  }, {
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Font Size Options',
    submenu: [{
      label: 'Make Text Larger',
      accelerator: 'CmdOrCtrl+Plus',
      click() {
        activate('zoom-in');
      }
    }, {
      label: 'Make Text Smaller',
      accelerator: 'CmdOrCtrl+-',
      click() {
        activate('zoom-out');
      }
    }, {
      label: 'Reset Zoom Level',
      accelerator: 'CmdOrCtrl+0',
      click() {
        activate('zoom-reset');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [{
      label: 'Sepia Theme',
      accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
      click() {
        activate('toggle-sepia-mode');
      }
    }, {
      label: 'Black Theme',
      accelerator: setAcc('toggle-black-mode', 'CmdOrCtrl+B'),
      click() {
        activate('toggle-black-mode');
      }
    }, {
      label: 'Dark Theme',
      accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
      click() {
        activate('toggle-dark-mode');
      }
    }, {
      label: 'Vibrant Theme',
      accelerator: setAcc('toggle-vibrant-mode', 'CmdOrCtrl+Alt+U'),
      click() {
        activate('toggle-vibrant-mode');
      }
    }, {
      label: 'Vibrant Dark Theme',
      accelerator: setAcc('toggle-vibrant-dark-mode', 'CmdOrCtrl+Alt+J'),
      click() {
        activate('toggle-vibrant-dark-mode');
      }
    }]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: config.get('autoNightMode'),
    accelerator: 'CmdorCtrl+Alt+N',
    click(item) {
      config.set('autoNightMode', item.checked);
      activate('auto-night-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Navigate to Next List',
    accelerator: 'CmdorCtrl+Tab',
    click() {
      activate('next-list');
    }
  }, {
    label: 'Navigate to Previous List',
    accelerator: 'CmdorCtrl+Shift+Tab',
    click() {
      activate('previous-list');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Always on Top',
    type: 'checkbox',
    checked: config.get('alwaysOnTop'),
    accelerator: 'CmdorCtrl+Shift+P',
    click(item, focusedWindow) {
      config.set('alwaysOnTop', item.checked);
      focusedWindow.setAlwaysOnTop(item.checked);
    }
  }, {
    label: 'Toggle Side Bar',
    type: 'checkbox',
    checked: !config.get('sideBarHidden'),
    accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: 'Ctrl+Command+F',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: 'Alt+Command+I',
    click: (item, focusedWindow) => {
      focusedWindow.toggleDevTools();
    }
  }]
}, {
  role: 'window',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }, {
    type: 'separator'
  }, {
    type: 'separator'
  }, {
    role: 'front'
  }, {
    role: 'togglefullscreen'
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const otherTpl = [{
  label: 'File',
  submenu: [{
    label: 'Search',
    accelerator: 'CmdorCtrl+F',
    click() {
      activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'List',
    submenu: [{
      label: 'New List',
      accelerator: setAcc('new-list', 'CmdorCtrl+L'),
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: setAcc('delete-list', 'CmdorCtrl+Shift+D'),
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: setAcc('rename-list', 'CmdorCtrl+Y'),
      click() {
        activate('rename-list');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Hide Completed Todos',
      accelerator: setAcc('hide-todo', 'CmdorCtrl+Shift+H'),
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: setAcc('new-todo', 'CmdorCtrl+N'),
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: setAcc('delete-todo', 'CmdorCtrl+D'),
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: setAcc('rename-todo', 'CmdorCtrl+T'),
      click() {
        activate('rename-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Add to My Day',
      accelerator: setAcc('add-my-day', 'CmdorCtrl+K'),
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: setAcc('complete-todo', 'CmdorCtrl+Shift+N'),
      click() {
        activate('complete-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Set Reminder',
      accelerator: setAcc('set-reminder', 'CmdorCtrl+Shift+E'),
      click() {
        activate('set-reminder');
      }
    }, {
      label: 'Add Due Date',
      accelerator: setAcc('add-due-date', 'CmdorCtrl+Shift+T'),
      click() {
        activate('add-due-date');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: setAcc('my-day', 'CmdorCtrl+M'),
    click() {
      activate('my-day');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: setAcc('toggle-cortana', 'CmdorCtrl+E'),
    click() {
      activate('toggle-cortana');
    }
  }, {
    label: 'Return to Todos',
    accelerator: setAcc('return', 'Esc'),
    click() {
      activate('return');
    }
  }, {
    type: 'separator'
  }, {
    label: 'To-Do Settings',
    accelerator: setAcc('settings', 'CmdorCtrl+,'),
    click() {
      activate('settings');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Launch on Start',
    type: 'checkbox',
    checked: config.get('autoLaunch'),
    click(item) {
      config.set('autoLaunch', item.checked);
      activate('auto-launch');
    }
  }, {
    label: 'Launch Minimized',
    type: 'checkbox',
    checked: config.get('launchMinimized'),
    click(item) {
      config.set('launchMinimized', item.checked);
    }
  }, {
    type: 'separator'
  }, {
    label: 'Edit Shortcut Keys',
    accelerator: 'CmdorCtrl+.',
    click() {
      activate('edit-shortcuts');
    }
  }, {
    label: 'Enable Global Shortcut Keys',
    type: 'checkbox',
    checked: config.get('useGlobalShortcuts'),
    click(item) {
      config.set('useGlobalShortcuts', item.checked);
      requestAppRestart();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Sign out',
    accelerator: setAcc('sign-out', 'CmdorCtrl+Alt+Q'),
    click() {
      confirmSignOut();
    }
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    type: 'separator'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Font Size Options',
    submenu: [{
      label: 'Make Text Larger',
      accelerator: 'CmdOrCtrl+Plus',
      click() {
        activate('zoom-in');
      }
    }, {
      label: 'Make Text Smaller',
      accelerator: 'CmdOrCtrl+-',
      click() {
        activate('zoom-out');
      }
    }, {
      label: 'Reset Zoom Level',
      accelerator: 'CmdOrCtrl+0',
      click() {
        activate('zoom-reset');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [{
      label: 'Sepia Theme',
      accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
      click() {
        activate('toggle-sepia-mode');
      }
    }, {
      label: 'Dark Theme',
      accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
      click() {
        activate('toggle-dark-mode');
      }
    }, {
      label: 'Black Theme',
      accelerator: setAcc('toggle-black-mode', 'CmdorCtrl+B'),
      click() {
        activate('toggle-black-mode');
      }
    }]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: config.get('autoNightMode'),
    accelerator: 'CmdorCtrl+Alt+N',
    click(item) {
      config.set('autoNightMode', item.checked);
      activate('auto-night-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Navigate to Next List',
    accelerator: 'CmdorCtrl+Tab',
    click() {
      activate('next-list');
    }
  }, {
    label: 'Navigate to Previous List',
    accelerator: 'CmdorCtrl+Shift+Tab',
    click() {
      activate('previous-list');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Always on Top',
    type: 'checkbox',
    checked: config.get('alwaysOnTop'),
    accelerator: 'CmdorCtrl+Shift+P',
    click(item, focusedWindow) {
      config.set('alwaysOnTop', item.checked);
      focusedWindow.setAlwaysOnTop(item.checked);
    }
  }, {
    label: 'Hide Tray Icon',
    type: 'checkbox',
    checked: config.get('hideTray'),
    click(item) {
      config.set('hideTray', item.checked);
      requestAppRestart();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Side Bar',
    type: 'checkbox',
    checked: !config.get('sideBarHidden'),
    accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Toggle Menu Bar',
    type: 'checkbox',
    checked: config.get('menuBarVisible'),
    click() {
      activate('toggle-menu-bar');
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: 'F11',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: 'Ctrl+Shift+I',
    click: (item, focusedWindow) => {
      focusedWindow.toggleDevTools();
    }
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const tpl = process.platform === 'darwin' ? darwinTpl : otherTpl;

module.exports = electron.Menu.buildFromTemplate(tpl);

module.exports.registerGlobalShortcuts = registerGlobalShortcuts;
