import * as React from "react";
import { ListingForm } from "./ListingForm";
import { IListingModel } from "../model/IListingModel";
import { ListingModel } from "../model/ListingModel";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IAppProps } from "@coglite/framework/common/component/IAppProps";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IUserProfile } from "../../user/IUserProfile";
import { observer } from "mobx-react";
import { OzoneAppView } from "../../common/component/OzoneAppView";
import { ListingViewConfig } from "./ListingViewConfig";
import { PathsContext } from "../../PathsContext";

@observer
class ListingAddApp extends React.Component<IAppProps, any> {
    private _listing : ListingModel;
    get host() : IAppHost {
        return this.props.match.host;
    }
    get userProfile() : IUserProfile {
        return this.props.match.userProfile;
    }
    private _onAfterSave = (listing : IListingModel) => {
        this.host.load({ path: PathsContext.value.listingDetails(listing.id)});
    }
    private _onSave = (listing : IListingModel) => {
        listing.save().then(() => {
           this._onAfterSave(listing);
        }).catch(() => {
            // we don't do anything here - the error should be reported on the model
        });
    }
    private _onSaveImmediate = () => {
        this._onSave(this._listing);
    }
    private _onCancel = () => {
        this.host.back();
    }
    componentWillMount() {
        this._listing = new ListingModel();
        this.host.title = `Add ${ListingViewConfig.label}`
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
                onClick: this._onCancel
            },
            {
                key: "save",
                name: "Save",
                iconProps: {
                    iconName: "Save"
                },
                disabled: this._listing.saveSync.syncing,
                onClick: this._onSaveImmediate
            }
        );
        return (
            <OzoneAppView host={this.host} userProfile={this.userProfile} commandBarProps={{ items: items }}>
                <ListingForm listing={this._listing}
                             onSave={this._onSave}
                             onCancel={this._onCancel} />
            </OzoneAppView>
        );
    }
}

export {
    ListingAddApp,
    ListingAddApp as default
}

