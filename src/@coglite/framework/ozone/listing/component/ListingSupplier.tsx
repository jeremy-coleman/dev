import * as React from "react";
import { Sync } from "@coglite/framework/common/component/Sync";
import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { IListingModel } from "../model/IListingModel";

class IListingSupplierProps {
    listingSupplier?: ISyncSupplier<IListingModel>;
    onRenderListing: (listing : IListingModel) => React.ReactNode;
}

class ListingSupplierContainer extends React.Component<IListingSupplierProps, any> {
    private _onRenderDone = () => {
        return this.props.onRenderListing(this.props.listingSupplier.value);
    }
    render() {
        return <Sync sync={this.props.listingSupplier.sync} onRenderDone={this._onRenderDone} />;
    }
}

export { IListingSupplierProps, ListingSupplierContainer }