import { ISearchField } from "../ISearchField";
import { ISearchFieldHostModel } from "./ISearchFieldHostModel";

interface ISearchFieldModel extends ISearchField {
    parent : ISearchFieldHostModel;
    setName(name : string) : void;
    setSearchString(searchString : string) : void;
    data : ISearchField;
    setData(data : ISearchField) : void;
    isSpecified : boolean;
    remove() : void;
 }

export { ISearchFieldModel }