import ISyncHandle from "./ISyncHandle";
import IHandleModel from "./IHandleModel";

interface ISyncHandleModel<T = any> extends ISyncHandle<T>, IHandleModel<T> {
    refresh() : Promise<any>;
    load() : Promise<any>;
}

export { ISyncHandleModel as default, ISyncHandleModel }