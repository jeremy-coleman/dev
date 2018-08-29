import { IListModel } from "@coglite/framework/common/model/IListModel";
import { IListing } from "../IListing";
import { IListingBookmark } from "../IListingBookmark";

interface IListingBookmarkListModel extends IListModel<IListingBookmark> {
    isBookmarked(listing : IListing) : boolean;
    addBookmark(listing : IListing) : void;
    removeBookmark(listing : IListing) : void;
}

export { IListingBookmarkListModel };
