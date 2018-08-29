import { observable, computed, action, autorun, IReactionDisposer } from "mobx";
import { IStack, IStackConfig } from "./IStack";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import * as ComponentTypes from "./ComponentTypes";
import { WindowManager } from "./WindowManager";
import { splitHorizontal, splitVertical } from "../SplitActions";

const Defaults = {
    headerHeight: 32
};

/**
 * Stack - a bunch/stack of windows
 */
class Stack extends WindowManager implements IStack {
    @observable private _activeIndex : number;
    @observable private _headerHeight : number;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._setViewportDisposer = autorun(this._setWindowViewports);
    }
    
    get type() {
        return ComponentTypes.stack;
    }
    
    @computed
    get headerHeight() {
        return this._headerHeight !== undefined ? this._headerHeight : Defaults.headerHeight;
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
    get active() : IWindow {
        const activeIndex = this.activeIndex;
        return activeIndex >= 0 && activeIndex < this.windows.length ? this.windows[activeIndex] : undefined;
    }
    set active(value : IWindow) {
        this.setActive(value);
    }

    @action
    setActive(active : IWindow) {
        this.setActiveIndex(this.windows.indexOf(active));
    }

    @action
    add(win : IWindow, opts?: any) {
        super.add(win, opts);
        if((opts && opts.makeActive) || this.windows.length === 1) {
            this.setActive(win);
        }
    }

    protected _windowDropped(win) {
        this.setActive(win);
    }

    @action
    splitLeft(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, newStack, this);
    }

    @action
    splitRight(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, this, newStack);
    }

    @action
    splitTop(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitVertical(this, newStack, this);
    }

    @action
    splitBottom(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitVertical(this, this, newStack);
    }

    @action
    dropWindow(refWindow?: IWindow) : void {
        const drag = this.dashboard ? this.dashboard.drag : undefined;
        if(drag) {
            const win = drag as IWindow;
            if(refWindow) {
                if(drag.parent === this) {
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
            closeDisabled: this._closeDisabled
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
                const w = new Window();
                this.add(w);
                w.setConfig(wc);
            });
        }
        this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
    }

    @action
    remove(node : IComponent) {
        super.remove(node);
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
}

export { Stack, Defaults }