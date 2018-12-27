/// <reference path="router.d.ts" />
/// <reference path="host.d.ts" />

declare enum WindowResizeType {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
    topRight = "topRight",
    topLeft = "topLeft",
    bottomRight = "bottomRight",
    bottomLeft = "bottomLeft"
}



interface IComponent extends IViewport {
    id: string;
    type: any;
    parent: IComponent;
    dashboard: IDashboard;
    root: IComponent;
    config : any;
    router: IRouter;
    isWindowManager: boolean;
    portalManager: IPortalManager;
    componentFactory: IComponentFactory;
    closeDisabled: boolean;
    x: number;
    rx: number;
    y: number;
    ry: number;
    width: number;
    height: number;
    setPortalManager(portalManager : IPortalManager) : void;
    setRouter(router : IRouter) : void;
    addApp: IRequest | ISupplierFunc<IRequest>;
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) : void;
    setConfig(state : any) : void;
    remove(comp : IComponent) : void;
    removeFromParent() : void;
    replace(newComp : IComponent, oldComp : IComponent) : void;
    visit(callback : IConsumerFunc<IComponent>) : void;
    findFirst(predicate : IPredicateFunc<IComponent>) : IComponent;
    findAll(predicate : IPredicateFunc<IComponent>) : IComponent[];
    close() : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    resize(width : number, height : number) : void;
    position(x : number, y : number) : void;
    setViewport(x : number, y: number, width : number, height : number) : void;
    resetViewport() : void;
}

interface IComponentFactory {
    (type : string) : IComponent;
}
interface IComponentRemoveOptions {
    component: IComponent;
    saveHandler?: (component : IComponent) => void;
}

interface IComponentRemove {
    active : boolean;
    component : IComponent;
    init(opts: IComponentRemoveOptions) : void;
    save() : void;
    cancel() : void;
}

interface IDashboard extends IComponent, IDragManager {
    sync: ISyncModel;
    title: string;
    component : IComponent;
    blockSource: IComponent;
    windows : IWindow[];
    
    setTitle(title : string) : void;
    setComponent(component : IComponent) : void;
    componentConfig : any;
    setComponentConfig(componentConfig : any) : void;
    setBlockSource(blockSource : IComponent) : void;
    clearBlockSource() : void;
    clear() : void;
    load() : Promise<any>;
}


interface IDashboardAdd {
    active : boolean;
    dashboardList : IDashboardList;
    existing : IDashboard;
    dashboard : IDashboard;
    saveEnabled: boolean;
    makeActive : boolean;

    init(opts : any) : void;
    setExisting(existing : IDashboard) : void;
    setMakeActive(makeActive : boolean) : void;
    save() : void;
    cancel() : void;
}
interface IDashboardLayout {
    key: string;
    name: string;
    iconProps?: any;
    applyLayout: (dashboard : IDashboard) => Promise<any> | any;
    isLayoutApplied: (dashboard : IDashboard) => boolean;
    createActions?: (dashboard : IDashboard) => any[];
}


interface IDashboardList extends IComponent {
    sync: ISyncModel;
    active: IDashboard;
    activeIndex: number;
    dashboards : IDashboard[];
    dashboardCount: number;
    setActive(active : IDashboard) : void;
    setActiveIndex(activeIndex : number) : void;
    add(dashboard : IDashboard, makeActive?: boolean) : void;
    clear() : void;
    load() : Promise<any>;
}

interface IDragManager {
    drag: IWindow;
    dragStart(drag : IWindow) : void;
    dragEnd() : void;
}

interface IGridConfig {
    type?: string;
    cellSize?: number;
    cellMargin?: number;
    rows?: number;
    columns?: number;
    defaultWindowColSpan?: number;
    defaultWindowRowSpan?: number;
    windows?: IWindowConfig[];
    closeDisabled?: boolean;
    maximizedIndex?: number;
}

interface IGrid extends IWindowManager {
    rows: number;
    columns: number;
    cellSize: number;
    cellMargin: number;
    gridWidth : number;
    gridHeight : number;
    defaultWindowColSpan : number;
    defaultWindowRowSpan : number;
    setCellSize(cellSize : number) : void;
    setCellMargin(cellMargin : number) : void;
    setRows(rows : number) : void;
    setColumns(columns : number) : void;
    setDefaultWindowColSpan(defaultWindowColSpan : number) : void;
    setDefaultWindowRowSpan(defaultWindowRowSpan : number) : void;
    moveTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    resizeTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    getCollisions(pos : IGridBounds) : IWindow[];
    getBounds(window : IWindow) : IGridBounds;
    setBounds(window : IWindow, pos : IGridBounds) : void;
    config: IGridConfig;
    setConfig(config : IGridConfig) : void;
}

interface IGridBounds {
    rowIndex?: number;
    rowSpan?: number;
    colIndex?: number;
    colSpan?: number;
}


interface IPortal {
    setViewport(x: number, y: number, width: number, height: number);
    scrollIntoView() : void;
    bringToFront() : void;
    bringToBase() : void;
    destroy() : void;
}

interface IPortalManager {
    getPortal(window : IWindow) : IPortal;
    destroyPortal(window : IWindow) : void;
    destroy() : void;
}

interface ISplit extends IComponent {
    offset : number;
    first: IComponent;
    second: IComponent;
    splitActive : boolean;
    setOffset(offset : number) : void;
    setFirst(first : IComponent) : void;
    setSecond(second : IComponent) : void;
    setSplitActive(splitActive : boolean) : void;
}

interface IHSplitConfig {
    type?: string;
    offset?: number;
    left?: any;
    right?: any;
    leftWidth?: number;
    minItemWidth?: number;
}

interface IHSplit extends ISplit {
    minItemWidth: number;
    leftWidth: number;
    rightWidth: number;
    splitterWidth: number;
    left: IComponent;
    right: IComponent;
    setLeft(left : IComponent) : void;
    setRight(right : IComponent) : void;
    setLeftWidth(leftWidth : number) : void;
    setRightWidth(rightWidth : number) : void;
    setMinItemWidth(minItemWidth : number) : void;
    config : IHSplitConfig;
    setConfig(config : IHSplitConfig) : void;
    columnCount : number;
}

interface IVSplitConfig {
    type?: string;
    offset?: number;
    top?: any;
    bottom?: any;
    topHeight?: number;
    minItemHeight?: number;
}

interface IVSplit extends ISplit {
    minItemHeight: number;
    topHeight: number;
    bottomHeight: number;
    splitterHeight: number;
    top: IComponent;
    bottom: IComponent;
    setTop(top : IComponent) : void;
    setBottom(bottom : IComponent) : void;
    setMinItemHeight(minItemHeight : number) : void;
    config : IVSplitConfig;
    setConfig(config : IVSplitConfig) : void;
    rowCount : number;
}
interface ISplittable {
    splitLeft(newComp?: IComponent) : void;
    splitRight(newComp?: IComponent) : void;
    splitTop(newComp?: IComponent) : void;
    splitBottom(newComp?: IComponent) : void;
}

interface IStackConfig {
    type?: string;
    activeIndex?: number;
    windows?: IWindowConfig[];
    closeDisabled?: boolean;
}

interface IStack extends IWindowManager, ISplittable {
    active : IWindow;
    activeIndex: number;
    headerHeight: number;
    setActiveIndex(activeIndex : number) : void;
    setActive(win : IWindow) : void;
    setHeaderHeight(headerHeight : number) : void;
    dropWindow(refWindow?: IWindow) : void;
    config: IStackConfig;
    setConfig(config : IStackConfig) : void;
}

interface IViewFactory {
    createView(comp : IComponent) : React.ReactNode;
}

interface IViewport {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IWindowConfig {
    type?: string;
    title?: string;
    closeDisabled?: boolean;
    path?: string;
    query?: any;
    params?: any;
    contentHidden?: boolean;
    settings?: any;
}

interface IWindow extends IComponent {
    name: string;
    path: string;
    params : any;
    query : any;
    title: string;
    onClose : IConsumerFunc<IWindow>
    active : boolean;
    contentHidden : boolean;
    appHost: IAppHostModel;
    transient : boolean;
    manager : IWindowManager;
    settings : IWindowSettings;
    dragging: boolean;
    dragState : any;
    resizing: boolean;
    maximized: boolean;
    setPath(path : string) : void;
    setParams(params : any) : void;
    setQuery(query : any) : void;
    setTitle(title : string) : void;
    activate() : void;
    setContentHidden(hidden : boolean) : void;
    toggleContent() : void;
    load(request?: IRequest) : Promise<any>;
    open(request: IRequest) : Promise<IWindow>;
    setTransient(transient : boolean) : void;
    setDragState(dragState : any) : void;
    clearDragState() : void;
    dragStart(dragState?: any) : void;
    dragEnd() : void;
    resizeStart(type : WindowResizeType) : void;
    resizeEnd();
    maximize();
    restoreSize();
    setMaximized(maximized : boolean) : void;
    config : IWindowConfig;
    setConfig(config : IWindowConfig) : void;
}


interface IWindowManager extends IComponent, IDragManager {
    first : IWindow;
    last : IWindow;
    windowCount : number;
    windows: IWindow[];
    windowSettings: IWindowSettings;
    resizing: IWindow;
    maximized: IWindow;
    maximizedIndex: number;
    resizeType: WindowResizeType;
    isRequiresOverflow: boolean;
    add(win : IWindow, opts? : any) : void;
    addNew(opts?: any) : void;
    open(request : IRequest) : Promise<IWindow>;
    resizeStart(win : IWindow, type : WindowResizeType) : void;
    resizeEnd();
    setMaximized(window : IWindow) : void;
    setMaximizedIndex(maximizedIndex : number) : void;
}

interface IWindowSettings {
    borderWidth: number;
    headerHeight: number;
    resizable: boolean;
    draggable: boolean;
    data: any;
    setBorderWidth(border : number) : void;
    setHeaderHeight(headerHeight : number) : void;
    setResizable(resizable : boolean) : void;
    setDraggable(draggable : boolean) : void;
    setData(data : any) : void;
    config : any;
    setConfig(config : any) : void;
}

interface IComponentFactoryMap {
    [key : string]: () => IComponent;
}

// export { WindowResizeType }
// export { IWindowSettings }
// export { IWindowManager }
// export { IWindow, IWindowConfig }
// export { IViewport }
// export { IViewFactory }
// export { IStack, IStackConfig }
// export { ISplittable }
// export {
//     ISplit,
//     IHSplit,
//     IHSplitConfig,
//     IVSplit,
//     IVSplitConfig
// }
// export { IPortalManager }
// export { IPortal }
// export { IGridBounds }
// export { IGrid, IGridConfig }
// export { IDragManager }
// export { IDashboardList }
// export { IDashboardLayout }
// export { IDashboardAdd }
// export { IDashboard }
// export { IComponentRemoveOptions, IComponentRemove }
// export { IComponentFactory }
// export { IComponent }