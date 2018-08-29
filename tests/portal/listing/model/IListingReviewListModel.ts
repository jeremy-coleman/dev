import { IListingReview } from "../IListingReview";
import { IListingRelatedListModel } from "./IListingRelatedListModel";
import { IListingReviewModel } from "./IListingReviewModel";

interface IListingReviewListModel extends IListingRelatedListModel<IListingReview> {
    newReview : IListingReviewModel;
    add() : void;
    cancelEdit() : void;
}

export { IListingReviewListModel };
