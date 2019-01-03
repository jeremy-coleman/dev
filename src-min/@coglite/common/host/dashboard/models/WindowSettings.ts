import { action, computed, observable } from 'mobx';

import { WindowModel } from './WindowModel';

export type IWindowSettings = typeof WindowSettings

export class WindowSettings {
    @observable protected _window : WindowModel;
    @observable protected _data : any = {};
    @observable protected _resizable : boolean;
    @observable protected _draggable : boolean;

    constructor(window?: WindowModel) {
        this._window = window;
    }


    @computed
    get resizable() {
        return true
        //let resizable = this._resizable;
        // if(resizable === undefined) {
        //     const mgr = this._window ? this._window.manager : undefined;
        //     if(mgr) {
        //         resizable = mgr.windowSettings.resizable;
        //     }
        // }
        // return resizable !== undefined ? resizable : false;
    }

    set resizable(value) {
        this.setResizable(value);
    }

    @action
    setResizable(resizable : boolean) {
        if(resizable !== undefined) {
            this._resizable = resizable;
        }
    }

    @computed
    get draggable() {
        return true
        // let draggable = this._draggable;
        // if(draggable === undefined) {
        //     const mgr = this._window ? this._window.manager : undefined;
        //     if(mgr) {
        //         draggable = mgr.windowSettings.draggable;
        //     }
        // }
        // return draggable !== undefined ? draggable : false;
    }
    set draggable(value) {
        this.setDraggable(value);
    }

    @action
    setDraggable(draggable : boolean) {
        if(draggable !== undefined) {
            this._draggable = draggable;
        }
    }

    @computed
    get config() {
        return {
            resizable: this._resizable,
            draggable: this._draggable,
        };
    }
    set config(value) {
        this.setConfig(value);
    }

    @action
    setConfig(config : any) : void {
        this.setResizable(config ? config.resizable : undefined);
        this.setDraggable(config ? config.draggable : undefined);
    }

    toJSON() {
        return this.config;
    }
}
