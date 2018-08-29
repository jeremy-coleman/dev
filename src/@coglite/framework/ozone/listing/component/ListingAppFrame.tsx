import * as React from "react";
import { IAppHostBaseProps } from "@coglite/framework/common/component/IAppHostBaseProps";
import { IListing } from "../../listing/IListing";
import { AppFrame } from "@coglite/framework/common/component/AppFrame";

interface IListingAppFrameProps extends IAppHostBaseProps {
    listing: IListing;
}

class ListingAppFrame extends React.Component<IListingAppFrameProps, any> {
    private _onMessage = (e : MessageEvent) => {
        console.log("-- Listing App Frame on Message");
    }
    render() {
        return (
            <AppFrame host={this.props.host}
                      src={this.props.listing.launch_url}
                      onMessage={this._onMessage} />
        );
    }
}

export {
    IListingAppFrameProps,
    ListingAppFrame
}