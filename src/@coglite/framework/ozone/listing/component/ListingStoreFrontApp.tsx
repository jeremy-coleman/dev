import * as React from "react";
import { observer } from "mobx-react";
import { IListing } from "../IListing";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IAppProps } from "@coglite/framework/common/component/IAppProps";
import { UserAdminContext } from "../../user/UserAdminContext";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { ListingSearchModel } from "../model/ListingSearchModel";
import { ListingSearch } from "./ListingSearch";
import { ListingViewConfig } from "./ListingViewConfig";
import { PathsContext } from "../../PathsContext";

@observer
class ListingStoreFrontApp extends React.Component<IAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get searchText() : string {
        return this.props.match.params.search;
    }
    get category() : string[] {
        return this.props.match.params.category;
    }
    private _onSelectItem = (listing : IListing) => {
        this.host.load({ path: PathsContext.value.listingDetails(listing.id) });
    }
    private _onOpen = (listing : IListing) => {
        this.host.open({ path: PathsContext.value.listingLaunch(listing.id), makeActive: true, title: listing.title });
    }
    private _onAdd = () => {
        this.host.load({ path: PathsContext.value.listingAdd() });
    }
    private _onOpenAllListings = () => {
        this.host.load({ path: PathsContext.value.listings() });
    }
    private _onRefresh = () =>{
        this.listingSearch.refresh();
    }
    get listingSearch() {
        return this.host.getState("listingSearch", () => {
            return new ListingSearchModel();
        });
    }
    componentWillMount() {
        this.host.title = `${ListingViewConfig.storeLabel}`;
        if(this.searchText || this.category) {
            this.listingSearch.setRequest({ search: this.searchText, category: this.category });
        }
    }
    render() {
        const items : IContextualMenuItem[] = [];
        const isAdmin = UserAdminContext.value(this.userProfile);
        if(isAdmin) {
            items.push(
                {
                    key: "add",
                    name: `Add ${ListingViewConfig.label}`,
                    title: `Add a new ${ListingViewConfig.label}`,
                    iconProps: {
                        iconName: "Add"
                    },
                    onClick: this._onAdd
                }
            );
        }
        const farItems : IContextualMenuItem[] = [];
        if(isAdmin) {
            farItems.push({
                key: "listings",
                name: `All ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "ViewList"
                },
                onClick: this._onOpenAllListings
            });
        }
        farItems.push(
            {
                key: "refresh",
                title: !this.listingSearch.sync.syncing ? `Refresh ${ListingViewConfig.labelPlural}` : "Refreshing...",
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listingSearch.sync.syncing
            }
        );
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingSearch search={this.listingSearch} onSelectItem={this._onSelectItem} onOpen={this._onOpen} />
            </OzoneAppView>
        );
    }
}

export {
    ListingStoreFrontApp,
    ListingStoreFrontApp as default
}