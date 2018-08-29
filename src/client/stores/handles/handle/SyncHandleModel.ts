import { IReactionDisposer, action, reaction } from "mobx";
import { Sync } from "@coglite/framework/common/model/Sync";
import {toPromise } from "@coglite/framework/common/toPromise";
import { HandleModel } from "./HandleModel";
import { ISyncHandleModel } from "./ISyncHandleModel";


class SyncHandleModel<T> extends HandleModel<T> implements ISyncHandleModel<T> {
    sync = new Sync();
    loader : () => Promise<T>;
    saver : (value : T) => Promise<any>;
    private _saveDisposer : IReactionDisposer;

    private _saveDelay: number = 1000;

    get saveDelay() {
        return this._saveDelay;
    }
    set saveDelay(value : number) {
        if(!isNaN(value) && value >= 0) {
            this._saveDelay = value;
        }
    }

    private _saveValue = (value) => {
        this.saver(value);
    }

    @action
    private _onLoaded = (value : T) => {
        this.setValue(value);
        this.sync.syncEnd();
        if(this.saver && !this._saveDisposer) {
            this._saveDisposer = reaction(() => {
                return this.value;
            }, this._saveValue, { delay: this.saveDelay });
        }
    }

    @action
    private _onError = (error : any) => {
        this.clearValue();
        this.sync.syncError(error);
    }

    refresh() : Promise<any> {
        if(this.loader) {
            if(this.sync.syncing) {
                return toPromise(this.sync);
            }
            this.sync.syncStart();
            return this.loader().then(this._onLoaded).catch(this._onError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    }
    load() : Promise<any> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }

        if(!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }

        return Promise.resolve();
    }
}

export { SyncHandleModel as default, SyncHandleModel }