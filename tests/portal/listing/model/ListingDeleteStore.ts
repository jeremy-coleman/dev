import { SyncSupplier } from "@coglite/framework/common/model/SyncSupplier";
import { IListingModel } from "./IListingModel";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore };
