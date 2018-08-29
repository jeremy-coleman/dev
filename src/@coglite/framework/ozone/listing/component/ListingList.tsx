import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { ListingListModel } from "../model/ListingListModel";
import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { Sync } from "@coglite/framework/common/component/Sync";
import { IListingListModel } from "../model/IListingListModel";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { ListingTile } from "./ListingTile";
import { IListingListStyles, getStyles } from "./ListingList.styles";
import { getClassNames } from "./ListingList.classNames";

interface IListingListProps {
    listings: IListing[];
    compact?: boolean;
    wrapping?: boolean;
    onRenderListing?: (listing : IListing, index?: number, props?: IListingListProps) => React.ReactNode;
    onSelectItem?: (item : IListing) => void;
    className?: string;
    styles?: IListingListStyles;
    onRenderEmpty?: () => React.ReactNode;
}

const defaultListingRenderer = (listing : IListing, index : number, props : IListingListProps) => {
    return <ListingTile key={listing.id} listing={listing} onClick={props.onSelectItem} />;
};

class ListingList extends React.Component<IListingListProps, any> {
    private _onRenderListing = (listing : IListing, index : number) => {
        const r = this.props.onRenderListing || defaultListingRenderer;
        return r(listing, index, this.props);
    }
    render() {
        if(this.props.listings && this.props.listings.length > 0) {
            const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className, this.props.compact, this.props.wrapping);
            const items = this.props.listings.map(this._onRenderListing);
            return (
                <div className={classNames.root}>
                    {items}
                </div>
            );
        }
        return this.props.onRenderEmpty ? this.props.onRenderEmpty() : null;
    }
}

interface IListingListContainerProps {
    listings: IListingListModel;
    compact?: boolean;
    wrapping?: boolean;
    onRenderListing?: (listing : IListing, index?: number, props?: IListingListProps) => React.ReactNode;
    onSelectItem?: (item : IListing) => void;
}

class ListingListContainer extends React.Component<IListingListContainerProps, any> {
    componentWillMount() {
        this.props.listings.load();
    }
    private _onRenderDone = () => {
        return <ListingList listings={this.props.listings.itemsView}
                            onSelectItem={this.props.onSelectItem}
                            onRenderListing={this.props.onRenderListing}
                            compact={this.props.compact}
                            wrapping={this.props.wrapping} />;
    }
    render() {
        return <Sync sync={this.props.listings.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Listings..." />
    }
}

export {
    IListingListProps,
    IListingListContainerProps,
    ListingListContainer,
    ListingList
}