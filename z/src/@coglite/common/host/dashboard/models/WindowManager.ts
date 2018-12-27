//import { isFunction } from '@coglite/common/datakit';
import { action, computed, observable } from 'mobx';

import { WindowResizeType } from '../constants/WindowResizeType';
import { ComponentModel } from './Component';
import { WindowModel } from './WindowModel';
import { WindowSettings } from './WindowSettings';



export class WindowManager extends ComponentModel {
    @observable windows : WindowModel[] = [];
    @observable protected _windowSettings = new WindowSettings();
    @observable.ref private _resizing : WindowModel;
    @observable private _resizeType : WindowResizeType;
    @observable.ref private _drag : WindowModel;
    @observable protected _maximizedIndex : number;

    get type() {
        return null;
    }

    @computed
    get isRequiresOverflow() {
        return false;
    }

    @computed
    get windowSettings() {
        return this._windowSettings;
    }

    @computed
    get first() {
        return this.windowCount > 0 ? this.windows[0] : undefined;
    }

    @computed
    get last() {
        return this.windowCount > 0 ? this.windows[this.windows.length - 1] : undefined;
    }

    @computed
    get windowCount() : number {
        return this.windows ? this.windows.length : 0
    }

    get isWindowManager() {
        return true;
    }

    @action
    add(win : WindowModel, opts?: any) : void {
        if(win) {
            if(win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            } else {
                const itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
        }
    }
    
    @action
    addNew(opts?: any) {
        if(this.addApp) {

            //@ts-ignore
            let addApp = this.addApp === typeof 'function' ? (this.addApp)() : this.addApp;

            if(opts) {
                addApp = Object.assign({}, addApp, opts);
            }
            return this.open(addApp);
        }
        return Promise.resolve();
    }

    @action
    insertAt(item : WindowModel, index : number) {
        if(item && index >= 0 && index < this.windows.length) {
            let refStackItem = this.windows[index];
            let insertIdx : number = -1;
            if(item.parent !== this) {
                item.removeFromParent();
                item.parent = this;
                insertIdx = index;
            } else {
                const itemIdx = this.windows.indexOf(item);
                if(itemIdx >= 0 && itemIdx !== index) {
                    this.windows.splice(itemIdx, 1);
                    insertIdx = this.windows.indexOf(refStackItem);
                }
            }

            if(insertIdx >= 0) {
                this.windows.splice(insertIdx, 0, item);
            }
        } else {
            this.add(item);
        }
    }

    @action
    insertBefore(item : WindowModel, refItem?: WindowModel) {
        if(!refItem) {
            this.add(item);
        } else if(item) {
            this.insertAt(item, this.windows.indexOf(refItem));
        }
    }

    @action
    replace(newItem : IComponent, oldItem : IComponent) : void {
        if(newItem && oldItem && oldItem.parent === this) {
            this.insertBefore(newItem as WindowModel, oldItem as WindowModel);
            oldItem.removeFromParent();
        }
    }

    @action
    open(request : IRequest) : Promise<WindowModel> {
        let win;
        if(request && request.replace && request.name) {
            const db = this.dashboard;
            win = db.findFirst(w => {
                return w.type === "window" ? (w as WindowModel).name === request.name : false;
            });
        }
        if(!win) {
            win = new WindowModel();
            if(request) {
                win.name = request.name;
                win.setPath(request.path);
                win.setParams(request.params);
                win.setQuery(request.query);
                if(request.title) {
                    win.setTitle(request.title);
                }
                if(request.transient !== undefined) {
                    win.setTransient(request.transient);
                }
            }
            this.add(win, request);
        } else {
            win.load(request);
        }
        return Promise.resolve(win);
    }

    protected _visitChildren(callback) {
        this.windows.forEach(w => w.visit(callback));
    }

    protected _findFirstChild(predicate) {
        let r;
        this.windows.some(w => {
            r = w.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    }

    protected _findAllChildren(predicate) : IComponent[] {
        let r = [];
        let wr;
        this.windows.forEach(w => {
            wr = w.findAll(predicate);
            if(wr && wr.length > 0) {
                r = r.concat(wr);
            }
        });
        return r;
    }

    @action
    remove(node : IComponent) {
        const idx = this.windows.indexOf(node as WindowModel);
        if(idx >= 0) {
            const w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);

            if(this.windows.length === 0) {
                this.removeFromParent();
            }
        }
    }

    @action
    close() {
        if(!this.closeDisabled) {
            while(this.windowCount > 0) {
                this.windows[0].close();
            }
            this.removeFromParent();
        }
    }

    protected _onDragStart(drag : WindowModel) {
        // does nothing by default
    }

    protected _onDragEnd() {
        // does nothing by default
    }

    @computed
    get drag() {
        return this._drag;
    }
    @action
    dragStart(drag : WindowModel) {
        if(this.dashboard) {
            this.dashboard.dragStart(drag);
        }
        this._drag = drag;
        this._onDragStart(drag);
    }
    @action
    dragEnd() : void {
        if(this.dashboard) {
            this.dashboard.dragEnd();
        }
        this._drag = undefined;
        this._onDragEnd();
    }

    @computed
    get resizing() {
        return this._resizing;
    }

    @computed
    get resizeType() {
        return this._resizeType;
    }

    protected _onResizeStart(win : WindowModel) {
        // does nothing by default
    }

    protected _onResizeEnd() {
        // does nothing by default
    }

    @action
    resizeStart(win : WindowModel, type : WindowResizeType) {
        this._resizing = win;
        this._resizeType = type;
        this._onResizeStart(win);
    }

    @action
    resizeEnd() {
        this._resizing = undefined;
        this._resizeType = undefined;
        this._onResizeEnd();
    }

    @computed
    get maximizedIndex() {
        return this._maximizedIndex;
    }
    set maximizedIndex(value) {
        this.setMaximizedIndex(value);
    }

    @action
    setMaximizedIndex(maximizedIndex : number) {
        if(maximizedIndex !== this._maximizedIndex) {
            this._maximizedIndex = maximizedIndex;
        }
    }

    @computed
    get maximized() : WindowModel {
        const maximizedIndex = this.maximizedIndex;
        return maximizedIndex !== undefined && maximizedIndex >= 0 && maximizedIndex < this.windows.length ? this.windows[maximizedIndex] : undefined;
    }
    set maximized(value : WindowModel) {
        this.setMaximized(value);
    }
    @action
    setMaximized(maximized : WindowModel) {
        this.setMaximizedIndex(maximized ? this.windows.indexOf(maximized) : undefined);
    }
}
