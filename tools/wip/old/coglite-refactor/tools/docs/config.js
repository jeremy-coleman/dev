const appConfig = require('application-config')('Coglite')
const path = require('path')
const electron = require('electron')
const arch = require('arch')
const fs = require('fs')

const APP_NAME = 'Coglite'
const APP_TEAM = 'Coglite Inc.'
const APP_VERSION = require('../package.json').version

const IS_TEST = isTest()
const PORTABLE_PATH = IS_TEST
  ? path.join(process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp', 'CogliteTest')
  : path.join(path.dirname(process.execPath), 'Portable Settings')
const IS_PRODUCTION = isProduction()
const IS_PORTABLE = isPortable()

const UI_HEADER_HEIGHT = 38
const UI_TORRENT_HEIGHT = 100

module.exports = {
  ANNOUNCEMENT_URL: 'https://coglite.com/desktop/announcement',
  AUTO_UPDATE_URL: 'https://coglite.com/desktop/update',
  CRASH_REPORT_URL: 'https://coglite.com/desktop/crash-report',
  TELEMETRY_URL: 'https://coglite.com/desktop/telemetry',

  APP_COPYRIGHT: 'Copyright © 2017 ' + APP_TEAM,
  APP_FILE_ICON: path.join(__dirname, '..', 'static', 'CogliteFile'),
  APP_ICON: path.join(__dirname, '..', 'static', 'Coglite'),
  APP_NAME: APP_NAME,
  APP_TEAM: APP_TEAM,
  APP_VERSION: APP_VERSION,
  APP_WINDOW_TITLE: APP_NAME + ' (BETA)',

  CONFIG_PATH: getConfigPath(),


  DELAYED_INIT: 3000 /* 3 seconds */,

  DEFAULT_DOWNLOAD_PATH: getDefaultDownloadPath(),

  //GITHUB_URL: 'https://github.com/coglite/coglite-desktop',
  //GITHUB_URL_ISSUES: 'https://github.com/coglite/coglite-desktop/issues',
  //GITHUB_URL_RAW: 'https://raw.githubusercontent.com/coglite/coglite-desktop/master',

  HOME_PAGE_URL: 'https://coglite.com',

  IS_PORTABLE: IS_PORTABLE,
  IS_PRODUCTION: IS_PRODUCTION,
  IS_TEST: IS_TEST,

  OS_SYSARCH: arch() === 'x64' ? 'x64' : 'ia32',

  DATASET_PATH: path.join(getConfigPath(), 'Datasets'),
  ROOT_PATH: path.join(__dirname, '..'),
  STATIC_PATH: path.join(__dirname, '..', 'static'),
  COG_NOTEBOOK_PATH: path.join(getConfigPath(), 'Notebooks'),

  WINDOW_ABOUT: 'file://' + path.join(__dirname, '..', 'static', 'about.html'),
  WINDOW_MAIN: 'file://' + path.join(__dirname, '..', 'static', 'main.html'),
  WINDOW_COGLITE: 'file://' + path.join(__dirname, '..', 'static', 'coglite.html'),

  WINDOW_INITIAL_BOUNDS: {
    width: 500,
    height: UI_HEADER_HEIGHT + 600 // header + 600s
  },
  WINDOW_MIN_HEIGHT: UI_HEADER_HEIGHT + 200, // header + 2 torrents
  WINDOW_MIN_WIDTH: 425,

  UI_HEADER_HEIGHT: UI_HEADER_HEIGHT,
}

function getConfigPath () {
  if (IS_PORTABLE)  {return PORTABLE_PATH} 
  else              {return path.dirname(appConfig.filePath)}
}

function getDefaultDownloadPath () {
  if (IS_PORTABLE)  {return path.join(getConfigPath(), 'Downloads')} 
  else              {return getPath('downloads')}
}

function getPath (key) {
    if          (!process.versions.electron)    { return ''} 
    else if     (process.type === 'renderer')   {return electron.remote.app.getPath(key)}
    else                                        {return electron.app.getPath(key)}
}

function isTest () {return process.env.NODE_ENV === 'test'}


// note1: check win32 first bc its Fast path: Non-Windows platforms should not check for path on disk
// note2: the try fs.accessSync line throws if the "Portable Settings" folder does not exist, and does
// nothing otherwise.
function isPortable () {
  if (IS_TEST)                                          {return true}
  if (process.platform !== 'win32' || !IS_PRODUCTION)   {return false}
  try {fs.accessSync(PORTABLE_PATH, fs.constants.R_OK | fs.constants.W_OK); return true} catch (err) {return false}
}

function isProduction () {
  if (!process.versions.electron) {
    return false
  }
  if (process.platform === 'darwin') {
    return !/\/Electron\.app\//.test(process.execPath)
  }
  if (process.platform === 'win32') {
    return !/\\electron\.exe$/.test(process.execPath)
  }
  if (process.platform === 'linux') {
    return !/\/electron$/.test(process.execPath)
  }
}
