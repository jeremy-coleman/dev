import * as React from "react";
import { IRequest } from "@coglite/framework/common/IRequest";
import { ListingServiceContext } from "./service/ListingServiceContext";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ListingApprovalStatus } from "./ListingApprovalStatus";
import { HostAppView } from "@coglite/framework/common/component/HostAppView";
import { isExternalListing, canUserAccess } from "./ListingHelper";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { AppFrame } from "@coglite/framework/common/component/AppFrame";
import { IUserProfile } from "../user/IUserProfile";
import { ListingAppFrame } from "./component/ListingAppFrame";

const launchHandler = (request : IRequest) => {
    const host = request.host as IAppHost;
    const userProfile = request.userProfle as IUserProfile;
    const listingId = request.params.listingId;
    if(!listingId) {
        throw { code: "INVALID_PARAMETER", key: "listingId", message: "A listing id must be specified" };
    }
    return ListingServiceContext.value.getListing({ listingId: listingId }).then(listing => {
        host.title = listing.title;
        const blockMessages = [];
        if(!listing.is_enabled) {
            blockMessages.push(
                <div key="disabled">
                    <strong>{listing.title}</strong> is currently disabled.
                </div>
            );
        }
        if(listing.is_deleted) {
            blockMessages.push(
                <div key="deleted">
                    <strong>{listing.title}</strong> has been deleted.
                </div>
            );
        }
        if(listing.approval_status !== ListingApprovalStatus.APPROVED) {
            blockMessages.push(
                <div key="notApproved">
                    <strong>{listing.title}</strong> has not been approved for use.
                </div>
            );
        }

        if(!listing.launch_url) {
            blockMessages.push(
                <div key="noLaunchUrl">
                    <strong>{listing.title}</strong> has an invalid launch url.
                </div>
            );
        }

        if(canUserAccess(listing, userProfile)) {
            blockMessages.push(
                <div key="security">
                    You don't have access to <strong>{listing.title}</strong>
                </div>
            );
        }

        if(blockMessages.length > 0) {
            return (
                <HostAppView host={host}>
                    <MessageBar messageBarType={MessageBarType.blocked}>
                        {blockMessages}
                    </MessageBar>
                </HostAppView>
            );
        }

        if(isExternalListing(listing)) {
            if(!host.root) {
                return (
                    <HostAppView host={host}>
                        <ListingAppFrame listing={listing} host={host} />
                    </HostAppView>
                );
            }
            window.location.replace(listing.launch_url);
            return;
        }

        return host.load({ path: listing.launch_url, replace: true, noUpdate: true });
    });
};

export { launchHandler }