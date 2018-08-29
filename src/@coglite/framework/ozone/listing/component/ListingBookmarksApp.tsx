import * as React from "react";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { IListing } from "../IListing";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { AppLink } from "@coglite/framework/common/component/AppLink";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IAppProps } from "@coglite/framework/common/component/IAppProps";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";
import { UserAdminContext } from "../../user/UserAdminContext";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { ListingViewConfig } from "./ListingViewConfig";
import { PathsContext } from "../../PathsContext";

class ListingBookmarksApp extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectListing = (listing : IListing) => {
        this.host.load({ path: PathsContext.value.listingLaunch(listing.id), replace: true });
    }
    componentWillMount() {
        this.host.setTitle("Bookmarks");
    }
    private _onLoadStore = () => {
        this.host.load({ path: PathsContext.value.store() });
    }
    private _onLoadAllListings = () => {
        this.host.load({ path: PathsContext.value.listings() });
    }
    private _onRenderNoBookmarks = () => {
        return (
            <div style={{ padding: 8 }}>
                <MessageBar  messageBarType={MessageBarType.info}>
                    You haven't bookmarked anything. <AppLink host={this.host} request={{ path: PathsContext.value.store() }} onClick={this._onLoadStore}>Take a look in the {ListingViewConfig.storeLabel}</AppLink>.
                </MessageBar>
            </div>
        );
    }
    render() {
        const farItems : IContextualMenuItem[] = [
            {
                key: "store",
                name: `${ListingViewConfig.storeLabel}`,
                iconProps: {
                    iconName: "Shop"
                },
                onClick: this._onLoadStore
            }
        ];
        if(UserAdminContext.value(this.userProfile)) {
            farItems.push({
                key: "listings",
                name: `All ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "ViewList"
                },
                onClick: this._onLoadAllListings
            });
        }
        
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: [], farItems: farItems }}>
                <ListingBookmarksContainer bookmarkList={ListingBookmarkListStore} onSelectListing={this._onSelectListing} onRenderNoBookmarks={this._onRenderNoBookmarks} />
            </OzoneAppView>
        );
    }
}

export {
    ListingBookmarksApp,
    ListingBookmarksApp as default
}