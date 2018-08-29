import { IAppHost } from "@coglite/framework/common/IAppHost";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react";
import * as React from "react";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { IUserProfile } from "../../user/IUserProfile";
import { IListing } from "../IListing";
import { ListingPaths } from "../ListingPaths";
import { ListingListModel } from "../model/ListingListModel";
import { ListingListPage } from "./ListingListPage";
import { ListingViewConfig } from "./ListingViewConfig";



@observer
class ListingListApp extends React.Component<IOzoneAppProps, any> {
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onSelectItem = (item : IListing) => {
        this.host.load({ path: ListingPaths.details(item.id) });
    }
    private _onAdd = () => {
        this.host.load({ path: ListingPaths.add() });
    }
    private _onRefresh = () =>{
        this.listings.refresh();
    }
    private _onOpen = (listing : IListing) => {
        this.host.open({ path: ListingPaths.launch(listing.id), makeActive: true, title: listing.title });
    }
    get listings() {
        let listings = this.host.state.listings;
        if(!listings) {
            listings = new ListingListModel();
            this.host.setState({ listings: listings });
        }
        return listings;
    }
    componentWillMount() {
        this.host.title = `All ${ListingViewConfig.labelPlural}`;
        // we deliberately refresh here
        this.listings.load();
    }
    render() {
        const items : IContextualMenuItem[] = [];
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
        const farItems : IContextualMenuItem[] = [
            {
                key: "refresh",
                title: `Refresh ${ListingViewConfig.labelPlural}`,
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.listings.sync.syncing
            }
        ];
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingListPage compact wrapping
                                 listings={this.listings}
                                 onSelectItem={this._onSelectItem}
                                 onOpen={this._onOpen} />
            </OzoneAppView>
        );
    }
}

export { ListingListApp, ListingListApp as default };
