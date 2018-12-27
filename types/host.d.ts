/// <reference path="./router.d.ts" />

interface ITypedValue<V = any> {
    type: string;
    value: V;
}

interface IValidatable {
    validate?(errorHandler : (error : any) => void) : void;
}

interface ISyncSupplier<T> extends IMutableSupplier<T> {
    sync: ISyncModel;
    load() : Promise<any>;
    refresh() : Promise<any>;
}

interface ISyncModel<I = any> {
    id: I;
    type: any;
    startDate: Date;
    endDate: Date;
    error: any;
    syncing: boolean;
    hasSynced: boolean;
}

type ISupplierFunc<T> = {
    () : T;
};

interface ISupplier<T> {
    readonly value: T;
}


interface IStateManager {
    state : any;
    setState(state : any) : void;
    getState<T = any>(key : string, factory?: ISupplierFunc<T>, shouldUpdate?: IPredicateFunc<T>) : T;
}

// interface ISortProps {

// }

interface ISortModel {
    field: string;
    descending: boolean;
    setField(field: string) : void;
    setDescending(descending: boolean) : void;
    setSort(field: string, descending?: boolean) : void;
    toggleSort(field: string) : void;
    clear() : void;
}

interface ISortableListModel<T> extends IListModel<T> {
    sort: ISortModel;
}


interface ISelectionModel<T> {
    selectedItems: T[];
    selectionCount: number;
    setSelectedItems(selectedItems: T[]);
    toggleItem(item : T, selected?: boolean) : void;
    clearSelection();
}

interface ISelectableListModel<T = any> extends IListModel<T> {
    selection: ISelectionModel<T>;
    selectedIndexes: number[];
}

interface IRefListItem extends IKeyedTextItem {}

interface IRefList {
    getItemByKey(key: string, defaultValue?: IRefListItem) : IRefListItem;
    items: IRefListItem[];
    itemsSorted: IRefListItem[];
}

type IPredicateFunc<T = any, S = T[]> = {
    (value : T, index?: number, source?: S) : boolean;
}

interface IOptionListModel extends IListModel<IOption> {
    getOption(key: string, defaultValue?: IOption) : IOption;
    itemsSorted: IOption[];
}

interface ISyncOptions<I = any> {
    id?: I;
    type?: any;
}

interface IMutableSync<I = any> extends ISyncModel<I> {
    syncStart(opts?: ISyncOptions<I>) : void;
    syncEnd() : void;
    syncError(error : any) : void;
    clear() : void;
}

interface IMutableSupplier<T> extends ISupplier<T> {
    value : T;
    setValue(value: T) : Promise<any> | void;
    clearValue() : void;
}
interface IMapFunc<I = any, O = any, S = I[]> {
    (value : I, index?: number, source?: S) : O;
}

interface IListModel<T> extends IList<T>, ISyncSupplier<T[]> {
    total: number;
    itemsView: T[];
    addItem(item : T, atIndex?: number) : void;
    addItems(items : T[], atIndex?: number) : void;
    setItems(items: T[]) : void;
    clear() : void;
}



 interface IKeyValuePair<K = any, V = any> {
    key: K,
    value: V
};


 interface IKeyMapFunc<I = any, O = any> {
    (value : I, key : string | number) : O;
}

 interface IKeyedValue<K, V> {
    key: K;
    value: V;
}

 interface IKeyedItem {
    key: string;
    keyAliases?: string[];
    [field : string]: any;
}


 interface IKeyedTextItem extends IKeyedItem {
    text: string;
}

 interface IOption extends IKeyedItem {
    text: string;
}

interface IHistoryModel<T> extends IListModel<IHistoryEntry<T>> {
    saveSync : ISyncModel;
    save() : Promise<any>;
    load() : Promise<any>;
    addEntry(value : T) : Promise<any>;
}

interface IHistoryEntry<T> {
    timestamp: string;
    value: T;
    [key : string] : any;
}
interface IEvent {
    type: string;
    [key : string] : any;
}

interface IEventListener {
    handleEvent(event : IEvent) : void;
}

interface IEventListenerFunc {
    (event : IEvent) : void;
}

interface IEventTarget {
    addEventListener(type : string, handler : IEventListener | IEventListenerFunc) : void;
    removeEventListener(type : string, handler : IEventListener | IEventListenerFunc) : void;
}

interface IEventEmitter extends IEventTarget {
    emit(event : IEvent) : void;
}

interface IError {
    key?: string;
    keyTitle?: string;
    code?: string;
    message: string;
    [key: string] : any;
}

interface IConsumerFunc<T = any, S = T[]> {
    (value : T, index?: number, source?: S) : void;
}


interface IBoundProps<T = any, V = any> {
    binding?: IBinding<T, V>;
}



interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: string | ISupplierFunc<V>;
    setter?: string | IConsumerFunc<V>;
}


interface _IBoundTextFieldProps extends IBoundProps<any, string> {
    errors?: IError[];
    errorMessage?: any
};

type IBoundTextFieldProps =  _IBoundTextFieldProps;


interface IBasicAuthCredentials {
    username: string;
    password: string;
}



interface IAppProps {
    match: IRequest;
}

type IAppLauncher = {
    (request : IRequest) : any | Promise<any>;
};

interface IAppHostModel extends IEventEmitter, IStateManager {
    id: string;
    sync: ISyncModel;
    root: boolean;
    title: string;
    iconUrl?: string;
    icon: IAppIcon;
    view: any;
    path: string;
    params: any;
    query: any;
    initialized: boolean;
    router: IRouter;
    canGoBack : boolean;
    backRequest : IRequest;
    back() : void;
    setRouter(router : IRouter) : void;
    setTitle(title : string) : void;
    setIconUrl(iconUrl : string) : void;
    getUrl(request?: IRequest) : string;
    load(request?: IRequest) : Promise<any>;
    getUrl(request: IRequest) : string;
    open(request: IRequest) : Promise<IAppHostModel>;
    close() : void;
    setRoot(root : boolean) : void;
    setIcon(icon : IAppIcon) : void;
}

interface IAppHostBaseProps {
    host: IAppHostModel;
}

interface IList<T = any> {
    items: T[];
}

interface IAppIcon {
    url?: string;
    text?: string;
    name?: string;
    component?: any;
}

interface IAppHostProps extends IAppHostBaseProps {
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (props : IAppHostProps) => React.ReactNode;
    noLoadOnMount?: boolean;
}

interface IAppContainerBaseProps {
    router?: IRouter;
    launcher?: IAppLauncher;
    root?: boolean;
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (host : IAppHostProps) => React.ReactNode;
}

interface IAppContainerProps extends IRequest, IAppContainerBaseProps {}

// export { IAppIcon }
// export { IList }
// export { IAppHostBaseProps }
// export { IAppLauncher }
// export { IAppProps }
// export { IBasicAuthCredentials }
// export { IBinding }
// export { IBoundProps }
// export { IConsumerFunc }
// export { IEvent, IEventListener, IEventListenerFunc, IEventTarget, IEventEmitter }
// export { IHistoryEntry }
// export { IHistoryModel }
// export { IListModel };
// export { IMapFunc }
// export { IMutableSupplier }
// export { ISyncOptions, IMutableSync }
// export { IOptionListModel };
// export { IPredicateFunc }
// export { IRefListItem , IRefList};
// export { ISelectableListModel }
// export { ISelectionModel };
// export { ISortableListModel }
// export { ISortModel };
// export { ISupplier, IStateManager }
// export { ISupplierFunc }
// export { ISyncModel }
// export { ISyncSupplier }
// export { IValidatable  };
// export { ITypedValue }