import { defaultTheme as theme } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { stylesheet } from 'typestyle';
import { AppHostContainer } from '../../core';


const windowStyles = stylesheet({
     root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.common.white,
            borderColor: theme.palette.neutralSecondary,
            borderStyle: "solid",
            borderWidth: 0,
            overflow: "auto",
     }
})


interface IWindowProps {
    window: IWindow;
    className?: string;
}

@observer
class Window extends React.Component<IWindowProps, any> {
    ref = React.createRef<HTMLDivElement>()
    render() {
        return (
            <div className={windowStyles.root} ref={this.ref}>
                {this.props.children}
            </div>
        );
    }
}



class AppPortal implements IPortal {
    
    private _renderedInto : HTMLElement;
    private _appendedChildElement : HTMLElement;
    private _window : IWindow;
    private _onDestroy : (window : IWindow) => void;
    
    constructor(renderInto : HTMLElement, window : IWindow, onDestroy?: (window : IWindow) => void) {
        this._renderedInto = renderInto;
        const doc = renderInto.ownerDocument;
        this._appendedChildElement = doc.createElement("div");
        const s = this._appendedChildElement.style;
        s.position = "absolute";
        s.zIndex = "1";
        renderInto.appendChild(this._appendedChildElement);
        this._appendedChildElement.addEventListener("transitionend", this._onTransitionEnd);
        this._window = window;
        this._onDestroy = onDestroy;
        ReactDOM.render(<AppHostContainer host={this._window.appHost} />, this._appendedChildElement)
    }

    get el() {
        return this._appendedChildElement;
    }

    protected _notifyResize() {
        this._window.appHost.emit({ type: "resize" });
    }

    private _onTransitionEnd = () => this._notifyResize();
    

    setViewport(left: number, top: number, width: number, height: number) {
        const clientBounds = this._appendedChildElement.getBoundingClientRect();
        const sizeChanged = width !== clientBounds.width || height !== clientBounds.height;
        const visible = width > 0 && height > 0;
        const s = this._appendedChildElement.style;
        s.top = `${visible ? top : -1}px`;
        s.left = `${visible ? left : -1}px`;
        s.bottom = "";
        s.right = "";
        s.width = `${width}px`;
        s.height = `${height}px`;
        s.overflow = "hidden";
        if(sizeChanged) {
            setTimeout(() => {
                this._notifyResize();
            }, 1);
        }
    }

    setZIndex(zIndex : number) {
        this._appendedChildElement.style.zIndex = `${zIndex}`;
    }

    scrollIntoView() {
        try {
            this._appendedChildElement.scrollIntoView();
        } catch(e) {}
    }

    bringToFront() : void {
        this.setZIndex(2);
    }

    bringToBase() : void {
        this.setZIndex(1);
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this._appendedChildElement);
        this._renderedInto.removeChild(this._appendedChildElement);
        if(this._onDestroy) {
            this._onDestroy(this._window);
        }
    }
}

class AppPortalManager implements IPortalManager {
    private _root : HTMLElement;
    private _portalMap : { [key : string] : AppPortal } = {};
    constructor(root : HTMLElement) {
        this._root = root;
    }
    private _onPortalDestroyed = (window : IWindow) => {
        delete this._portalMap[window.id];
    }
    get root() : HTMLElement {
        return this._root;
    }
    getPortal(window : IWindow) {
        let portal = this._portalMap[window.id];
        if(!portal) {
            //console.log('created portal')
            portal = new AppPortal(this._root, window, this._onPortalDestroyed);
            this._portalMap[window.id] = portal;
            console.log('created portal', window.id)
        }
        return portal;
    }
    destroyPortal(window : IWindow) {
        const portal = this._portalMap[window.id];
        if(portal) {
            portal.destroy();
        }
    }
    destroy() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].destroy();
        });
    }
}


export { IWindowProps, Window }
export { AppPortal, AppPortalManager }