const ENV = process.env.ENV;

const env = {
  debug: 'debug',
  dev: 'dev',
  production: 'production',
};

const isDebug = [env.debug].includes(ENV);
const isDev = [env.debug, env.dev].includes(ENV);
const isProduction = [env.production].includes(ENV);

const logErrors = isDev;
const logInfo = isDev;
const logRouteChanges = isDev;

const appConstants = Object.freeze({
  isDebug,
  isDev,
  isProduction,
  logErrors,
  logInfo,
  logRouteChanges,
});

const layoutConstants = Object.freeze({
  root: {
    left: 50,
    right: 220,
  },
  modal: {

  }
});

const modalConstants = Object.freeze({
  minWidth: 300,
  maxWidth: 1200,
  duration: 0.5,
});

if(!isProduction) {
  console.log('App mode: ', ENV);
}

export default {
  app: appConstants,
  layout: layoutConstants,
  modal: modalConstants,
};