import { IListingReview } from "../IListingReview";
import { ISync } from "@coglite/framework/common/ISync";

interface IListingReviewModel extends IListingReview {
    sync : ISync;
    setText(text : string) : void;
    setRate(rate : number) : void;
    save() : Promise<any>;
}

export { IListingReviewModel }