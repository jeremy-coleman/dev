//@ts-ignore
declare module 'electron-default-menu' {
  const defaultMenu: (app: Electron.App, shell: Electron.Shell) => Electron.MenuItemConstructorOptions[];
  export = defaultMenu;
}

declare interface StringMap<T> {
  [x: string]: T;
}


declare enum IpcEvents {}

// NOTE: this is the global app config type definition
declare var AppConfig : {
    production?: boolean;
    publicPath?: string;
    buildVersion: string;
    buildDate: string;
    env: any;
};