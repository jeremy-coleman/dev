import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { IListingModel } from "./IListingModel";

interface IListingModelSupplier extends ISyncSupplier<IListingModel> {
    listingId: string | number;
}

export { IListingModelSupplier }