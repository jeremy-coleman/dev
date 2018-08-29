import { Context } from "./Context";
import { IStorageService } from "./service/IStorageService";

const StorageServiceContext = new Context<IStorageService>();

export { StorageServiceContext, StorageServiceContext as default }