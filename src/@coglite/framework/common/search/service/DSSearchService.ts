import { ISearchService } from "./ISearchService";
import { ISearchRequest } from "../ISearchRequest";
import { ISearchResponse } from "../ISearchResponse";
import Axios from "axios";
import { ISupplierFunc } from "../../ISupplierFunc";
import * as StringUtils from "../../StringUtils";

const mapToOperator = (request : ISearchRequest) : string => {
    return request.op;
};

const escapeSearchValue = (value : string) => {
    return StringUtils.map(value, ch => {
        if(ch === '"') {
            return '\\"';
        } else if(ch === '\\') {
            return "\\\\";
        }
        return ch;
    });
};

const mapToSearchString = (request : ISearchRequest) : string => {
    const els : string[] = [];
    if(StringUtils.isNotBlank(request.searchString)) {
        els.push(request.searchString);
    }
    if(request.fields) {
        request.fields.forEach(field => {
            els.push(`${field.name}:"${field.searchString}"`);
        });
    }
    return els.length > 0 ? `"${escapeSearchValue(els.join(" "))}"` : undefined;
};

interface IDSSolrSearchRequest {
    searchString: string;
    op?: string;
}

interface IDSSolrSearchResponseHeader {
    zkConnected?: boolean;
    status?: number;
    QTime?: number;
}

interface IDSSolrSearchResponseBody<T = any> {
    numFound?: number;
    start?: number;
    docs?: T[];
}

interface IDSSolrSearchResponseHighlighting {
    [key: string]: {
        [key: string]: string[];
    }
}

interface IDSSolrSearchResponseFacetCounts {
    facet_queries?: any;
    facet_fields?: any;
    facet_ranges?: any;
    facet_intervals?: any;
    facet_heatmaps?: any;
}

interface IDSSolrSearchResponse<T = any> {
    responseHeader?: IDSSolrSearchResponseHeader;
    response?: IDSSolrSearchResponseBody<T>;
    highlighting?: IDSSolrSearchResponseHighlighting;
    facet_counts?: IDSSolrSearchResponseFacetCounts;
}

const mapToSearchRequest = (request : ISearchRequest) : IDSSolrSearchRequest => {
    return {
        searchString: mapToSearchString(request),
        op: mapToOperator(request)
    };
};

const mapFromSearchResponse = <D = any>(response : IDSSolrSearchResponse<D>) : ISearchResponse<D> => {
    if(response) {
        const header = response.responseHeader;
        const body = response.response;
        const r : ISearchResponse = {};
        r.duration = header ? header.QTime : undefined;
        r.total = body ? body.numFound : 0;
        r.start = body ? body.start : 0;
        r.results = body && body.docs ? body.docs : [];
        r.highlighting = response.highlighting;
        r.facetCounts = response.facet_counts;
        return r; 
    }
}

class DSSearchService<D = any> implements ISearchService<D> {
    searchUrlSupplier: ISupplierFunc<string>
    private _searchUrl : string;
    get searchUrl() {
        if(!this._searchUrl) {
            this._searchUrl = this.searchUrlSupplier ? this.searchUrlSupplier() : undefined;
        }
        return this._searchUrl;
    }
    set searchUrl(value) {
        this._searchUrl = value;
    }
    search(request : ISearchRequest) : Promise<ISearchResponse<D>> {
        const req : IDSSolrSearchRequest = mapToSearchRequest(request);
        return Axios.get(this.searchUrl, { params: req }).then(ar => {
            return mapFromSearchResponse(ar.data as IDSSolrSearchResponse<D>);
        });
    }
}

export { DSSearchService }