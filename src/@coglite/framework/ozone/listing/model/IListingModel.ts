import { IListing } from "../IListing";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { IImage } from "../../media/IImage";
import { IListingLinkModel } from "./IListingLinkModel";
import { ISync } from "@coglite/framework/common/ISync";
import { IError } from "@coglite/framework/common/IError";
import { IStateManager } from "@coglite/framework/common/IStateManager";
import { ICategory } from "../../category/ICategory";

interface IListingModel extends IListing, IStateManager {
    validationErrors: IError[];
    valid: boolean;
    saveSync : ISync;
    state : any;
    doc_urls : IListingLinkModel[];
    setTitle(title : string) : void;
    setDescription(description : string) : void;
    setShortDescription(shortDescription : string) : void;
    setEnabled(enabled : boolean) : void;
    setFeatured(featured : boolean) : void;
    setPrivate(prv : boolean) : void;
    setLaunchUrl(url : string) : void;
    setSecurityMarking(securityMarking : string) : void;
    setVersion(version : string) : void;
    setApprovalStatus(status : ListingApprovalStatus) : void;
    setSmallIcon(smallIcon : IImage) : void;
    setLargeIcon(largeIcon : IImage) : void;
    setBannerIcon(bannerIcon : IImage) : void;
    setLargeBannerIcon(largeBannerIcon : IImage) : void;
    setCategories(categories : ICategory[]) : void;
    addCategory(category : ICategory) : void;
    removeCategory(category : ICategory) : void;
    canSubmit : boolean;
    submitForApproval() : Promise<any>;
    approve() : Promise<any>;
    reject() : Promise<any>;
    save() : Promise<any>;
    delete() : Promise<any>;
    reset() : void;
    addLink() : void;
    removeLink(link : IListingLinkModel) : void;
    enable() : Promise<any>;
    disable() : Promise<any>;
    savedEnabled(enabled : boolean) : Promise<any>;
    saveFeatured(featured : boolean) : Promise<any>;
    setIframeCompatible(iframeCompatible : boolean) : void;
}

export { IListingModel }