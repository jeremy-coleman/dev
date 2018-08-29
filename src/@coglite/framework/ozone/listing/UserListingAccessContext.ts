import { Context } from "@coglite/framework/common/Context";
import { IUserProfile } from "../user/IUserProfile";
import { isNotBlank, trim } from "@coglite/framework/common/StringUtils";
import { IListing } from "./IListing";
import { IListingUserAccess } from "./IListingUserAccess";
import { isMemberOfGroup } from "../user/UserHelper";

const defaultUserListingAccess : IListingUserAccess = (listing : IListing, userProfile : IUserProfile) => {
    if(listing && isNotBlank(listing.security_marking)) {
        const listingGroups = listing.security_marking.split(",").map(s => trim(s));
        return listingGroups.some(lg => {
            return isMemberOfGroup(userProfile, lg);
        });
    }
    return true;
};

const UserListingAccessContext = new Context<IListingUserAccess>({
    value: defaultUserListingAccess
});

export { UserListingAccessContext }