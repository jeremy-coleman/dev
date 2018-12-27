import { action, autorun, computed, IReactionDisposer, observable } from 'mobx';

import { splitHorizontal, splitVertical } from '../components/_actions';
import { ComponentTypes } from './_constants';

//import { WindowResizeType } from '../constants';
import { ComponentModel } from './Component';
import { WindowModel } from './WindowModel';
import { WindowSettings } from './WindowSettings';




export class StackModel extends ComponentModel {
    @observable Defaults = {
        headerHeight: 32
    };

    @observable windows : WindowModel[] = [];
    @observable protected _windowSettings = new WindowSettings();
    @observable.ref private _drag : WindowModel;
    @observable protected _maximizedIndex : number;
    @observable private _activeIndex : number;
    @observable private _headerHeight : number;
     protected _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._setViewportDisposer = autorun(this._setWindowViewports);
    }
    
    get type() {
        return "stack";
    }
    
    @computed
    get headerHeight() {
        return this._headerHeight !== undefined ? this._headerHeight : this.Defaults.headerHeight;
    }
    set headerHeight(value) {
        this.setHeaderHeight(value);
    }
    
    @action
    setHeaderHeight(headerHeight : number) {
        if(headerHeight >= 0) {
            this._headerHeight = headerHeight;
        }
    }

    @computed
    get activeIndex() {
        return this._activeIndex || 0;
    }
    set activeIndex(value) {
        this.setActiveIndex(value);
    }

    @action
    setActiveIndex(activeIndex : number) {
        if(activeIndex !== this._activeIndex) {
            this._activeIndex = activeIndex;
        }
    }

    @computed
    get active() : WindowModel {
        const activeIndex = this.activeIndex;
        return activeIndex >= 0 && activeIndex < this.windows.length ? this.windows[activeIndex] : undefined;
    }
    set active(value : WindowModel) {
        this.setActive(value);
    }

    @action
    setActive(active : WindowModel) {
        this.setActiveIndex(this.windows.indexOf(active));
    }


    @action
    add(win : WindowModel, opts?: any) : void {
        if(win) {
            if(win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            } 
            else {
                const itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
        }
        if((opts && opts.makeActive) || this.windows.length === 1) {
            this.setActive(win);
        }
    }
    

    protected _windowDropped(win) {
        this.setActive(win);
    }

    @action
    splitLeft(newComp?: ComponentModel) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as WindowModel);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, newStack, this);
    }

    @action
    splitRight(newComp?: ComponentModel) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as WindowModel);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, this, newStack);
    }

    @action
    splitTop(newComp?: ComponentModel) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as WindowModel);
        } else {
            newStack.addNew();
        }
        splitVertical(this, newStack, this);
    }

    @action
    splitBottom(newComp?: ComponentModel) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as WindowModel);
        } else {
            newStack.addNew();
        }
        splitVertical(this, this, newStack);
    }

    @action
    dropWindow(refWindow?: WindowModel) : void {
        const drag = this.dashboard ? this.dashboard.drag : undefined;
        if(drag) {
            const win = drag as any //Iwindow
            if(refWindow) {
                if(drag.parent === this as any) {
                    const dragIdx = this.windows.indexOf(win);
                    const refIdx = this.windows.indexOf(refWindow);
                    this.insertAt(win, dragIdx > refIdx ? refIdx : refIdx + 1);
                } else {
                    this.insertBefore(win, refWindow);
                }
            } else {
                this.add(win);
            }
            this._windowDropped(win);
            this.dragEnd();
        }
    }

    @computed
    get config() : IStackConfig {
        return {
            type: this.type,
            activeIndex: this._activeIndex,
            windows: this.windows.filter(w => !w.transient).map(w => w.config),
            closeDisabled: this.closeDisabled
        };
    }

    set config(value) {
        this.setConfig(value);
    }

    @action
    setConfig(config : IStackConfig) : void {
        this.windows = [];
        if(config && config.windows && config.windows.length > 0) {
            config.windows.forEach(wc => {
                const w = new WindowModel();
                this.add(w);
                w.setConfig(wc);
            });
        }
        this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
    }


    @action
    remove(node) {
        const idx = this.windows.indexOf(node as WindowModel);
        if(idx >= 0) {
            const w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);

            if(this.windows.length === 0) {
                this.removeFromParent();
            }
        }
        if(this.windows.length > 0) {
            if(this.activeIndex >= this.windows.length) {
                this.setActiveIndex(this.windows.length - 1);
            }
        }
    }

    private _setWindowViewports = () => {
        if(this.portalManager) {
            const childY = this.y + this.headerHeight;
            const childHeight = this.height - this.headerHeight;
            const active = this.active;
            this.windows.forEach(w => {
                w.setViewport(this.x, childY, w === active ? this.width : 0, w === active ? childHeight : 0);
            });
        }
    }

    //---------------------------------------window manager



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
    replace(newItem , oldItem ) : void {
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
                return w.type === "window" ? (w as any).name === request.name : false;
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

    protected _findAllChildren(predicate) {
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
    close() {
        if(!this.closeDisabled) {
            while(this.windowCount > 0) {
                this.windows[0].close();
            }
            this.removeFromParent();
        }
    }

    @computed
    get drag() {
        return this._drag;
    }

    @action
    dragStart(drag : WindowModel) {
        if(this.dashboard) {
            this.dashboard.dragStart(drag as any);
        }
        this._drag = drag;
        //this._onDragStart(drag);
    }

    @action
    dragEnd() : void {
        if(this.dashboard) {
            this.dashboard.dragEnd();
        }
        this._drag = undefined;
        //this._onDragEnd();
    }

    @action
    resizeStart(win : WindowModel, type : WindowResizeType) {}

    @action
    resizeEnd() {}

}

