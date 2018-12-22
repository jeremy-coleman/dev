import { css, MDFontIconOnly } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';

import { HostAppIcon } from '../../core';
import { removeComponent } from './_actions';
import { stackStyles } from './stackStyles';
import { StackModel } from '../models/Stack';
import { WindowModel } from '../models/WindowModel';


interface IStackProps {
    stack: StackModel;
    className?: string;
    window?: WindowModel;
    first?: boolean;
    last?: boolean;
}


@observer
class StackCloseAction extends React.Component<IStackProps, any> {
    private _onRemoveConfirm = () => {
        this.props.stack.close();
    }
    private _onClick = () => {
        if(this.props.stack.windowCount > 1) {
            removeComponent({ component: this.props.stack, saveHandler: this._onRemoveConfirm });
        }
        // if(this.props.stack.windowCount === 1) {
        //     return void 0
        // } 
        
        else {
            this.props.stack.close();
        }
    }
    render() {
        const { stack } = this.props;

        //console.table(this.props)

        if(!stack.closeDisabled) {
            return (
                <i 
                        //type="button"
                        style={{ width: stack.headerHeight }}
                        className={css(stackStyles.action, "close-action")}
                        title="Close all Tabs"
                        onClick={this._onClick}>
                   <MDFontIconOnly icon={'close'}/>
                </i>
            );
        }
        return null;
    }
}


let StackActionBar = observer((props: IStackProps) =>
        <div className={stackStyles.actionBar}>
            <StackCloseAction {...props}/>
        </div>
)


interface IStackWindowProps extends IStackProps {
    window: WindowModel;
    first?: boolean;
    last?: boolean;
}


let StackTabTitle = observer((props: IStackWindowProps) =>
            <div className={stackStyles.tabTitleContainer}>
                <div className={stackStyles.tabTitle}>
                    {props.window.title}
                </div>
            </div>
)


@observer
class StackTabCloseAction extends React.Component<IStackProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        const {stack} = this.props
        if(this.props.window && !this.props.window.closeDisabled) {
            return (
                <span
                    style={{ width: stack.headerHeight }}
                    className={css(stackStyles.action, stackStyles.tabAction, "close-action", this.props.window.active ? 'active' : '')}
                    title={`Close ${this.props.window.title || "Tab"}`}
                    onMouseDown={this._onMouseDown}
                   onClick={this._onClick}
                >
                    <MDFontIconOnly icon={'close'}/>
                </span>
            );
        }
        return null;
    }
}


let StackTabActionBar = observer((props: IStackWindowProps) =>
        <div className={stackStyles.tabActionBar}>
            <StackTabCloseAction {...props} />
        </div>
)


@observer
class StackTabIcon extends React.Component<IStackWindowProps, any> {
    render() {
        const host = this.props.window.appHost;
        const icon = host.icon;
        if(icon.name || icon.text || icon.url || icon.component) {
        return (
                <div className={stackStyles.tabIconContainer}>
                    <HostAppIcon host={host}/>
                </div>
            );
        }
        return null;
    }
}

@observer
class StackTab extends React.Component<IStackWindowProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    private _dragOverStart : number;
    
    private _onClick = () => this.props.stack.setActive(this.props.window);
    
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        const transferText = String(JSON.stringify(this.props.window.config));
        e.dataTransfer.setData("text", transferText);
        window.setTimeout(() => this.props.window.dragStart(), 1);
    }

    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        delete this._dragOverStart;
        this.props.window.dragEnd();
    }

    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            e.stopPropagation();
            if(drag !== this.props.window) {
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                } catch(ex) {}
            }
        } 
        else {
            if(!this.props.window.active) {
                
                if(!this._dragOverStart) {
                    this._dragOverStart = new Date().getTime();
                } 

                else {
                    const diff = new Date().getTime() - this._dragOverStart;
                    if(diff >= 600) {
                        this.props.window.activate();
                        delete this._dragOverStart;
                    }
                }
            }
        }
    }

    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        if(e.relatedTarget !== this.ref.current && !this.ref.current.contains(e.relatedTarget as HTMLElement)) {
            delete this._dragOverStart;
        }
    }

    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        delete this._dragOverStart;
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow(this.props.window);
    }


    render() {
        return (
            <div className={css(stackStyles.tab, { active: this.props.window.active, first: this.props.first, last: this.props.last })}
                 role="tab"
                 id={`${this.props.window.id}-tab`}
                 aria-controls={this.props.window.id}
                 title={this.props.window.title}
                 ref={this.ref}
                 onClick={this._onClick}
                 draggable={true}
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}
                 onDragLeave={this._onDragLeave}>
                <StackTabIcon {...this.props} />
                <StackTabTitle {...this.props} />
                <StackTabActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class StackAddAction extends React.Component<IStackProps, any> {
    private _onClick = () => this.props.stack.addNew({ makeActive: true });
    
    render() {
        const { stack, className } = this.props;
        if(stack.addApp) {
            return (
                <button type="button"
                        title="Add Tab"
                        className={stackStyles.addAction}
                        onClick={this._onClick}
                        style={{ width: stack.headerHeight }}>
                    <MDFontIconOnly icon={'add'}/>
                </button>
            );
        }
        return null;
    }
}


@observer
class StackTabBar extends React.Component<IStackProps, any> {
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag && (drag.parent !== stack || (stack.windowCount > 1 && drag !== stack.last))) {
            e.stopPropagation();
            e.preventDefault();
            try {
                e.dataTransfer.dropEffect = "move";
            } 
            catch(ex) {}
        }
    }

    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow();
    }

    render() {
        return (
            <div className={stackStyles.tabBar} role="tablist" onDragOver={this._onDragOver} onDrop={this._onDrop}>
            {this.props.stack.windows.map((w, idx) => <StackTab key={w.id} {...this.props} window={w} first={idx === 0} last={idx === this.props.stack.windowCount - 1} />)}
                <StackAddAction {...this.props} />
            </div>
        );
    }

}

let StackHeader = observer((props: IStackProps) =>
    <div className={stackStyles.header} style={{ height: props.stack.headerHeight }}>
        <StackTabBar {...props} />
        <StackActionBar {...props} />
    </div>
)




const uselessDropHandler = () => {};


@observer
class StackDragOverlay extends React.Component<IStackProps, any> {
     overlayRef = React.createRef<HTMLDivElement>();
    
    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        if(drag) {
            drag.setDragState({ pos: null, over: null });
        }
        this._dropHandler = uselessDropHandler;
    }
    
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        this._dropHandler();
        this.props.stack.dragEnd();
    }

    private _dropHandler = uselessDropHandler;

    private _dropLeft = () => this.props.stack.splitLeft(this.props.stack.dashboard.drag);

    private _setDropZoneLeft(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropLeft;
        const styles : React.CSSProperties = {
            top: 0,
            left: 0,
            width: Math.floor(width / 2),
            height: height
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }

    private _dropRight = () => {
        this.props.stack.splitRight(this.props.stack.dashboard.drag);
    }

    private _setDropZoneRight(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropRight;
        const left = Math.floor(width / 2);
        const styles = {top: 0, left: left, width: width - left, height: height};

        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropTop = () => {
        this.props.stack.splitTop(this.props.stack.dashboard.drag);
    }
    private _setDropZoneTop(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropTop;
        const styles : React.CSSProperties = {
            top: 0,
            left: 0,
            width: width,
            height: Math.floor(height / 2)
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropBottom = () => {
        this.props.stack.splitBottom(this.props.stack.dashboard.drag);
    }
    private _setDropZoneBottom(width : number, height : number) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropBottom;
        const top = Math.floor(height / 2);
        const styles : React.CSSProperties = {
            top: top,
            left: 0,
            width: width,
            height: height - top
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    private _dropAdd = () => {
        this.props.stack.add(this.props.stack.dashboard.drag as WindowModel, { makeActive: true });
    }
    private _setDropZoneAdd() {
        this._dropHandler = this._dropAdd;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : stack.drag ? stack.drag : undefined;

                

        if(drag) {
            e.stopPropagation();
            if((drag.parent !== stack && stack.windowCount > 0) || stack.windowCount > 1) {
                e.preventDefault();
                const bounds = this.overlayRef.current.getBoundingClientRect();
                //const zoneWidth = Math.floor(bounds.width / 2);
                const leftRightZoneWidth = Math.floor(bounds.width / 6);
                const topBottomZoneHeight = Math.floor(bounds.height / 2);
                if(e.clientX >= bounds.left && e.clientX <= bounds.left + leftRightZoneWidth) {
                    this._setDropZoneLeft(bounds.width, bounds.height);
                } else if(e.clientX >= bounds.left + bounds.width - leftRightZoneWidth && e.clientX <= bounds.left + bounds.width) {
                    this._setDropZoneRight(bounds.width, bounds.height);
                } else if(e.clientY >= bounds.top && e.clientY <= bounds.top + topBottomZoneHeight) {
                    this._setDropZoneTop(bounds.width, bounds.height);
                } else {
                    this._setDropZoneBottom(bounds.width, bounds.height);
                }
            } else if(stack.windowCount === 0) {
                e.preventDefault();
                this._setDropZoneAdd();
            }
        }
    }


    render() {
        const { stack } = this.props;
           const headerHeight: React.CSSProperties = {top: stack.headerHeight}
        const drag = stack.dashboard ? stack.dashboard.drag : undefined;
        if(drag) {
            const feedbackStyles : React.CSSProperties = drag.dragState.over === stack ? drag.dragState.feedbackStyles : {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            return [
                <div key="overlay"
                     className={stackStyles.dragOverlay}
                     onDragOver={this._onDragOver}
                     onDrop={this._onDrop}
                     onDragLeave={this._onDragLeave}
                     ref={this.overlayRef}
                     style={{ ...headerHeight }}>
                </div>,
                <div key="feedbackContainer"
                     className={stackStyles.dragFeedbackContainer}
                     style={{ top: stack.headerHeight }}>
                    <div className={css(stackStyles.dragFeedback, drag.dragState.pos)} style={{...feedbackStyles}}>
                    </div>
                </div>
            ];
        }
        return null;
    }
}


let Stack = observer((props: IStackProps) => 
        <div id={props.stack.id} className={stackStyles.root}>
            <StackDragOverlay {...props} />
            <StackHeader {...props} />
        </div>
);



export { IStackProps, Stack }



class StackViewFactory implements IViewFactory {
    className: string = undefined;
    createView(comp) : React.ReactNode {
        return <Stack stack={comp}  className={this.className} />;
    }
}

let createStack = observer((stack) => <Stack stack={stack} />)


let StackViewFactory1 = {
    createView: (comp) => <Stack stack={comp} />
}

export { StackViewFactory }




import { stylesheet } from 'typestyle';
import { ComponentRemoveStore } from './_actions';
import { AppPortalManager } from './AppPortalManager';
import { ComponentRemoveDialog } from './ComponentRemoveDialog';
import { ComponentView } from './Factory';
import { DashboardModel } from '../models/Dashboard';
import { observable, computed } from 'mobx';
import { ComponentFactory } from '../models/ComponentFactory';


// using typestyle causes the app tiles to not render on startup

export const dashboardStyles = stylesheet({
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "transparent",
            overflow: "hidden"
            
        },
        content: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            background: "transparent",
            
        },
        overlay: {
            backgroundColor: 'white',
            opacity: 0.1,
            $nest:{
                "&.hsplit": {
                    cursor: "ew-resize"
                },
                "&.vsplit": {
                    cursor: "ns-resize"
                }
            }
        }
    })




interface IDashboardProps {
    dashboard: DashboardModel;
    className?: string;
    host?: IEventTarget;
    classes?: any
}


class DashboardPortals extends React.Component<IDashboardProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    componentDidMount() {
        this.props.dashboard.setPortalManager(new AppPortalManager(this.ref.current));
    }
    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.dashboard !== this.props.dashboard) {
            const currentPortalManager = this.props.dashboard.portalManager;
            if(currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.dashboard.setPortalManager(new AppPortalManager(this.ref.current));
        }
    }
    render() {
        return (
            <div ref={this.ref}></div>
        );
    }
}


@observer
class DashboardView extends React.Component<IDashboardProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    private _resizeToViewport() {
        if(this.ref) {
            const bounds = this.ref.current.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
        }
    }

    private _onHostResize = () => this._resizeToViewport();
    

    private _addHostListener(host : IEventTarget) {
        if(host) {
            host.addEventListener("resize", this._onHostResize);
        }
    }
    
    private _removeHostListener(host : IEventTarget) {
        if(host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    }

    componentDidMount() {
        this._addHostListener(this.props.host);
        this._resizeToViewport();
    }

    componentWillUnmount() {
        this._removeHostListener(this.props.host);
    }

    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }

    render() {
        const { dashboard} = this.props;
        const component = dashboard.component;
        return (
            <div id={this.props.dashboard.id} className={dashboardStyles.root} ref={this.ref}>
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className={dashboardStyles.content}>
                    <DashboardPortals {...this.props} />
                    <ComponentView component={component} />
                </div>
            </div>
        );
    }

    //@TODO debounce this

    componentDidUpdate() {
        this._resizeToViewport();
    }
}




export { IDashboardProps, DashboardView }




interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    afterConfig?: (dashboard : DashboardModel) => void;
    dashboard : DashboardModel;
}




class DashboardsApp extends React.Component<IDashboardWrapperProps, any> {
    @observable.ref private _dashboard : DashboardModel = new DashboardModel();
    
    dashboardConfig = {
            type: "window",
            component: {
                type: "stack",
                closeDisabled: false,
                windows: [
                    {
                        type: "window",
                        path: "/home"
                    }
                ]
            }
    };



    @computed
    get dashboard() {
        return this._dashboard;
    }

    constructor(props : IDashboardWrapperProps) {
        super(props);
        this._setFromProps(this.props);

    }

    private _setFromProps(props : IDashboardWrapperProps) {
        this.dashboard.router = props.router;
        this.dashboard.addApp = props.addApp;
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
        this.dashboard.componentFactory = props.componentFactory || ComponentFactory;
    }

    private _load(props : IDashboardWrapperProps) {
            this.dashboard.setConfig(props.config)
    }
    
    componentWillReceiveProps(nextProps) {
        this.dashboard.close();
        this._setFromProps(nextProps);
        this._load(nextProps);
    }
    componentWillMount() {
        this._load(this.props);
    }
    componentWillUnmount() {
        this.dashboard.close();
    }
    render() {
        return (
            <div/>
            // <DashboardView 
            //     className={this.props.className}
            //     dashboard={this.dashboard}
            //     host={this.props.host}
            //     config={dashboardConfig} 
            //     router={AppRouter} 
            //     addApp={{ path: "/home" }}
            // />
        )
    }
}


