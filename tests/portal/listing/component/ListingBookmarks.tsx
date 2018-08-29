import { SyncSpinner } from "@coglite/framework/common/component/SyncSpinner";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import * as React from "react";
import { IListing } from "../IListing";
import { IListingBookmarkListModel } from "../model/IListingBookmarkListModel";
import { ListingBookmarkTile } from "./ListingBookmarkTile";
import { ListingList } from "./ListingList";


interface IListingBookmarksProps {
    bookmarkList: IListingBookmarkListModel;
    onSelectListing?: (listing : IListing) => void;
    onRenderNoBookmarks?: () => React.ReactNode;
}

@observer
class ListingBookmarks extends React.Component<IListingBookmarksProps, any> {
    private _onRemoveItem = (listing) => {
        this.props.bookmarkList.removeBookmark(listing);
    }
    private _onRenderListing = (listing, idx, props) => {
        return <ListingBookmarkTile key={listing.id}
                                    listing={listing}
                                    onClick={props.onSelectItem}
                                    onRemove={this._onRemoveItem} />;
    }
    render() {
        if(this.props.bookmarkList.value && this.props.bookmarkList.value.length > 0) {
            const listings = this.props.bookmarkList.value.map(bookmark => bookmark.listing);
            return <ListingList listings={listings}
                                onSelectItem={this.props.onSelectListing}
                                compact={true}
                                wrapping={true}
                                onRenderListing={this._onRenderListing} />;
        }
        return this.props.onRenderNoBookmarks ? this.props.onRenderNoBookmarks() :
            (
                <MessageBar messageBarType={MessageBarType.warning}>
                    You haven't bookmarked anything.
                </MessageBar>
            );
    }
}

class ListingBookmarksContainer extends React.Component<IListingBookmarksProps, any> {
    componentWillMount() {
        this.props.bookmarkList.load();
    }
    private _onRenderDone = () => {
        return <ListingBookmarks {...this.props} />;
    }
    render() {
        return <SyncSpinner sync={this.props.bookmarkList.sync} onRenderDone={this._onRenderDone} />
    }
}

export { IListingBookmarksProps, ListingBookmarks, ListingBookmarksContainer };
