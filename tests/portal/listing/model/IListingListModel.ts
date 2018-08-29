import { IListModel } from "@coglite/framework/common/model/IListModel";
import { IListing } from "../IListing";
import { IListingListCounts } from "../IListingListCounts";

interface IListingListModel extends IListModel<IListing> {
    searchText : string;
    setSearchText(searchText : string) : void;
    counts: IListingListCounts;
}

export { IListingListModel };
