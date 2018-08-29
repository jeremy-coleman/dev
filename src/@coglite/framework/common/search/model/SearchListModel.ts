import { observable, action, computed } from "mobx";
import { ISearchResponse, ISearchResponseHighlighting, ISearchResponseFacetCounts } from "../ISearchResponse";
import { ISearchListModel } from "./ISearchListModel";
import { ISearchService } from "../service/ISearchService";
import { ISupplier } from "../../ISupplier";
import { ActivityListModel } from "../../model/ActivityListModel";
import { ISearchRequest } from "../ISearchRequest";
import { Sequence } from "../../Id";
import { SearchListViewType } from "./SearchListViewType";

class SearchListModel<T = any> extends ActivityListModel<T> implements ISearchListModel<T> {
    serviceSupplier : ISupplier<ISearchService<T>>;
    private _service : ISearchService<T>;
    @observable _duration : number;
    @observable _start : number;
    @observable _highlighting : ISearchResponseHighlighting;
    @observable _facetCounts : ISearchResponseFacetCounts;
    @observable.ref private _request : ISearchRequest;
    @observable private _searchId : string;
    @observable private _viewType : SearchListViewType;
    protected _searchSequence : Sequence = new Sequence();

    get service() {
        if(!this._service && this.serviceSupplier) {
            this._service = this.serviceSupplier.value;
        }
        return this._service;
    }
    set service(value) {
        this._service = value;
    }

    @computed
    get viewType() {
        return this._viewType || SearchListViewType.LIST
    }
    set viewType(value) {
        this.setViewType(value);
    }

    @action
    setViewType(viewType : SearchListViewType) {
        this._viewType = viewType;
    }

    @computed
    get request() {
        return this._request ? Object.assign({}, this._request) : undefined;
    }

    @computed
    get duration() {
        return this._duration;
    }

    @computed
    get start() {
        return this._start;
    }

    @computed
    get highlighting() {
        return this._highlighting;
    }

    @computed
    get facetCounts() {
        return this._facetCounts;
    }

    @action
    protected _loadDone(r : ISearchResponse<T>) {
        this._duration = r ? r.duration : undefined;
        this._start = r ? r.start : undefined;
        this._highlighting = r ? r.highlighting : undefined;
        this._facetCounts = r ? r.facetCounts : undefined;
        this.setTotal(r ? r.total : 0);
        this.setItems(r ? r.results : []);
    }

    protected _loadImpl() {
        return this.service.search(this._request);
    }

    @action
    refresh() : Promise<void> {
        if(this._request) {
            this.selection.clearSelection();
            const searchId = this._searchSequence.next();
            this._searchId = searchId;
            this.sync.syncStart();
            return this._loadImpl().then(r => {
                if(this._searchId === searchId) {
                    this._onLoadDone(r);
                }
            }).catch(err => {
                if(this._searchId === searchId) {
                    this._onLoadError(err);
                }
            });
        }
        return Promise.resolve();
    }

    @action
    submit(request: ISearchRequest) : Promise<any> {
        this._request = request;
        return this.refresh();
    }

    @action
    clear() {
        super.clear();
        this._searchId = undefined;
        this._request = undefined;
    }
}

export { SearchListModel }