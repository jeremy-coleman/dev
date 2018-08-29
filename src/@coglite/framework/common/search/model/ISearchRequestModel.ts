import { ISearchRequest } from "../ISearchRequest";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { ISearchFieldHostModel } from "./ISearchFieldHostModel";
import { ISearchFieldModel } from "./ISearchFieldModel";

interface ISearchRequestModel extends ISearchRequest, ISearchFieldHostModel {
    searchString: string;
    fields: ISearchFieldModel[];
    op?: SearchGroupOperator;
    isExpanded?: boolean;
    data : ISearchRequest;
    isSpecified : boolean;
    setSearchString(search : string) : void;
    setData(data : ISearchRequest) : void;
    setOp(op : SearchGroupOperator) : void;
    setExpanded(expanded : boolean) : void;
    clear() : void;
}

export { ISearchRequestModel }