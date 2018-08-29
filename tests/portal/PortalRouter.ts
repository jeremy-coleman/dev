import {  Router } from "@coglite/framework/common/Router";
import { exactPath, reactRouter } from "@coglite/framework/common/Routers";
import { launchHandler } from "./listing/ListingLaunch";
import { injectUserProfile } from "./user/UserAuthRouters";


const r = new Router();

r.use(injectUserProfile());

r.use("/portal/bookmarks", reactRouter(() => import("./listing/component/ListingBookmarksApp")));
r.use("/portal/listings", reactRouter(() => import("./listing/component/ListingListApp")));
r.use("/portal/store", reactRouter(() => import("./listing/component/ListingStoreFrontApp")));
r.use("/portal/listings/add", reactRouter(() => import("./listing/component/ListingAddApp")));
r.use("/portal/listings/:listingId", reactRouter(() => import("./listing/component/ListingApp")));
r.use("/portal/listings/:listingId/launch", exactPath(launchHandler));
r.use("/portal/listings/:listingId/edit", reactRouter(() => import("./listing/component/ListingEditApp")));

export { r as PortalRouter, r as default };
