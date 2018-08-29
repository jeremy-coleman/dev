import { IUserProfile } from "../user/IUserProfile";
import { IListing } from "./IListing";

interface IListingUserAccess {
    (listing : IListing, userProfile : IUserProfile) : boolean;
}

export { IListingUserAccess };
