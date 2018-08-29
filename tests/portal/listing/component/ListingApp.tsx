import { IAppHost } from "@coglite/framework/common/IAppHost";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react";
import * as React from "react";
import { ICategory } from "../../category/ICategory";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { IUserProfile } from "../../user/IUserProfile";
import { UserAdminContext } from "../../user/UserAdminContext";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { isOwner } from "../ListingHelper";
import { ListingPaths } from "../ListingPaths";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { ListingDeleteStore } from "../model/ListingDeleteStore";
import { ListingModelSupplier } from "../model/ListingModelSupplier";
import { ListingContainer, ListingDeleteDialog } from "./Listing";
import { ListingViewConfig } from "./ListingViewConfig";


@observer
class ListingApp extends React.Component<IOzoneAppProps, any> {
    private _listingSupplier : IListingModelSupplier;
    private _titleSetDisposer : IReactionDisposer;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    get isAdmin() {
        return UserAdminContext.value(this.userProfile);
    }
    get isOwner() {
        return isOwner(this.listing, this.userProfile);
    }
    get listingId() {
        return this.props.match.params.listingId;
    }
    get listing() : IListingModel {
        return this._listingSupplier.value;
    }
    get syncing() {
        return this._listingSupplier.sync.syncing;
    }
    private _onEdit = () => {
        this.host.load({ path: ListingPaths.edit(this.listingId) });
    }
    private _onDelete = () => {
        ListingDeleteStore.setValue(this.listing);
    }
    private _onOpen = () => {
        this.host.open({ path: ListingPaths.launch(this.listingId), makeActive: true, title: this.listing.title });
    }
    private _onSubmit = () => {
        this.listing.submitForApproval();
    }
    private _onApprove = () => {
        this.listing.approve();
    }
    private _onReject = () => {
        this.listing.reject();
    }
    private _onRefresh = () => {
        this._listingSupplier.refresh();
    }
    private _onSelectCategory = (category : ICategory) => {
        console.log("-- On Select Category: " + JSON.stringify(category));
    }
    componentWillMount() {
        const s = new ListingModelSupplier(this.listingId);
        s.load();
        this._listingSupplier = s;
        this._titleSetDisposer = autorun(() =>
            this.host.setTitle(s.sync.syncing ? "Loading..." : s.value ? `${s.value.title} - ${ListingViewConfig.label} Details` : undefined)
        );
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        const items : IContextualMenuItem[] = [];
        
        if(!this.syncing && this.listing) {
            if(this.isAdmin || this.isOwner) {
                items.push({
                    key: "edit",
                    name: "Edit",
                    iconProps: {
                        iconName: "Edit"
                    },
                    onClick: this._onEdit
                });

                const approvalStatus = this.listing.approval_status;

                if(this.listing.canSubmit) {
                    items.push({
                        key: "submit",
                        name: "Submit for Approval",
                        iconProps: { iconName: "WorkFlow" },
                        onClick: this._onSubmit
                    });
                }

                if(this.isAdmin && approvalStatus === ListingApprovalStatus.PENDING) {
                    items.push({
                        key: "approve",
                        name: "Approve",
                        iconProps: { iconName: "Accept" },
                        onClick: this._onApprove
                    });
                    items.push({
                        key: "reject",
                        name: "Reject",
                        iconProps: { iconName: "Cancel" },
                        onClick: this._onReject
                    });
                }
            }

            if(this.isAdmin) {
                items.push({
                    key: "delete",
                    name: "Delete",
                    iconProps: {
                        iconName: "Delete"
                    },
                    onClick: this._onDelete,
                    disabled: this.syncing
                });
            }
        }

        const farItems : IContextualMenuItem[] = [
            {
                key: "refresh",
                title: `Refresh ${ListingViewConfig.label}`,
                iconProps: {
                    iconName: "Refresh"
                },
                onClick: this._onRefresh,
                disabled: this.syncing
            }
        ];
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items, farItems: farItems }}>
                <ListingDeleteDialog listingSupplier={ListingDeleteStore} />
                <ListingContainer listingSupplier={this._listingSupplier}
                                  onEdit={this._onEdit}
                                  onDelete={this._onDelete}
                                  onOpen={this._onOpen}
                                  onSelectCategory={this._onSelectCategory} />
            </OzoneAppView>
        );
    }
}

export { ListingApp, ListingApp as default };
