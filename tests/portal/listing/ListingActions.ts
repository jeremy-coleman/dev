import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IListing } from "./IListing";

const launch = (host : IAppHost, listing : IListing) : Promise<any> => {
    host.load({ path: `/portal/listings/${listing.id}/launch`, params: { id: listing.id, title: listing.title }, replace: true });
    return Promise.resolve();
};

export { launch };
