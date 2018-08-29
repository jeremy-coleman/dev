import { IAppHost } from "@coglite/framework/common/IAppHost";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react";
import * as React from "react";
import { IOzoneAppProps } from "../../common/component/IOzoneAppProps";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { IUserProfile } from "../../user/IUserProfile";
//import { popAndLoad } from "./ListingNavHelper";
import { ListingPaths } from "../ListingPaths";
import { IListingModel } from "../model/IListingModel";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { ListingModelSupplier } from "../model/ListingModelSupplier";
import { ListingFormContainer } from "./ListingForm";


@observer
class ListingEditApp extends React.Component<IOzoneAppProps, any> {
    private _titleSetDisposer : IReactionDisposer;
    private _listingSupplier : IListingModelSupplier;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onBack = () => {
        if(this.host.canGoBack) {
            this.host.back();
        } else {
            this.host.load({ path: ListingPaths.details(this.listingId) });
        }
    }
    private _onSave = (listing : IListingModel) => {
        listing.save().then(this._onBack).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onSaveImmediate = () => {
        this._onSave(this._listingSupplier.value);
    }
    private _onSubmitForApproval = (listing : IListingModel) => {
        listing.submitForApproval().then(this._onBack).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _submit = () => {
        this._onSubmitForApproval(this._listingSupplier.value);
    }
    get listingId() {
        return this.props.match.params.listingId;
    }
    componentWillMount() {
        const s = new ListingModelSupplier(this.listingId);
        s.load();
        this._listingSupplier = s;
        this._titleSetDisposer = autorun(() => {
            this.host.setTitle(s.sync.syncing ? "Loading..." : s.value ? s.value.title : undefined);
        });
    }
    componentWillUnount() {
        if(this._titleSetDisposer) {
            this._titleSetDisposer();
            delete this._titleSetDisposer;
        }
    }
    render() {
        const items : IContextualMenuItem[] = [];
        items.push(
            {
                key: "cancel",
                name: "Cancel",
                iconProps: {
                    iconName: "Cancel"
                },
                onClick: this._onBack
            },
            {
                key: "save",
                name: "Save",
                iconProps: {
                    iconName: "Save"
                },
                disabled: this._listingSupplier.sync.syncing,
                onClick: this._onSaveImmediate
            }
        );

        if(!this._listingSupplier.sync.syncing && this._listingSupplier.value && this._listingSupplier.value.canSubmit) {
            items.push({
                key: "submit",
                name: "Submit for Approval",
                iconProps: {
                    iconName: "Workflow"
                },
                disabled: this._listingSupplier.value.saveSync.syncing,
                onClick: this._submit
            });
        }

        const backFallback : IContextualMenuItem = {
            key: "backFallback",
            title: "Back to Listing Details",
            iconProps: {
                iconName: "Back"
            },
            onClick: this._onBack
        }
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items }} backFallback={backFallback}>
                <ListingFormContainer listingSupplier={this._listingSupplier}
                                      onSave={this._onSave}
                                      onSubmitForApproval={this._onSubmitForApproval}
                                      onCancel={this._onBack} />
            </OzoneAppView>
        );
    }
}

export { ListingEditApp, ListingEditApp as default };
