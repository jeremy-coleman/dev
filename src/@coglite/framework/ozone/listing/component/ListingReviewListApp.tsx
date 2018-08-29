import * as React from "react";
import { ListingReviewListContainer, ListingReviewList } from "./ListingReviewList";
import { IListingModel } from "../model/IListingModel";
import { ListingSupplierContainer } from "./ListingSupplier";
import { findById } from "../model/ListingFinder";
import { getReviews } from "../model/ListingReviewHelper";
import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { IAppHostBaseProps } from "@coglite/framework/common/component/IAppHostBaseProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { OzoneAppView } from "../../common/component/OzoneAppView";

interface IListingReviewListAppProps extends IAppHostBaseProps {
    listingId: number;
}

class ListingReviewListApp extends React.Component<IListingReviewListAppProps, any> {
    private _onRenderListing = (listing : IListingModel) => {
        return <ListingReviewListContainer reviewList={getReviews(listing)} />;
    }
    get listingSupplier() : ISyncSupplier<IListingModel> {
        return this.props.host.getState("listingSupplier", () => {
            return findById(this.props.listingId);
        });
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "title",
                name: "Listing Reviews"
            }  
        ];
        return (
            <OzoneAppView host={this.props.host} commandBarProps={{ items: items }}>
                <ListingSupplierContainer listingSupplier={this.listingSupplier} onRenderListing={this._onRenderListing} />
            </OzoneAppView>
        );
    }
}

export { IListingReviewListAppProps, ListingReviewListApp }
