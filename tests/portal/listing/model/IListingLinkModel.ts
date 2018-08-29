import { IError } from "@coglite/framework/common/IError";
import { IListingLink } from "../IListingLink";
import { IListingModel } from "./IListingModel";

interface IListingLinkModel extends IListingLink {
    validationErrors: IError[];
    listing: IListingModel;
    data : IListingLink;
    valid : boolean;
    setName(name : string) : void;
    setUrl(url : string) : void;
    validate() : void;
    removeFromListing() : void;
    setData(data : IListingLink) : void;
}

export { IListingLinkModel };
