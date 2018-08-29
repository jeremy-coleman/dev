import { IListingStoreFront } from "../IListingStoreFront";
import { ListingServiceContext } from "../service/ListingServiceContext";
import { SyncSupplier } from "@coglite/framework/common/model/SyncSupplier";
import { IListingService } from "../service/IListingService";

class ListingStoreFrontModel extends SyncSupplier<IListingStoreFront> {
    private _service : IListingService;

    get service() {
        return this._service || ListingServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }
    
    protected _loadImpl() {
        return this.service.getStoreFront();
    }
}

export { ListingStoreFrontModel }