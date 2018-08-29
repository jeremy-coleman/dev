import { IMutableSupplier } from "./IMutableSupplier";
import { ISync } from "./ISync";

interface ISyncSupplier<T> extends IMutableSupplier<T> {
    sync: ISync;
    load() : Promise<any>;
    refresh() : Promise<any>;
}

export { ISyncSupplier }