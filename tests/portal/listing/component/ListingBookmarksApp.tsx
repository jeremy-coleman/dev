import { AppLink } from "@coglite/framework/common/component/AppLink";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IContextualMenuItem, MessageBar, MessageBarType } from "office-ui-fabric-react";
import * as React from "react";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { IUserProfile } from "../../user/IUserProfile";
import { UserAdminContext } from "../../user/UserAdminContext";
import { IListing } from "../IListing";
import { ListingPaths } from "../ListingPaths";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { ListingBookmarksContainer } from "./ListingBookmarks";
import { ListingViewConfig } from "./ListingViewConfig";




class ListingBookmarksApp extends React.Component<IOzoneAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectListing = (listing : IListing) => {
        this.host.load({ path: ListingPaths.launch(listing.id) });
    }
    componentWillMount() {
        this.host.setTitle("Bookmarks");
    }
    private _onLoadStore = () => {
        this.host.load({ path: ListingPaths.store() });
    }
    private _onLoadAllListings = () => {
        this.host.load({ path: ListingPaths.allListings() });
    }
    private _onRenderNoBookmarks = () => {
        return (
            <div style={{ padding: 8 }}>
                <MessageBar  messageBarType={MessageBarType.info}>
                    You haven't bookmarked anything. <AppLink host={this.host} request={{ path: ListingPaths.store() }} onClick={this._onLoadStore}>Take a look in the {ListingViewConfig.storeLabel}</AppLink>.
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

export { ListingBookmarksApp, ListingBookmarksApp as default };
