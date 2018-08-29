import { Context } from "@coglite/framework/common/Context";
import { IListingService } from "./IListingService";

const ListingServiceContext = new Context<IListingService>();

export { ListingServiceContext }