import { Icon, Image, Spinner, SpinnerSize } from "office-ui-fabric-react";
import * as React from "react";
import { IListingModelSupplier } from "../model/IListingModelSupplier";

//import { getNavStack } from "./ListingNavHelper";


const renderIcon = (listingSupplier : IListingModelSupplier) => {
    let icon;
    if(listingSupplier.sync.syncing) {
        icon = <Spinner size={SpinnerSize.small} />;
    } else if(listingSupplier.sync.error) {
        icon = <Icon iconName="Error" />;
    } else if(listingSupplier.value.small_icon && listingSupplier.value.small_icon.url) {
        icon = <Image src={listingSupplier.value.small_icon.url} width={16} height={16} />;
    } else {
        icon = <Icon iconName="Puzzle" />;
    }
    return icon
};

export { renderIcon };



/*
const onClickBackItem = (e, item) => {
    const host = item.host;
    const navStack = getNavStack(host);
    if(navStack && navStack.length > 0) {
        host.load(navStack.pop());
    }
};

const createBackItem = (host : IAppHost) : IContextualMenuItem => {
    const navStack = getNavStack(host);
    if(navStack && navStack.length > 0) {
        const e = navStack[navStack.length - 1];
        return {
            key: "back",
            iconProps: {
                iconName: "Back"
            },
            host: host,
            path: e.path,
            title: e.title ? `Back to ${e.title}` : "Back",
            onClick: onClickBackItem
        }
    }
};
export {
    createBackItem,
    renderIcon
}

*/