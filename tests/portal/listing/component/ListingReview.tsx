import { timestampIO } from "@coglite/framework/common/MomentDataUtils";
import { isWhitespace } from "@coglite/framework/common/StringFilters";
import { split } from "@coglite/framework/common/StringUtils";
import { ActivityItem } from "office-ui-fabric-react/lib/ActivityItem";
import { Link } from "office-ui-fabric-react/lib/Link";
import { Rating } from "office-ui-fabric-react/lib/Rating";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import * as React from "react";
import { UserInfo } from "../../user/component/UserProfile";
import { IListingReview } from "../IListingReview";
import { getClassNames } from "./ListingReview.classNames";
import { getStyles, IListingReviewStyles } from "./ListingReview.styles";




interface IListingReviewProps {
    review: IListingReview;
    className?: string;
    styles?: IListingReviewStyles;
}

const getReviewName = (activity : IListingReview) : string => {
    return activity.author ? activity.author.display_name : "";
};

const getReviewInitials = (activity : IListingReview) : string => {
    if(activity.author && activity.author.display_name) {
        const items = split(activity.author.display_name, isWhitespace);
        const letters = items.map(e => {
            return e.charAt(0).toUpperCase();
        });
        return letters.join("");
    }
    return "";
};

class ListingReviewUser extends React.Component<IListingReviewProps, any> {
    private _onRenderContent = () => {
        return <UserInfo userProfile={this.props.review.author} />;
    }
    private _onClickUser = () => {

    }
    render() {
        return (
            <TooltipHost tooltipProps={{ onRenderContent: this._onRenderContent }} calloutProps={{ gapSpace: 0 }}>
                <Link onClick={this._onClickUser}>{getReviewName(this.props.review)}</Link>
            </TooltipHost>
        );
    }
}

class ListingReview extends React.Component<IListingReviewProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const review = this.props.review;
        return (
            <ActivityItem className={classNames.root} activityDescription={
                [
                    <strong key="user"><ListingReviewUser {...this.props} /></strong>,
                    <Rating key="rating" rating={review.rate} readOnly={true} />,
                    <div key="text" className={classNames.text}>
                        {review.text}
                    </div>
                ]
            } activityPersonas={[
                {
                    text: getReviewName(review),
                    imageInitials: getReviewInitials(review)
                }
            ]}
            timeStamp={timestampIO(review.edited_date || review.created_date)} />
        );
    }
} 

export { IListingReviewProps, ListingReview };
