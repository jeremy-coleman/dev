import { IListingModel } from "./IListingModel";
import { SyncSupplier } from "@coglite/framework/common/model/SyncSupplier";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }