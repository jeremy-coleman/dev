import { IActivityListModel } from "../../model/IActivityListModel";
import { ISearchResponseHighlighting, ISearchResponseFacetCounts } from "../ISearchResponse";
import { ISearchRequest } from "../ISearchRequest";
import { SearchListViewType } from "./SearchListViewType";

interface ISearchListModel<T = any> extends IActivityListModel<T> {
    duration: number;
    start: number;
    highlighting: ISearchResponseHighlighting;
    facetCounts: ISearchResponseFacetCounts;
    request: ISearchRequest;
    viewType: SearchListViewType;
    setViewType(viewType : SearchListViewType) : void;
    submit(request: ISearchRequest) : Promise<any>;
}

export { ISearchListModel }