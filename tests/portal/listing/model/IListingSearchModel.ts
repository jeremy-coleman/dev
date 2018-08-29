import { ISync } from "@coglite/framework/common/ISync";
import { IListModel } from "@coglite/framework/common/model/IListModel";
import { IListing } from "../IListing";
import { IListingSearchRequest } from "../IListingSearchRequest";

interface IListingSearchModel extends IListModel<IListing>, IListingSearchRequest {
    sync: ISync;
    setSearch(search : string) : void;
    setCategory(category : string[]) : void;
    setRequest(params : IListingSearchRequest) : void;
}

export { IListingSearchModel };
