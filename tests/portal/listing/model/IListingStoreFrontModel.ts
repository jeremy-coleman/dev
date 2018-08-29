import { ISync } from "@coglite/framework/common/ISync";
import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { IListing } from "../IListing";
import { IListingStoreFront } from "../IListingStoreFront";

interface IListingStoreFrontModel extends ISyncSupplier<IListingStoreFront> {
    searchSync : ISync;
    searchText : string;
    searchResults : IListing[];
    setSearchText(searchText : string) : void;
}

export { IListingStoreFrontModel };
