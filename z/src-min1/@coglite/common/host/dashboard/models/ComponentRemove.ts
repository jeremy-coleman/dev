import { action, observable } from 'mobx';

type IComponentRemoveOptions = {
    component;
    saveHandler?: (component) => void;
}

export class ComponentRemoveModel {
    private _saveHandler : (component) => void;
    @observable active : boolean = false;
    @observable component;
    
    @action
    init(opts : IComponentRemoveOptions) {
        this.component = opts.component;
        this._saveHandler = opts.saveHandler;
        this.active = true;
    }

    @action
    private _close() {
        //this.component = undefined;
        this.active = false;
    }

    @action
    save() {
        if(this._saveHandler) {
            this._saveHandler(this.component);
        } else {
            this.component.removeFromParent();
        }
        this._close();
    }

    @action
    cancel() {
        this._close();
    }
}

