import { IListModel } from "@coglite/framework/common/model/IListModel";
import { IListingModel } from "./IListingModel";

interface IListingRelatedListModel<T> extends IListModel<T> {
    listing : IListingModel;
}

export { IListingRelatedListModel };
