import { ISearchResponse } from "../ISearchResponse";
import { ISearchRequest } from "../ISearchRequest";

interface ISearchService<D = any> {
    search(request : ISearchRequest) : Promise<ISearchResponse<D>>;
}

export {
    ISearchService
}