import { ISync } from "./ISync";

interface ISyncOptions {
    type?: any;
    id?: any;
}

interface IMutableSync extends ISync {
    syncStart(opts?: ISyncOptions) : void;
    syncEnd() : void;
    syncError(error : any) : void;
    clear() : void;
}

export { ISyncOptions, IMutableSync }