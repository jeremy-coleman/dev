import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import { IListing } from "../IListing";

interface IListingOpenActionProps {
    listing: IListing;
    onOpen?: (listing : IListing) => void;
}

@observer
class ListingOpenAction extends React.Component<IListingOpenActionProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onOpen(this.props.listing);
    }
    render() {
        if(this.props.onOpen) {
            return (
                <IconButton onClick={this._onClick}
                                title={this.props.listing.title ? `Open ${this.props.listing.title}` : "Open"}
                                iconProps={{ iconName: "OpenInNewWindow" }} />
            );
        }
        return null;
    }
}
export { IListingOpenActionProps, ListingOpenAction };
