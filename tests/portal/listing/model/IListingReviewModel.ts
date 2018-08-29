import { ISync } from "@coglite/framework/common/ISync";
import { IListingReview } from "../IListingReview";

interface IListingReviewModel extends IListingReview {
    sync : ISync;
    setText(text : string) : void;
    setRate(rate : number) : void;
    save() : Promise<any>;
}

export { IListingReviewModel };
