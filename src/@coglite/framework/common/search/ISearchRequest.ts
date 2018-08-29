import { ISearchField } from "./ISearchField";
import { SearchGroupOperator } from "./SearchGroupOperator";

interface ISearchRequest {
    searchString?: string;
    fields?: ISearchField[];
    op?: SearchGroupOperator;
}

export {
    ISearchRequest
}