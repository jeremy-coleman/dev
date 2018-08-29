import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IListingModelSupplier } from "../model/IListingModelSupplier";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Image } from "office-ui-fabric-react/lib/Image";

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

export {
    renderIcon
}